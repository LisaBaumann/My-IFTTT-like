import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	  ) {}

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.usersService.getUser(email);
		if (!user) {
			throw new NotAcceptableException('could not find the user');
		}
		const passwordValid = await bcrypt.compare(password, user.password);
		if (user && passwordValid) {
			return {
				userId: user._id.toString(),
				userSurname: user.surname
			};
		}
		return null;
	}
	async login(user: any) {
		const isLogged = this.usersService.getUser(user.email);
		if (isLogged) {
			const payload = { email: user.email, sub: (await this.usersService.getUser(user.email))._id.toHexString() };
			return {
				access_token: this.jwtService.sign(payload),
			};
		}
		throw new NotAcceptableException('could not find the user');
    }
}
