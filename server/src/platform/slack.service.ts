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
export class SlackService {
    public idUser = {}
	constructor(@InjectModel('platform') private readonly platformModel: Model<Platform>) {}
    async AuthSlack(code: string, user: any) {
        const url = new URL('https://slack.com/api/oauth.access')
        const client_id = '4768703766130.4754226108183'
        const client_secret = 'dc52e5f8510a9f5bcff5a871157787fc' //or maybe ce14f38a-d046-4418-8540-0b6b9001d7f4
        const data = new URLSearchParams()
        const identity = Buffer.from(client_id + ':' + client_secret)
        data.append('client_id', client_id)
        data.append('client_secret', client_secret)
        data.append('redirect_uri', 'https://localhost:8081/authslack')
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
        console.log(token);
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

    async handleSlackChannel(userId: string): Promise<{} | null> {
        const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "slack"});
        //console.log(dbResult);
                try {
                    const response = await fetch('https://slack.com/api/users.list', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${dbResult.access_token}`,
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    });
                    const json = await response.json();
                    
                    if (json.ok == true) {
                        const members = json.members.filter((member) => !member.deleted)
                        if (this.idUser[userId] != undefined && this.idUser[userId] != members.length) {
                            this.idUser[userId] = members.length;
                            return {
                                "members": members.length.toString(),
                            };
                        }
                        this.idUser[userId] = members.length;
                    }
                } catch(e) {
                    console.log(e);
                    console.log("not working!!!!");
                }
                return null;
    }
}
