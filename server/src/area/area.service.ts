import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AreaDto, UserAreaDto } from './area.dto';
import { Interval } from '@nestjs/schedule';
import { SpotifyService } from 'src/platform/spotify.service';
import { OutlookService } from 'src/platform/outlook.service';
import { GithubService } from 'src/platform/github.service';
import { GoogleDriveService } from 'src/platform/googleDrive.service';
import { SlackService } from 'src/platform/slack.service';
import { GoogleCalendarService } from 'src/platform/googleCalendar.service';
import { GmailService } from 'src/platform/gmail.service';
import { TeamsService } from 'src/platform/teams.service';
import { OnedriveService } from 'src/platform/onedrive.service';
import { TwitchService } from 'src/platform/twitch.service';
import { replaceParam } from 'src/utils/paramParser';


@Injectable()
export class AreaService {
	constructor(@InjectModel('ActionRea') private readonly areaModel: Model<AreaDto>, 
        private readonly spotifyService: SpotifyService, 
        private readonly outlookService: OutlookService,
        private readonly githubService: GithubService,
        private readonly slackService: SlackService,
        private readonly googleCalendarService: GoogleCalendarService,
        private readonly googleDriveService: GoogleDriveService,
        private readonly teamsService: TeamsService,
        private readonly onedriveService: OnedriveService,
        private readonly twitchService: TwitchService,
        private readonly gmailService: GmailService ) {}
	    public async inserAreaInDb(areaDto: AreaDto): Promise<UserAreaDto> {
        const actionRea = await new this.areaModel(areaDto);
        actionRea.save();
        return {
            action : {
                platform: actionRea.action.platform,
                name: actionRea.action.name,
                parameters: actionRea.action.parameters
            },
            reactions: actionRea.reactions.map((reaction) => {
                return {
                    platform: reaction.platform,
                    name: reaction.name,
                    parameters: reaction.parameters
                };
            })
        };
	}

    public async getAllAreas(info: any): Promise<UserAreaDto[]> {
        const areas = await this.areaModel.find({"userId": info.id}, { "userId": 0});
        const result = areas.map(area => ({
            action : {
                platform: area.action.platform,
                name: area.action.name,
                parameters: area.action.parameters
            },
            reactions: area.reactions.map((reaction) => {
                return {
                    platform: reaction.platform,
                    name: reaction.name,
                    parameters: reaction.parameters
                };
            })
        }));
        return result;
    }

    public async deleteArea(info: any, deleteAreaDto: UserAreaDto): Promise<UserAreaDto> {
        const areas = await this.areaModel.findOneAndDelete({"userId": info.id, "action.platform": deleteAreaDto.action.platform, "action.name": deleteAreaDto.action.name , "reactions": { $elemMatch : {platform: { $in: deleteAreaDto.reactions.map(e => e.platform)}, name: { $in: deleteAreaDto.reactions.map(e => e.name)}}}});
        console.log(areas);
        return {
            action : {
                platform: areas.action.platform,
                name: areas.action.name,
                parameters: areas.action.parameters
            },
            reactions: areas.reactions.map((reaction) => {
                return {
                    platform: reaction.platform,
                    name: reaction.name,
                    parameters: reaction.parameters
                };
            })
        };
    }

    public async triggerReactions(info: any, infoAction: {}) {
        const promises = info.reactions.map(async react => {
            if (react.platform == "outlook" && react.name == "Send an email") {
                await this.outlookService.getAccessToken(info.userId, react, infoAction);
            }
            if (react.platform == "google drive" && react.name == "Upload image") {
                const parts = await replaceParam(react.parameters["file name"], infoAction).split(".");
                const fileExtension = parts[parts.length - 1];
                await this.googleDriveService.uploadImage(info.userId, 'driveFiles/' , replaceParam(react.parameters["file name"], infoAction), fileExtension);
            }
            if (react.platform == "google drive" && react.name == "Upload file") {
                const parts = await replaceParam(react.parameters["file name"], infoAction).split(".");
                const fileExtension = parts[parts.length - 1];
                await this.googleDriveService.uploadText(info.userId, 'driveFiles/' , replaceParam(react.parameters["file name"], infoAction), fileExtension);
            }
            if (react.platform == "google drive" && react.name == "Upload application") {
                const parts = await replaceParam(react.parameters["file name"], infoAction).split(".");
                const fileExtension = parts[parts.length - 1];
                await this.googleDriveService.uploadApplication(info.userId, 'driveFiles/' , replaceParam(react.parameters["file name"], infoAction), fileExtension);
            }
            if (react.platform == "google calendar" && react.name == "Add event") {
                await this.googleCalendarService.AddAnEvent(info.userId, react.parameters["start"], react.parameters["end"], react.parameters["title"], react.parameters["attendees"]);
            }
            if (react.platform == "github" && react.name == "Create repo") {
                await this.githubService.createRepo(info.userId, react.parameters["repo name"]);
            }
            if (react.platform == "gmail" && react.name == "Send email") {
                for (var i = 0; i < react.parameters["receivers"].length; i++) {
                    react.parameters["receivers"][i] = replaceParam(react.parameters["receivers"][i], infoAction);
                }
                await this.gmailService.sendEmail(info.userId, react.parameters["receivers"], replaceParam(react.parameters["object"], infoAction), replaceParam(react.parameters["message"], infoAction));
            }
            if (react.platform == "gmail" && react.name == "Delete email") {
                for (var i = 0; i < react.parameters["receivers"].length; i++) {
                    react.parameters["receivers"][i] = replaceParam(react.parameters["receivers"][i], infoAction);
                }
                await this.gmailService.deleteEmail(info.userId, react.parameters["receivers"]);
            }
            if (react.platform == "gmail" && react.name == "Archive email") {
                for (var i = 0; i < react.parameters["receivers"].length; i++) {
                    react.parameters["receivers"][i] = replaceParam(react.parameters["receivers"][i], infoAction);
                }
                await this.gmailService.archiveEmail(info.userId, react.parameters["receivers"]);
            }
            if (react.platform == "gmail" && react.name == "Place in spam email") {
                for (var i = 0; i < react.parameters["receivers"].length; i++) {
                    react.parameters["receivers"][i] = replaceParam(react.parameters["receivers"][i], infoAction);
                }
                await this.gmailService.spamEmail(info.userId, react.parameters["receivers"]);
            }
            if (react.platform == "gmail" && react.name == "Mark as important email") {
                for (var i = 0; i < react.parameters["receivers"].length; i++) {
                    react.parameters["receivers"][i] = replaceParam(react.parameters["receivers"][i], infoAction);
                }
                await this.gmailService.markEmailAsImportant(info.userId, react.parameters["receivers"]);
            }
            if (react.platform == "onedrive" && react.name == "Create folder") {
                await this.onedriveService.CreateFolder(info.userId, react.parameters["folder name"]);
            }
            if (react.platform == "teams" && react.name == "Send message") {
                await this.teamsService.SendMessage(info.userId, react.parameters["group name"], replaceParam(react.parameters["message content"], infoAction));
            }
        });
        await Promise.all(promises);
    }
    
