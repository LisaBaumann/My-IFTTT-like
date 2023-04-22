import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActionsReactionsDto, PlatformsDto } from './platform.dto';
import { Platform } from './platform.model';

@Injectable()
export class PlatformService {
    constructor(
        @InjectModel('platform') private readonly platformModel: Model<Platform>,
    ) {}

    async isConnected(id, platform) {
        const platforms = await this.platformModel.find({userId: id});
        const matchingPlatforms = platforms.filter(result => result.plateform === platform);
        if (matchingPlatforms.length > 0) {
            return true;
        }
        return false;
    }

    async deletePlatform(id, platform) {
        const platforms = await this.platformModel.findOneAndDelete({"userId": id, "plateform": platform.platform_name});
        if (platforms) {
            return {
                platform: platforms.plateform
            };
        }
        throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
    }

    async getAllPlatforms(userId): Promise<PlatformsDto> {
        return {
            platforms: [
            {
                name: "Spotify",
                isConnected: await this.isConnected(userId, "spotify"),
                imagePath : "https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/Spotify.png",
            },
            {
                name: "Outlook",
                isConnected: await this.isConnected(userId, "outlook"),
                imagePath : "https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/Outlook.png",
            },
            {
                name: "Github",
                isConnected: await this.isConnected(userId, "github"),
                imagePath : "https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/Github.png",
            },
            {
                name: "Google Drive",
                isConnected: await this.isConnected(userId, "google"),
                imagePath : "https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/Googledrive.png",
            },
            {
                name: "Gmail",
                    isConnected: await this.isConnected(userId, "google"),
                    imagePath : "https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/Gmail.png",
            },
            {
                name: "Google calendar",
                    isConnected: await this.isConnected(userId, "google"),
                    imagePath : "https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/GoogleCalendar.png",
            },
            {
                name: "Slack",
                    isConnected: await this.isConnected(userId, "slack"),
                    imagePath : "https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/Slack.png",
            },
            {
                name: "Twitch",
                isConnected: await this.isConnected(userId, "twitch"),
                imagePath : "https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/Twitch.png",
            },
            {
                name: "Teams",
                isConnected: await this.isConnected(userId, "outlook"),
                imagePath : "https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/Teams.png",
            },
            {
                name: "One drive",
                isConnected: await this.isConnected(userId, "outlook"),
                imagePath : "https://raw.githubusercontent.com/VandeveldePaul/AreaAssets/main/Onedrive.png",
            },
            ]
        }
    }

    async getService(service): Promise<ActionsReactionsDto> {
        switch(service) {
            case "spotify":
                return {
                    actions: [
                        {
                            title: "Music change",
                            description: "The music you are listening changes",
                            inputs: [],
                            variables : []
                        },
                        {
                            title: "Playlist item added",
                            description: "Music added on playlist",
                            inputs: ["playlistId"],
                            variables : []
                        }
                    ],
                    reactions: []
                }
            case "outlook":
                return {
                    actions: [],
                    reactions: [
                        {
                            title: "Send an email",
                            description: "Send custom email to specified users",
                            inputs: ["message", "object", "email"]
                        }
                    ]
                }
            case "onedrive":
                return {
                    actions: [
                        {
                            title: "New file",
                            description: "Detects when a new file or folder is created",
                            inputs: [],
                            variables : []
                        }
                    ],
                    reactions: [
                        {
                            title: "Create folder",
                            description: "Create a folder in your onedrive database",
                            inputs: ["folder name"]
                        }
                    ]
                }
            case "teams":
                return {
                    actions: [
                        {
                            title: "New message",
                            description: "Detects when a new message is sent in the group chat",
                            inputs: ["group name"],
                            variables : []
                        },
                        {
                            title: "New member",
                            description: "Detects when someone joins the group chat",
                            inputs: ["group name"],
                            variables : []
                        },
                        {
                            title: "Member left",
                            description: "Detects when someone leaves the group chat",
                            inputs: ["group name"],
                            variables : []
                        }
                    ],
                    reactions: [
                        {
                            title: "Send message",
                            description: "Sends a message in the group chat",
                            inputs: ["group name", "message content"]
                        }
                    ]
                }
            case "twitch":
                return {
                    actions: [
                        {
                            title: "Stream start",
                            description: "Detects when streamer starts a livestream",
                            inputs: ["streamer name"],
                            variables : ["stream_title"]
                        },
                        {
                            title: "Clip created",
                            description: "Detects when a clip is created on the streamer's channel",
                            inputs: ["streamer name"],
                            variables : ["clip_url"]
                        }
                    ],
                    reactions: []
                }
            case "github":
                return {
                    actions: [
                        {
                            title: "New commit",
                            description: "Detect a new commit",
                            inputs: ["repo", "owner"],
                            variables : ["committer_name", "date_commit", "message"]
                        },
                        {
                            title: "New pull request",
                            description: "Detect if a pull request added or deleted",
                            inputs: ["repo", "owner"],
                            variables: ["pull_title", "pull_state"]
                        }
                    ],
                    reactions: [
                        {
                            title: "Create repo",
                            description: "Create a repository",
                            inputs: ["repo name"]
                        }
                    ]
                }
            case "googledrive":
                return {
                    actions: [],
                    reactions: [
                        {
                            title: "Upload image",
                            description: "Upload a PNG, JPG, JPEG image",
                            inputs: ["file name"]
                        },
                        {
                            title: "Upload file",
                            description: "Upload a .txt, .csv, .xml, .rtf file",
                            inputs: ["file name"]
                        },
                        {
                            title: "Upload application",
                            description: "Upload a .pdf or .zip file",
                            inputs: ["file name"]
                        }
                    ]
                }
            case "gmail":
                return {
                    actions: [
                        {
                            title: "Email reception",
                            description: "Receive any email",
                            inputs: [],
                            variables : ["emailAdress", "date"]
                        },
                        {
                            title: "One or more emailed me",
                            description: "Receive an email from all your selected users",
                            inputs: ["[senders]"],
                            variables : []
                        },
                    ],
                    reactions: [
                        {
                            title: "Send email",
                            description: "Send custom email to specified users",
                            inputs: ["[receivers]", "object", "message"]
                        },
                        {
                            title: "Delete email",
                            description: "Delete emails from senders in the last 10 mails received when the reactions occured",
                            inputs: ["[receivers]"]
                        },
                        {
                            title: "Archive email",
                            description: "Archive emails from senders in the last 10 mails received when the reactions occured",
                            inputs: ["[receivers]"]
                        },
                        {
                            title: "Mark as important email",
                            description: "Mark as important emails from senders in the last 10 mails received when the reactions occured",
                            inputs: ["[receivers]"]
                        },
                        {
                            title: "Place in spam email",
                            description: "Place in spam emails from senders in the last 10 mails received when the reactions occured",
                            inputs: ["[receivers]"]
                        },
                    ]
                }
            case "googlecalendar":
                return {
                    actions: [
                        {
                            title: "New event",
                            description: "Detect when you add or delete an event",
                            inputs: [],
                            variables: ["organizer", "event_name"]
                        }
                    ],
                    reactions: [
                        {
                            title: "Add event",
                            description: "Add an event to your calendar",
                            inputs: ["start", "end", "title", "attendees"]
                        }
                    ]
                }
            case "slack":
                return {
                    actions: [
                        {
                            title: "Member added",
                            description: "Detect when a member is added to the workspace",
                            inputs: [],
                            variables: ["members"]
                        }
                    ],
                    reactions: []
                }
            default:
                throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
        }
    }
}
