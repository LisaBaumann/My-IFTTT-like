import { Injectable} from '@nestjs/common';
import fetch from 'node-fetch';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { PlatformSchema } from './platform.model';
import { Platform } from './platform.model';
import { Interval } from '@nestjs/schedule';
import querystring from 'querystring'
import { replaceParam } from 'src/utils/paramParser';

@Injectable()
export class OutlookService {
	constructor(@InjectModel('platform') private readonly platformModel: Model<Platform>) {}
    async AuthOutlook(code: string, user: any) {
        const url = new URL('https://login.microsoftonline.com/common/oauth2/v2.0/token')
        const client_id = '978020c9-d437-4004-bbc7-b4f41d309bc5'
        const client_secret = 'NiC8Q~MnM794w4ssT10Ug4Qz8UUV7hLRo.S6Labd' //or maybe ce14f38a-d046-4418-8540-0b6b9001d7f4
        const data = new URLSearchParams()
        const identity = Buffer.from(client_id + ':' + client_secret)
        data.append('client_id', client_id)
        data.append('client_secret', client_secret)
        data.append('redirect_uri', 'http://localhost:8081/outlookauth')
        data.append('grant_type', 'authorization_code')
        data.append('code', code)
        const response = await fetch(url.toString(), {
            method: 'POST',
            body: data.toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + identity.toString('base64')
            }
        })
        //console.log(response.status);
        const token = (await response.json())
        //console.log(token);
        return token;
    }

    async LoadTokenInDb(token: string, user: any, platform: string, refresh_token: string) {
        const filter = { userId: user.id, plateform: platform };
        const update = { access_token: token};
        const count = await this.platformModel.count();
        if (count != 0) {
            let info = await this.platformModel.findOneAndUpdate(filter, update);
            if (info) {
                return info;
            } else {
                const userPlatform = await new this.platformModel({userId: user.id, access_token:token, plateform: platform, refresh_token: refresh_token})
                return userPlatform.save();
            }
        } else {
            const userPlatform = await new this.platformModel({userId: user.id, access_token:token, plateform: platform, refresh_token: refresh_token})
            return userPlatform.save();
        }
    }

    async sendEmail(to: string, subject: string, body: string, accessToken: string) {
        const url = 'https://graph.microsoft.com/v1.0/me/sendMail';
        const message = {
            subject: subject,
            body: {
                ContentType: 'HTML',
                Content: body,
            },
            toRecipients: [
            {
                emailAddress: {
                    address: to,
                },
            },
            ],
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message}),
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }
    }

    async getAccessToken(userId: string, info: any, musicParameters: {}) {
        const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "outlook"});
        if (dbResult) {
            this.sendEmail(info.parameters.email, replaceParam(info.parameters.object, musicParameters), replaceParam(info.parameters.message, musicParameters), dbResult.access_token)
        }
    }


}