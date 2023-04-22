import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { SpotifyService } from './spotify.service';
import { PlatformController } from './platform.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OutlookService } from './outlook.service';
import { GoogleService } from './google.service';
import { GithubService } from './github.service';
import { SlackService } from './slack.service';
import { PlatformSchema } from './platform.model';
import { GoogleDriveService } from './googleDrive.service';
import { AreaSchema } from 'src/area/area.model';
import { PlatformService } from './platform.service';
import { GoogleCalendarService } from './googleCalendar.service';
import { GmailService } from './gmail.service';
import { TwitchService } from './twitch.service';
import { OnedriveService } from './onedrive.service';
import { TeamsService } from './teams.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: "platform", schema: PlatformSchema }])],
    providers: [JwtStrategy, SpotifyService, OutlookService, GoogleService, GithubService, SlackService, GoogleDriveService, PlatformService, GoogleCalendarService, GmailService, TwitchService, OnedriveService, TeamsService],
    controllers: [PlatformController],
    exports: [PlatformModule, SpotifyService, OutlookService, GoogleService, GithubService, SlackService, GoogleDriveService, GoogleCalendarService, GmailService, TwitchService, OnedriveService, TeamsService]
})
export class PlatformModule {}
