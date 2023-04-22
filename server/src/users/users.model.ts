import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    id: Number,
    email: String,
    password: String,
    name: String,
    surname: String,
});

export interface User extends Document {
    readonly email: string;
    readonly password: string;
    readonly name: string;
    readonly surname: string;
}