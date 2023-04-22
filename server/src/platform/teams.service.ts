import { Injectable} from '@nestjs/common';
import fetch from 'node-fetch';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { PlatformSchema } from './platform.model';
import { Platform } from './platform.model';
import { Interval } from '@nestjs/schedule';
import querystring from 'querystring'
import { Test } from '@nestjs/testing';

@Injectable()
export class TeamsService {
	constructor(@InjectModel('platform') private readonly plateformModel: Model<Platform>) {}
    async AuthOnedrive(code: string, user: any) {
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
        console.log(token);
        return token;
    }

    async LoadTokenInDb(token: string, user: any, plateform: string, refresh_token: string) {
        const filter = { userId: user.id, plateform: plateform };
        const update = { access_token: token};
        const count = await this.plateformModel.count();
        if (count != 0) {
            let info = await this.plateformModel.findOneAndUpdate(filter, update);
            if (info) {
                return info;
            } else {
                const userPlateform = await new this.plateformModel({userId: user.id, access_token:token, plateform, refresh_token: refresh_token})
                return userPlateform.save();
            }
        } else {
            const userPlateform = await new this.plateformModel({userId: user.id, access_token:token, plateform, refresh_token: refresh_token})
            return userPlateform.save();
        }
    }

    async getgroups(token: string, name: string)
    {
        const url = 'https://graph.microsoft.com/v1.0/me/chats';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        //console.log(response);
        const test = await response.json();
        for (let i = 0; i < test.value.length; i++){
            if (test.value[i].topic == name){
                console.log(test.value[i]);
                return test.value[i].id;
            }
        }
        //console.log("this is da test");
        //console.log(test);
        if (!response.ok) {
            throw new Error(await response.text());
        }
        return 0;
    }

    async SendMessage(userId: string, name: string, mymessage: string)
    {
        const dbResult = await this.plateformModel.findOne({"userId": userId, "plateform": "outlook"});
        const token = dbResult.access_token;
        const id = await this.getgroups(token, name);
        const url = 'https://graph.microsoft.com/v1.0/chats/'+id+'/messages';
        const chatMessage = {
            body: {
               content: mymessage
            }
          };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chatMessage),
        });
        //console.log(response);
        if (!response.ok) {
            throw new Error(await response.text());
        }
    }


    async checknewmessage(userId: string, name: string)
    {
        const dbResult = await this.plateformModel.findOne({"userId": userId, "plateform": "outlook"});
        const token = dbResult.access_token;
        const channelid = await this.getgroups(token, name);
        const url = 'https://graph.microsoft.com/v1.0/me/chats/'+ channelid + '/messages';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const jsonresult = (await response.json()) 
        //console.log(jsonresult);
        if (!response.ok) {
            throw new Error(await response.text());
        }
        for (let i = 0; i < jsonresult.value.length; i++){
            const date1 = new Date(jsonresult.value[i].createdDateTime);
            const date2 = new Date();
            //console.log(test.data);
            const difference = date2.getTime() - date1.getTime();
            if (difference < 10000){
                return 1;
            }
        }
        return null;
    }

    async getteamsmember(userId: string, name: string)
    {
        const dbResult = await this.plateformModel.findOne({"userId": userId, "plateform": "outlook"});
        const token = dbResult.access_token;
        const channelid = await this.getgroups(token, name);
        const url = 'https://graph.microsoft.com/v1.0/me/chats/'+ channelid + '/members';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const jsonresult = (await response.json()) 
        //console.log(jsonresult);
        if (!response.ok) {
            throw new Error(await response.text());
        }
        /*for (let i = 0; i < jsonresult.value.length; i++){
            const date1 = new Date(jsonresult.value[i].createdDateTime);
            const date2 = new Date();
            //console.log(test.data);
            const difference = date2.getTime() - date1.getTime();
            if (difference < 120000){
                return 1;
            }
        }
        */
        return jsonresult.value.length;
    }
    /*
    async CreateFolder(token: string, myname: string)
    {
        const url = 'https://graph.microsoft.com/v1.0/me/drive/root/children';
        const message = {
            "name": myname,
            "folder": { },
            "@microsoft.graph.conflictBehavior": "rename"
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
        //console.log(response);
        if (!response.ok) {
            throw new Error(await response.text());
        }
    }
    */
    /*async checknewfile(token: string)
    {
        const url = 'https://graph.microsoft.com/v1.0/me/drive/root/children';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const jsonresult = (await response.json()) 
        console.log(jsonresult);
        if (!response.ok) {
            throw new Error(await response.text());
        }
        for (let i = 0; i < jsonresult.value.length; i++){
            const date1 = new Date(jsonresult.value[i].createdDateTime);
            const date2 = new Date();
            //console.log(test.data);
            const difference = date2.getTime() - date1.getTime();
            if (difference < 120000){
                return 1;
            }
        }
        return 0;
    }
    */
    /*
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
    */
}