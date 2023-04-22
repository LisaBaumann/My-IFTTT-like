

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { HttpException, ConflictException } from '@nestjs/common';
import { User } from './users.model'
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
	constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

	public async getUser(email: string) {
		const user = await this.userModel.findOne({ email }).exec();
		if (!user) {
			return null;
		}
		return user;
	}

	public async insertUser(email: string, password: string, name: string, surname: string) {
		const newUser = await new this.userModel({email, password, name, surname});
		if (!await this.getUser(newUser.email)) {
			return newUser.save();
		}
		else
			throw new ConflictException('User already exist');
	}

	public async resetPassword(newPassword: string, userEmail: string) {
		const filter = { email: userEmail };
		const update = { password: newPassword };
		let doc = await this.userModel.findOneAndUpdate(filter, update);
		if (doc)
			return doc;
		else
			throw new ConflictException('User doesn t exist');
	}

	public async resetUserInfos(userEmail: string, user: UserDto) {
		const filter = { email: userEmail };
		const update = user;
		let doc = await this.userModel.findOneAndUpdate(filter, update);
		if (doc)
			return doc;
		else
			throw new ConflictException('User doesn t exist');
	}

	public async deleteUser(userEmail: string) {
		let doc = await this.userModel.findOneAndDelete({email: userEmail});
		if (doc)
			return doc;
		else
			throw new ConflictException('User doesn t exist');
	}
}