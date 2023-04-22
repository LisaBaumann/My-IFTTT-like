import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Platform } from './platform.model';
import { google } from 'googleapis';

@Injectable()
export class GoogleDriveService {
  constructor(@InjectModel('platform') private readonly platformModel: Model<Platform>) {}

  async uploadImage(userId: string, imagePath: String, imageName: string, imageType: string): Promise<void> {
    const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "google"});

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    )
    oauth2Client.setCredentials({access_token: dbResult.access_token})

    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    const fs = require('fs');

    let mimeType = 'image/' + imageType;

    const fileMetadata = {
      name: imageName,
      mimeType: mimeType
    };

    const imageContents = await fs.createReadStream(imagePath + imageName);

    const media = {
      body: imageContents
    }

    const res = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: 'id'
    });

    console.log(`File uploaded: ${res.data.id}`);
  }

  async uploadText(userId: string, filePath: string, fileName: string, fileType: string): Promise<void> {
    const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "google"});
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    )
    oauth2Client.setCredentials({access_token: dbResult.access_token})
    
    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    const fs = require('fs');
    
    let mimeType = 'text/' + fileType;
    
    const fileMetadata = {
      name: fileName,
      mimeType: mimeType
    };
    
    const fileContents = await fs.createReadStream(filePath + fileName);
    const media = {
      body: fileContents
    };

    const res = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: 'id'
    });

    console.log(`File uploaded: ${res.data.id}`);
  }

  async uploadApplication(userId: string, applicationPath: string, applicationName: string, applicationType: string): Promise<void> {
    const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "google"});
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    )
    oauth2Client.setCredentials({access_token: dbResult.access_token})
    
    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    const fs = require('fs');
    
    const fileMetadata = {
      name: applicationName,
      mimeType: 'application/' + applicationType
    };

    const applicationContents = fs.createReadStream(applicationPath + applicationName);
    const media = {
      body: applicationContents
    };
    const res = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: 'id'
    });

    console.log(`File uploaded: ${res.data.id}`);
  }
}