    @Interval(10000)
    async handleArea() {
        const area = await this.areaModel.find({});
        const promises = area.map(async result => {
            if (result.action.platform == "spotify" && result.action.name == "Music change") {
                const infoMusic = await this.spotifyService.handleSpotifyArea(result.userId)
                if (infoMusic != null) {
                    await this.triggerReactions(result, infoMusic);
                }
            }
            if (result.action.platform == "github" && result.action.name == "New commit") {
                const infoCommit = await this.githubService.checkCommitAdded(result.userId, result.action.parameters["repo"], result.action.parameters["owner"]);
                if (infoCommit != null) {
                    await this.triggerReactions(result, infoCommit)
                }
            }
            if (result.action.platform == "spotify" && result.action.name == "Playlist item added") {
                const infoPlaylist = await this.spotifyService.handleSpotifyPlaylist(result.userId, result.action.parameters["playlistId"])
                if (infoPlaylist != null) {
                    console.log(infoPlaylist)
                    await this.triggerReactions(result, infoPlaylist);
                }
            }
            if (result.action.platform == "slack" && result.action.name == "Member added") {
                const infoUsers = await this.slackService.handleSlackChannel(result.userId);
                if (infoUsers != null) {
                    console.log(infoUsers)
                    await this.triggerReactions(result, infoUsers);
                }
            }
            if (result.action.platform == "google calendar" && result.action.name == "New event") {
                const newEvent = await this.googleCalendarService.getAllEventList(result.userId);
                if (newEvent != null) {
                    console.log(newEvent);
                    await this.triggerReactions(result, newEvent);
                } 
            }
            if (result.action.platform == "github" && result.action.name == "New pull request") {
                const newPr = await this.githubService.checkPrAdded(result.userId, result.action.parameters["repo"], result.action.parameters["owner"]);
                if (newPr != null) {
                    await this.triggerReactions(result, newPr);
                }
            }
            if (result.action.platform == "gmail" && result.action.name == "Email reception") {
                const infoEmail = await this.gmailService.isEmailReceived(result.userId);
                if (infoEmail != null) {
                    await this.triggerReactions(result, infoEmail);
                }
            }
            if (result.action.platform == "gmail" && result.action.name == "One or more emailed me") {
                const infoEmail = await this.gmailService.isSomeoneEmailMe(result.userId, result.action.parameters["senders"]);
                if (infoEmail != null) {
                    await this.triggerReactions(result, infoEmail);
                }
            }
            if (result.action.platform == "twitch" && result.action.name == "Clip created") {
                console.log("Action détectée")
                const infoEmail = await this.twitchService.getnewclip(result.userId, result.action.parameters["streamer name"]);
                console.log("InfoEmail: ", infoEmail)
                if (infoEmail != null) {
                    await this.triggerReactions(result, infoEmail);
                }
            }
            if (result.action.platform == "twitch" && result.action.name == "Stream start") {
                const infoEmail = await this.twitchService.StartedStreaming(result.userId, result.action.parameters["streamer name"]);
                console.log(infoEmail)
                if (infoEmail != null) {
                    await this.triggerReactions(result, infoEmail);
                }
            }
            if (result.action.platform == "onedrive" && result.action.name == "New file") {
                const infoEmail = await this.onedriveService.checknewfile(result.userId);
                console.log(infoEmail)
                if (infoEmail != null) {
                    await this.triggerReactions(result, infoEmail);
                }
            }
            if (result.action.platform == "teams" && result.action.name == "New message") {
                const infoEmail = await this.teamsService.checknewmessage(result.userId, result.action.parameters["group name"]);
                console.log(infoEmail)
                if (infoEmail != null) {
                    await this.triggerReactions(result, infoEmail);
                }
            }
            if (result.action.platform == "teams" && (result.action.name == "New member" || result.action.name == "Member left")) {
                const infoEmail = await this.teamsService.getteamsmember(result.userId, result.action.parameters["group name"]);
                if (infoEmail != null) {
                    await this.triggerReactions(result, infoEmail);
                }
            }
        });
        await Promise.all(promises);
    }
}
