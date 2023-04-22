import { Injectable} from '@nestjs/common';
import fetch from 'node-fetch';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { PlatformSchema } from './platform.model';
import { Platform } from './platform.model';
import { Interval } from '@nestjs/schedule';
import { Client } from 'discord.js';

@Injectable()
export class TwitchService {
    //public bottoken = 'MTA2NzE0NTAxMDA3MzU3OTYxMQ.Ga0DEF.tyE282jYL-oiVCtogPZDx4eEqiRsmKK1fA7ADU'
	constructor(@InjectModel('platform') private readonly platformModel: Model<Platform>) {}

    async connect() {
        
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

    async AuthTwitchUser() {
        //bot token = "MTA2NzE0NTAxMDA3MzU3OTYxMQ.GVRBX2.aJo92KEQK00_tfCA52uQQ4lDyyQll_Na_2Kjh4"
        try {
            
            const response = await fetch('https://id.twitch.tv/oauth2/token?client_id=44t014fy3xek280v9ro41p0450bnnp&client_secret=taw2geap24hao8zgbmqsak9ejblazw&scope=moderator:manage:announcements&grant_type=client_credentials', 
            {
                method: 'POST',
            })
            
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            
            const test = await response.json();
            console.log(test);

            return test.access_token;
        }
        catch (error){
            console.error(error);
            return { error: error.message };
        }
    }
    async FindUser(name: string, token: string){
        try{
            const url = 'https://api.twitch.tv/helix/users?login='+name;
            const response = await fetch(url,
            {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + token,
                    'Client-ID': '44t014fy3xek280v9ro41p0450bnnp',
                }
            })
            //console.log(response);
            const test = await response.json();
            //console.log(test);
            //console.log("user's id:");
            //console.log(test.data[0].id);
            return test.data[0].id;
        }
        catch (error){
            console.error(error);
            return { error: error.message };
        }
    }

    /*async IsStreaming(name: string, token: string){
        try{
            const url = 'https://api.twitch.tv/helix/streams?user_login='+name;
            const response = await fetch(url,
            {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + token,
                    'Client-ID': '44t014fy3xek280v9ro41p0450bnnp',
                }
            })
            //console.log(response);
            const test = await response.json();
            console.log(test);
            console.log("user's id:");
            if (test.data.length > 0){
                console.log ("he streamin");
                return 1;
            }
            console.log("he not streamin");
            return 0;
            //console.log(test.data[0].id);
            //return test.data[0].id;
        }
        catch (error){
            console.error(error);
            return 0;
        }
    }
    */
    async StartedStreaming(userId: string, name: string) {
        try {
            const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "twitch"});
            const token = dbResult.access_token;
            const url = 'https://api.twitch.tv/helix/streams?user_login='+name;
            const response = await fetch(url,
            {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + token,
                    'Client-ID': '44t014fy3xek280v9ro41p0450bnnp',
                }

            })
            //console.log(response);
            const test = await response.json();
            //console.log(test);
            //console.log("user's id:");
            if (test.data.length > 0){
                console.log("he streamin");
                const date1 = new Date(test.data[0].started_at);
                const date2 = new Date();
                //console.log(test.data);
                const difference = date2.getTime() - date1.getTime();
                console.log(difference)
                if (difference < 25000){
                    return {
                        "stream_title": test.data.title
                    };
                }
            }
            return null;
            //console.log(test.data[0].id);
            //return test.data[0].id;
        }
        catch (error){
            console.error(error);
            return null;
        }
    }

    async getnewclip(userId: string, name: string){
        try {
            const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "twitch"});
            const token = dbResult.access_token;
            const currentTime = new Date();
            const date = new Date(currentTime.getTime() - 10 * 1000);
            const url = 'https://api.twitch.tv/helix/clips?broadcaster_id='+ await this.FindUser(name, token) + "&started_at=" + date.toISOString();
            const response = await fetch(url,
            {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + token,
                    'Client-ID': '44t014fy3xek280v9ro41p0450bnnp',
                }
            })
            const test = await response.json();
            console.log(test.data)
            if (test.data.length > 0){
                for (let i = 0; i < test.data.length; i++){
                    let datetest = new Date(test.data[i].created_at);
                    if (datetest.getTime() - date.getTime() > 0){
                        return {
                            "clip_url": test.data[i].url
                        };
                    }
                }
            }
            return null;
        }
        catch (error){
            console.error(error);
            return null;
        }
    }
    /*
    async createannouncement(name:string, title: string, token: string){
        try{
            const currentTime = new Date();
            const date = new Date(currentTime.getTime() - 2 * 60 * 1000);
            const header = new Headers({
                'Client-ID': '44t014fy3xek280v9ro41p0450bnnp',
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json',
            })
            
            const data = {
                message: title,
            };
            const url = 'https://api.twitch.tv/helix/chat/announcements?broadcaster_id='+ await this.FindUser(name, token) + "&moderator_id=765718268";
            const response = await fetch(url,
            {
                method: 'POST',
                headers: header,
                body: JSON.stringify(data),
            })
            //console.log(response);
            console.log(response);
            console.log(await response.json());
            return 0;
            //console.log(test.data[0].id);
            //return test.data[0].id;
        }
        catch (error){
            console.error(error);
            return 0;
        }
    }
    */


/*
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
*/
/*
    async ConnectToGuild(guild_id: string, access_token: string) {
        console.log("connecting to guild");
        try {
          const response = await axios.put('https://discord.com/api/v6/users/@me/guilds/'+guild_id+'/status',
          {
              "status": "online",
              "game": {
                  "name": "Playing with NestJS"
              }
          },
          {
              headers: {
                  'Authorization': 'Bearer ' + access_token,
                  'Content-Type': 'application/json'
              }
          });
          //console.log(response.data);
        } catch (error) {
          //console.error(error);
          console.error("didnt work");
        }
    }
*/
    /*
    async sendmessage(channel_id: string, access_token: string, message: string) 
    {
        try{
            const currentTime = new Date();
            const date = new Date(currentTime.getTime() - 2 * 60 * 1000);
            const header = new Headers({
                'Client-ID': '44t014fy3xek280v9ro41p0450bnnp',
                'Authorization': "Bearer " + access_token,
                'Content-Type': 'application/json',
            })
            
            const data = {
                message: message,
                extension_id: "",
                extension_version: "0.0.1",
            };
            const url = 'https://api.twitch.tv/helix/extensions/chat?broadcaster_id='+ channel_id;
            const response = await fetch(url,
            {
                method: 'POST',
                headers: header,
                body: JSON.stringify(data),
            })
            //console.log(response);
            console.log(response);
            console.log(await response.json());
            return 0;
            //console.log(test.data[0].id);
            //return test.data[0].id;
        }
        catch (error){
            console.error(error);
            return 0;
        }
    }
    */


    
/*
    @Interval(10000)
    async handleSpotifyAction() {
        const dbResult = await this.plateformModel.findOne()
        console.log(dbResult.access_token)
        const filtredTable = dbResult.toObject({ flattenMaps: true })
        console.log(filtredTable.access_token);
    }
*/


    


}