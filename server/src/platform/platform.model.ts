import * as mongoose from 'mongoose'

export const PlatformSchema = new mongoose.Schema({
    userId: String,
    plateform: String,
    access_token: String,
    refresh_token: String,
});

export interface Platform extends Document {
    readonly userId: string,
    readonly plateform: string,
    readonly access_token: string,
    readonly refresh_token: string,
}