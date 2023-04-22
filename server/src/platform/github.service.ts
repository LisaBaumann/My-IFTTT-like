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
export class GithubService {
    public idCommits = {}
    public idPull = {}
	constructor(@InjectModel('platform') private readonly platformModel: Model<Platform>) {}
    async AuthGithub(code: string, user: any) {
        const url = new URL('https://github.com/login/oauth/access_token')
        const client_id = '45be36432a6ad8f20160'
        const client_secret = '69443942989c67121d0cd495b9319d0f45125760' //or maybe ce14f38a-d046-4418-8540-0b6b9001d7f4
        const data = new URLSearchParams()
        const identity = Buffer.from(client_id + ':' + client_secret)
        data.append('client_id', client_id)
        data.append('client_secret', client_secret)
        data.append('redirect_uri', 'http://localhost:8081/githubAuth')
        data.append('grant_type', 'authorization_code')
        data.append('code', code)
        const response = await fetch(url.toString(), {
            method: 'POST',
            body: data.toString(),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + identity.toString('base64')
            }
        })
        const token = await response.json();
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

    async checkCommitAdded(userId: string, repo: string, owner: string) {
        const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "github"});
                try {
                    console.log(`https://github.com/${owner}/${repo}/commits`);
                    const token = dbResult.access_token;
                    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    const json = await response.json();
                    //console.log(json[0])
                    if (this.idCommits[owner+'/'+repo] != undefined && this.idCommits[owner+'/'+repo] != json[0].sha) {
                        console.log("commit changed\n");
                        this.idCommits[owner+'/'+repo] = json[0].sha;
                        return {
                            "committer_name": json[0].commit.committer.name,
                            "date_commit": json[0].commit.committer.date,
                            "message": json[0].commit.message
                        };
                    }
                    this.idCommits[owner+'/'+repo] = json[0].sha;
                } catch(e) {
                    console.log(e);
                    console.log("problemo");
                }
                return null;
    }

    async createRepo(userId: string, repoName: string) {
        const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "github"});
        const body = {
            "name": repoName
        } 
        try {
            const token = dbResult.access_token;
            const response = await fetch(`https://api.github.com/user/repos`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/vnd.github+json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            console.log(response)
        } catch(e) {
            console.log(e);
            console.log("problemo");
        }
    }

    async checkPrAdded(userId: string, repo: string, owner: string) {
        const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "github"});
                try {
                    console.log(`https://github.com/${owner}/${repo}/pulls`);
                    const token = dbResult.access_token;
                    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    const json = await response.json();
                    console.log(json[0]?.id)
                    if (this.idPull[owner+'/'+repo] != json[0]?.id) {
                        console.log("pull request added\n");
                        this.idPull[owner+'/'+repo] = json[0]?.id;
                        return {
                            "pull_title": json[0]?.title,
                            "pull_state": json[0]?.state,
                        };
                    }
                    this.idPull[owner+'/'+repo] = json[0]?.id;
                } catch(e) {
                    console.log(e);
                    console.log("problemo");
                }
                return null;
    }

}