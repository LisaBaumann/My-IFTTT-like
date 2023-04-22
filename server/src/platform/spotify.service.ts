import { Injectable} from '@nestjs/common';
import fetch from 'node-fetch';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { PlatformSchema } from './platform.model';
import { Platform } from './platform.model';
import { Interval } from '@nestjs/schedule';
import querystring from 'querystring'
import { OutlookService } from './outlook.service';



@Injectable()
export class SpotifyService {
    public idMusique = {}
    public idPlaylist = {}
	constructor(@InjectModel('platform') private readonly platformModel: Model<Platform>, private readonly OutlookService: OutlookService) {}
    async AuthSpotUser(code: string, user: any) {
        const url = new URL('https://accounts.spotify.com/api/token')
        const client_id = '024109e93523411eab1259b128096e05'
        const client_secret = '17e86038224b4eeb91acb3481f5f5660'
        const data = new URLSearchParams()
        const identity = Buffer.from(client_id + ':' + client_secret)
        data.append('client_id', client_id)
        data.append('client_secret', client_secret)
        data.append('redirect_uri', 'http://localhost:8081/authSpot')
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
        const token = (await response.json())
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
                const userPlateform = await new this.platformModel({userId: user.id, access_token:token, plateform: platform, refresh_token: refresh_token})
                return userPlateform.save();
            }
        } else {
            console.log(refresh_token)
            const userPlateform = await new this.platformModel({userId: user.id, access_token:token, plateform: platform, refresh_token: refresh_token})
            return userPlateform.save();
        }
    }

    async getNewAccessToken(refreshToken: string): Promise<string> {
        const body = new URLSearchParams();
        body.append('grant_type', 'refresh_token');
        body.append('refresh_token', refreshToken);
        body.append('client_id', '024109e93523411eab1259b128096e05');
        body.append('client_secret', '17e86038224b4eeb91acb3481f5f5660');

        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body
            });
            const json = await response.json();
            return json.access_token;
        } catch (err) {
            throw new Error('Error refreshing access token: ' + err.message);
        }
    }


    async handleSpotifyArea(userId: string): Promise<{} | null> {
        console.log(userId)
        const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "spotify"});
        //console.log(dbResult)
        //console.log(dbResult);
                try {
                    const token = await this.getNewAccessToken(dbResult.refresh_token);
                    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    const json = await response.json();
                    //console.log(json);
                    if (this.idMusique[userId] != undefined && this.idMusique[userId] != json.item.id) {
                        console.log("musique changed\n");
                        this.idMusique[userId] = json.item.id;
                        return {
                            "music_name": json.item.name,
                            "album_name": json.item.album.name
                        };
                    }
                    this.idMusique[userId] = json.item.id;
                } catch(e) {
                    //console.log(e);
                    console.log("no music playing");
                }
                return null;
    }

    async handleSpotifyPlaylist(userId: string, playlistId: string): Promise<{} | null> {
        const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "spotify"});
        //console.log(dbResult);
                try {
                    const token = await this.getNewAccessToken(dbResult.refresh_token);
                    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    const json = await response.json();
                    // console.log(json);
                    //console.log(this.idPlaylist[userId+'/'+playlistId])
                    //console.log(json.items[json.items.length - 1].track)
                    if (this.idPlaylist[userId+'/'+playlistId] != json.items[json.items.length - 1].track.album.id) {
                        this.idPlaylist[userId+'/'+playlistId] = json.items[json.items.length - 1].track.album.id;
                        return {
                            "track_name": json.items[json.items.length - 1].track.name,
                            "artist_name": json.items[json.items.length - 1].track.artists[0].name
                        }
                    }
                    this.idPlaylist[userId+'/'+playlistId] = json.items[json.items.length - 1].track.album.id;
                } catch(e) {
                    console.log("error happening");
                }
                return null;
    }

    async handleSpotifyNext(userId: string) :Promise<{} | null> {
        const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "spotify"});
        //console.log(dbResult);
                try {
                    const token = await this.getNewAccessToken(dbResult.refresh_token);
                    const response = await fetch('https://api.spotify.com/v1/me/player/next ', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    const json = await response.json();
                    console.log(json)
                } catch(e) {
                    console.log("error next");
                }
                return null;
    }
/*/*
   //@Interval(10000)
    async handleSpotifyAction() {
        const dbResult = await this.plateformModel.find({});
        for (const result of dbResult) {
            if (result.plateform === 'spotify') {
                try {
                    const token = await this.getNewAccessToken(result.refresh_token);
                    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    const json = await response.json();
                    //console.log(json.item);
                    if (this.idMusique[result.userId] != undefined && this.idMusique[result.userId] != json.item.id) {
                        const tokenOutlook = dbResult.find((res) => {if (res.userId === result.userId && res.plateform === 'outlook') {return res} })
                        //console.log("token here" + tokenOutlook.access_token)
                        if (tokenOutlook) {
                            this.OutlookService.sendEmail('yasminebous@gmail.com', 'test email send', `Hi Yasmine, now listening ${json.item.name} from ${json.item.artists[0].name}`, tokenOutlook.access_token)
                        }
                        //console.log("Yes musique changed!!")
                        //console.log("j'ai chang de musique")
                    }
                    this.idMusique[result.userId] = json.item.id;
                    return json;
                } catch(e) {
                    //console.log(e);
                    //console.log("no music playing");
                }
            }
        }
        /*
        const array = dbResult.map((doc) => {return doc.refresh_token})
        console.log(array[0]);
        const token = await this.getNewAccessToken(array[0]);
        console.log('The new token = ' + token)
        if (token) {
            try {
                const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const json = await response.json();
                console.log(json);
                return json;
            } catch {
                console.log("no music playing");
            }
        }  else {
            console.log("ERRRRRRROOOOOOOOOOOOOOOOR");
        }
        */
   // }

}