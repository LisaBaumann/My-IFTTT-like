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
export class GoogleService {
	constructor(@InjectModel('platform') private readonly platformModel: Model<Platform>) {}
    async AuthGoogle(code: string, user: any) {
        const url = new URL('https://oauth2.googleapis.com/token')
        const client_id = '569424510679-e4m5sdncrq8prplcgdbctlfc222r1t5f.apps.googleusercontent.com'
        const client_secret = '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'
        const data = new URLSearchParams()
        const identity = Buffer.from(client_id + ':' + client_secret)
        data.append('client_id', client_id)
        data.append('client_secret', client_secret)
        data.append('redirect_uri', 'http://localhost:8081/auth')
        data.append('grant_type', 'authorization_code')
        data.append('code', code)
        const response = await fetch(url, {
            method: 'POST',
            body: data.toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + identity.toString('base64')
            }
        })
        const token = await response.json()
        return token;
    }
    async LoadTokenInDb(token: string, user: any, platform: string, refresh_token: string) {
        console.log("refresh token : " + refresh_token);

        const filter = { userId: user.id, plateform: platform };
        const update = { access_token: token, refresh_token: refresh_token};
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
}

/*
    reddit

    spotify
    -- Actions :
        * si la musique change (fait)
        * si j'ajoute une musique dans ma playlist (fait)
        * si je like une musique (pas encore)
    -- Reaction :
        * change la musique (premium)
        * ajouter une musique dans une playlist (pas encore)
        * je like une musique (pas encore)

    outlook
    -- Actions :
        * si je reçois un email (pas encore)
        * si je reçois un email d'une personne spécifique (pas encore)
        * si je reçois un email avec un mot spéfique
    
    -- Reaction :
        * envoyer un email (fait)

    github
    -- Actions :
        * quand y a un nouveau commit (plus simple)
        * quand y a une pull request
        * une nouvelle branche
        * dès que j'ai une issue
        * get /repos/{owner}/{repo}/stargazers
    -- Reactions : 
        * post /repos/{owner}/{repo}/issues
        * post /orgs/{org}/repos (fait)

    Slack:
        
*/
