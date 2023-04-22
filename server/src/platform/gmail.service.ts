import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Platform } from './platform.model';
import { google } from 'googleapis';

@Injectable()
export class GmailService {
    public idEmail = {};
    public idGroupEmail = {};
    public timeEmail = {};
    constructor(@InjectModel('platform') private readonly platformModel: Model<Platform>) {}

    async sendEmail(userId: string, receivers: [string], object: string, body: string) {
        const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "google"});
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI,
        );
        oauth2Client.setCredentials({access_token: dbResult.access_token});

        const { email } = await oauth2Client.getTokenInfo(dbResult.access_token);
        const gmail = google.gmail({
            version: 'v1',
            auth: oauth2Client
        });
        
        const message = [
            `From: ${email}`,
            `To: ${receivers}`,
            `Subject: ${object}`,
            '',
            `${body}`
        ].join('\n');
        
        const encodedMessage = Buffer.from(message).toString('base64');
        const request = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedMessage
            }
        });
        console.log(`Email was sent to ${receivers}`);
    }

    async getEmailDetails(gmail, emailId) {
        const response = await gmail.users.messages.get({
            userId: 'me',
            id: emailId,
            format: 'full'
        });
    
        const email = response.data;
        const dateHeader = await email.payload.headers.find(header => header.name === 'Date');
    
        return {
            ...email,
            sentDate: dateHeader ? new Date(dateHeader.value).getTime() : null
        };
    }

    async isEmailReceived(userId: string) {
        const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "google"});
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI,
        )
        oauth2Client.setCredentials({access_token: dbResult.access_token})

        const gmail = google.gmail({
            version: 'v1',
            auth: oauth2Client
          });
        const response = await gmail.users.messages.list({
          userId: 'me',
          labelIds: ['INBOX'],
          maxResults: 10
        });
        
        if (this.idEmail[userId] != undefined) {
            if (response.data.resultSizeEstimate > 0) {
                const emailDetails = await this.getEmailDetails(gmail, response.data.messages[0].id);
                if (this.idEmail[userId] < emailDetails.sentDate) {
                    console.log("receive !");
                    this.idEmail[userId] = emailDetails.sentDate;
                    const headers = emailDetails.payload.headers;
                    const sender = await headers.find(header => header.name === 'From').value;
                    const emailAddress = sender ? sender.match(/<(.*?)>/) ? sender.match(/<(.*?)>/)[1] : sender : null;
                    const date = new Date(emailDetails.sentDate);
                    const dateFormate = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
                    return {
                        date: dateFormate,
                        emailAddress: emailAddress,
                    }
                }
            }
        } else
            this.idEmail[userId] = Date.now();
        return null;
    }

    async isSomeoneEmailMe(userId: string, receivers: [string]) {
        const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "google"});
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI,
        )
        oauth2Client.setCredentials({access_token: dbResult.access_token})

        const gmail = google.gmail({
            version: 'v1',
            auth: oauth2Client
        });
        const response = await gmail.users.messages.list({
          userId: 'me',
          labelIds: ['INBOX'],
          maxResults: 10
        });
        if (!this.idGroupEmail[userId]) {
            this.idGroupEmail[userId] = [];
        }
        if (!this.timeEmail[userId]) {
            if (response.data.resultSizeEstimate > 0) {
                await response.data.messages.forEach(async (email) => {
                    const emailDetails = await this.getEmailDetails(gmail, email.id);
                    if (!this.timeEmail[userId])
                        this.timeEmail[userId] = emailDetails.sentDate;
                    else if (emailDetails.sentDate > this.timeEmail[userId])
                        this.timeEmail[userId] = emailDetails.sentDate;
                });
            }
        }
        
        if (response.data.resultSizeEstimate > 0) {
            for (const email of response.data.messages) {
                const emailDetails = await this.getEmailDetails(gmail, email.id);
                const headers = emailDetails.payload.headers;
                const sender = await headers.find(header => header.name === 'From').value;
                const emailAddress = sender ? sender.match(/<(.*?)>/) ? sender.match(/<(.*?)>/)[1] : sender : null;
                const isInList = await receivers.find(receiver => receiver == emailAddress);
                var isAlreadySend;
                if (isInList != undefined && emailDetails.sentDate > this.timeEmail[userId]) {
                    if (this.idGroupEmail[userId] != undefined)
                        isAlreadySend = await this.idGroupEmail[userId].find((element) => element == emailAddress);
                    if (isAlreadySend == undefined) {
                        await this.idGroupEmail[userId].push(emailAddress); 
                        console.log("et un de reçu");
                    }
                }
            }
        }        
        console.log("envoyés : ", this.idGroupEmail[userId]);
        if (this.idGroupEmail[userId].length == receivers.length) {
            console.log("tout reçu !");
            const value = this.idGroupEmail[userId];
            this.idGroupEmail[userId] = undefined;
            this.timeEmail[userId] = undefined;
            return value;
        }
        return null;
    }

    async deleteEmail(userId: string, receivers: [string]) {
        const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "google"});
        const oauth2Client = new google.auth.OAuth2(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET,
          process.env.GOOGLE_REDIRECT_URI,
        );
        oauth2Client.setCredentials({access_token: dbResult.access_token});
      
        const gmail = google.gmail({
          version: 'v1',
          auth: oauth2Client
        });
        const response = await gmail.users.messages.list({
            userId: 'me',
            labelIds: ['INBOX'],
            maxResults: 10
        });
        if (response.data.resultSizeEstimate > 0) {
            await response.data.messages.forEach(async (email) => {
                const emailDetails = await this.getEmailDetails(gmail, email.id);
                const headers = emailDetails.payload.headers;
                const sender = await headers.find(header => header.name === 'From').value;
                const emailAddress = sender ? sender.match(/<(.*?)>/) ? sender.match(/<(.*?)>/)[1] : sender : null;
                console.log(receivers, emailAddress);
                const isInList = await receivers.find(receiver => receiver == emailAddress);
                if (isInList != undefined) {
                    await gmail.users.messages.delete({
                        userId: 'me',
                        id: email.id
                    });
                    console.log(`Email ${isInList} has been deleted`);
                }
            })
        }
    }

    async archiveEmail(userId: string, receivers: [string]) {
        const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "google"});
        const oauth2Client = new google.auth.OAuth2(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET,
          process.env.GOOGLE_REDIRECT_URI,
        );
        oauth2Client.setCredentials({access_token: dbResult.access_token});
      
        const gmail = google.gmail({
          version: 'v1',
          auth: oauth2Client
        });
        const response = await gmail.users.messages.list({
            userId: 'me',
            labelIds: ['INBOX'],
            maxResults: 10
        });
        if (response.data.resultSizeEstimate > 0) {
            await response.data.messages.forEach(async (email) => {
                const emailDetails = await this.getEmailDetails(gmail, email.id);
                const headers = emailDetails.payload.headers;
                const sender = await headers.find(header => header.name === 'From').value;
                const emailAddress = sender ? sender.match(/<(.*?)>/) ? sender.match(/<(.*?)>/)[1] : sender : null;
                const isInList = await receivers.find(receiver => receiver == emailAddress);
                console.log(emailAddress, receivers);
                if (isInList != undefined) {
                    console.log("tout va bien");
                    await gmail.users.messages.modify({
                        userId: 'me',
                        id: email.id,
                        requestBody: {
                            removeLabelIds: ['INBOX']
                        }
                    });
                    console.log(`Email ${email.id} has been archived`);
                } else
                    console.log("pas ouf là");
            })
        }
    }

    async spamEmail(userId: string, receivers: [string]) {
        const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "google"});
        const oauth2Client = new google.auth.OAuth2(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET,
          process.env.GOOGLE_REDIRECT_URI,
        );
        oauth2Client.setCredentials({access_token: dbResult.access_token});
      
        const gmail = google.gmail({
          version: 'v1',
          auth: oauth2Client
        });
        const response = await gmail.users.messages.list({
            userId: 'me',
            labelIds: ['INBOX'],
            maxResults: 10
        });
        if (response.data.resultSizeEstimate > 0) {
            await response.data.messages.forEach(async (email) => {
                const emailDetails = await this.getEmailDetails(gmail, email.id);
                const headers = emailDetails.payload.headers;
                const sender = await headers.find(header => header.name === 'From').value;
                const emailAddress = sender ? sender.match(/<(.*?)>/) ? sender.match(/<(.*?)>/)[1] : sender : null;
                const isInList = await receivers.find(receiver => receiver == emailAddress);
                if (isInList != undefined) {
                    await gmail.users.messages.modify({
                        userId: 'me',
                        id: email.id,
                        requestBody: {
                          addLabelIds: ['SPAM']
                        }
                      });
                    console.log(`Email ${email.id} has been moved to spams`);
                }
            })
        }
    }

    async markEmailAsImportant(userId, receivers: [string]) {
        const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "google"});
        const oauth2Client = new google.auth.OAuth2(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET,
          process.env.GOOGLE_REDIRECT_URI,
        );
        oauth2Client.setCredentials({access_token: dbResult.access_token});
      
        const gmail = google.gmail({
          version: 'v1',
          auth: oauth2Client
        });
        const response = await gmail.users.messages.list({
            userId: 'me',
            labelIds: ['INBOX'],
            maxResults: 10
        });
        if (response.data.resultSizeEstimate > 0) {
            await response.data.messages.forEach(async (email) => {
                const emailDetails = await this.getEmailDetails(gmail, email.id);
                const headers = emailDetails.payload.headers;
                const sender = await headers.find(header => header.name === 'From').value;
                const emailAddress = sender ? sender.match(/<(.*?)>/) ? sender.match(/<(.*?)>/)[1] : sender : null;
                const isInList = await receivers.find(receiver => receiver == emailAddress);
                if (isInList != undefined) {
                    const modifyMessageRequest = {
                        userId: 'me',
                        id: email.id,
                        requestBody: {
                            addLabelIds: ['IMPORTANT']
                        }
                    };
                    const result = await gmail.users.messages.modify(modifyMessageRequest);
                    console.log(`Email ${email.id} marked as important.`);
                }
            })
        }
      }      
}