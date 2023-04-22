import { Injectable } from '@nestjs/common';
import * as os from 'os';

@Injectable()
export class AppService {
  	getIpAddress(): string {
    	const interfaces = os.networkInterfaces();
    	const addresses = [];
    	for (const interfaceName of Object.keys(interfaces)) {
      		for (const interfaceInfo of interfaces[interfaceName]) {
        		if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
          			addresses.push(interfaceInfo.address);
        		}
      		}
    	}
    	return addresses[0];
  	}

	getCurrentTimestamp(): number {
		return Date.now();
	}

  	getAbout(): any {
    	return {
      		"client": {
        		"host": this.getIpAddress()
      		},
			"server": {
				"current_time": this.getCurrentTimestamp(),
				"services": [{
					"name": "spotify",
					"actions": [{
						"name": "Music change",
						"description": "The music you are listening changes"
					}, {
						"name": "Playlist item added",
						"description": "Music added on playlist"
					},
					],
					"reactions": []
				},
				{
					"name": "outlook",
					"actions": [],
					"reactions": [{
						"name": "Send email" ,
						"description": "Send custom email to specified users"
					}]
				},
				{
					"name": "github",
					"actions": [{
						"name": "New commit",
						"description": "Detect a new commit"
					},{
						"name": "New pull request",
						"description": "Detect if a pull request added or deleted"
					}],
					"reactions": [{
						"name": "Create repo",
						"description": "Create repository"
					}]
				},
				{
					"name": "google drive",
					"actions": [],
					"reactions": [{
						"name": "Upload image" ,
						"description": "Upload a PNG, JPG, JPEG image"
					},
					{
						"name": "Upload file",
						"description": "Upload a .txt, .csv, .xml, .rtf"
					},
					{
						"name": "Upload application",
						"description": "Upload a .pdf or .zip file"
					}]
				},
				{
					"name": "gmail",
					"actions": [{
						"name": "Email reception",
						"description": "Receive any email"
					}, {
						"name": "One or more emailed me",
						"description": "Receive an email from all your selected users"
					}],
					"reactions": [{
						"name": "Send email",
						"description": "Send custom email to specified users"
					},
					{
						"name": "Delete email",
						"description": "Delete emails from senders in the last 10 mails received when the reactions occured"
					},
					{
						"name": "Archive email",
                        "description": "Archive emails from senders in the last 10 mails received when the reactions occured"
					},
					{
						"name": "Mark as important email",
                        "description": "Mark as important emails from senders in the last 10 mails received when the reactions occured"
					},
					{
						"name": "Place in spam email",
                        "description": "Place in spam emails from senders in the last 10 mails received when the reactions occured"
					}]
				},
				{
					"name": "twitch",
					"actions": [{
						"name": "Streamer goes live",
						"description": "The chosen streamer goes live"
					}, {
						"name": "Clip creation",
						"description": "The chosen streamer create clip"
					}],
					"reactions": [],
				},
				{
					"name": "google calendar",
					"actions": [{
						"name": "New event",
                        "description": "Detect when you add or delete an event"
					}],
					"reactions": [{
						"name": "Add event",
                        "description": "add an event to your calendar"
					}]
				},
				{
					"name": "slack",
					"actions": [{
						"name": "Member added",
                        "description": "detect when a member is added to the workspace"
					}],
					"reactions": []
				},
				{
					"name": "onedrive",
					"actions": [{
						"name": "New file",
						"description": "detects when a new file or folder is created"
					}],
					"reactions": [{
						"name": "Create folder",
						"description": "create a folder in your onedrive database"
					}]
				},
				{
					"name": "teams",
					"actions": [{
						"name": "New message",
						"description": "Detects when a new message is sent in the group chat"
					}, {
						"name": "New member",
						"description": "Detects when someone joins the group chat"
					}, {
						"name": "Member left",
						"description": "Detects when someone leaves the group chat"
					}],
					"reactions": [{
						"name": "Send message",
						"description": "Sends a message in the group chat"
					}]
				},
				{
					"name": "twitch",
					"actions": [{
						"name": "Stream start",
						"description": "Detects when streamer starts a livestream"
					}, {
						"name": "Clip created",
						"description": "Detects when a clip is created on the streamer's channel"
					}]
				}]
			}
		}
  	}
}
