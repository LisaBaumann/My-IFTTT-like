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
export class GoogleCalendarService {
    public idCalendar = {}
	constructor(@InjectModel('platform') private readonly platformModel: Model<Platform>) {}
    
    async getAllEventList(userId: string): Promise<{} | null> {
        const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "google"});
        let time = new Date().toISOString();
        try {
            const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${time}`, {
                method: 'GET',
                headers: {
                        'Authorization': `Bearer ${dbResult.access_token}`,
                        'Content-Type': 'application/json',
                    },
                });
            const json = await response.json();
            if (this.idCalendar[userId] != undefined && this.idCalendar[userId] != json.items[json.items.length - 1].id) {
                this.idCalendar[userId] = json.items[json.items.length - 1].id;
                        return {
                            "organizer": json.items[json.items.length - 1].organizer.email,
                            "event_name": json.items[json.items.length - 1].summary
                        }
            }
            if (json.items.length > 0) {
                this.idCalendar[userId] = json.items[json.items.length - 1].id;
            }
            //console.log(JSON.stringify(json, null, 2));
            //console.log("##########################################################");

        } catch(e) {
            console.log(e);
            console.log("problemo");
        }
        return null;
    }
    
    async AddAnEvent(userId: string, start: string, end: string, eventTitle: string, attendees: string) {
        console.log("j'arrive vraiment dans cette fonction")
        const dbResult = await this.platformModel.findOne({"userId": userId, "plateform": "google"});
        const participants = attendees.split(' ').map(item => ({"email": item}));
        console.log("end c'est çà: " + end)
        console.log("start c'est çà: " + start)
        const Events = {
            "start": {
                "dateTime": start,
                "timeZone": "Europe/Paris"
            },
            "end": {
                "dateTime": end,
                "timeZone": "Europe/Paris"
            },
            "attendees": participants,
            "summary": eventTitle
        };
        console.log(Events);

        const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {
            method: 'POST',
            headers: {
                    'Authorization': `Bearer ${dbResult.access_token}`,
                    'Content-Type': 'application/json',
            },
            body: JSON.stringify(Events)
        });
        console.log(response);
        if (!response.ok) {
            throw new Error(await response.text());
        }
    }
}