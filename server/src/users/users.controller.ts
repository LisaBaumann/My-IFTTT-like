import { Controller, Post, Body, UseGuards, Get, Put, Delete, HttpException, HttpStatus, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UserDto, UserLoginDto, UserLoggedDto, UserRegisterDto, UserPasswordDto } from './user.dto';
import { ApiOkResponse, ApiBody, ApiNotFoundResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

  @Post('auth/register')
  @ApiOperation({ summary: 'Registration', description: 'Registration on the application' })
  @ApiBody({ type: UserRegisterDto, description: 'User details' })
  @ApiOkResponse({ description: 'The user has been created', type: UserDto })
  async addUser(@Body() userRegisterDto: UserRegisterDto): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(userRegisterDto.password, 12);
    const result = await this.usersService.insertUser(userRegisterDto.email, hashedPassword, userRegisterDto.name, userRegisterDto.surname);
    return {
			email: result.email,
      name: result.name,
			surname: result.surname,
    };
  }

	@UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: 'Login', description: 'The connection on the application' })
  @Post('auth/login')
  @ApiBody({ type: UserLoginDto, description: 'User details' })
  @ApiOkResponse({ description: "The user's access token", type: UserLoggedDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  async login(@Body() userLoginDto: UserLoginDto): Promise<UserLoggedDto> {
    return this.authService.login(userLoginDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'User informations', description: 'Get all user informations' })
  @UseGuards(JwtAuthGuard)
  @Get('user')
  @ApiOkResponse({ description: 'The found user', type: UserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  async getUser(@Req() req): Promise<UserDto> {
    const user = await this.usersService.getUser(req.user.email)
    if (req.user.email) {
      return {
        email: user.email,
        name: user.name,
        surname: user.surname,
      };
    }
    throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
  }
  
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modify user', description: 'Modify user informations' })
  @UseGuards(JwtAuthGuard)
  @Put('user')
  @ApiBody({ type: UserDto, description: 'User details' })
  @ApiOkResponse({ description: 'The found user', type: UserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  async putUser(@Req() req, @Body() userDto: UserDto): Promise<UserDto> {
    if (req.user.email && userDto) {
      const result = await this.usersService.resetUserInfos(req.user.email, userDto);
      return {
        email: result.email,
        name: result.name,
        surname: result.surname,
      };
    }
    throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modify password', description: "Modify user's password" })
  @UseGuards(JwtAuthGuard)
  @Put('auth/reset-password')
  @ApiBody({ type: UserPasswordDto, description: 'User details' })
  @ApiOkResponse({ description: 'The found user', type: UserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  async resetPassword(@Req() req, @Body() userPasswordDto: UserPasswordDto): Promise<UserDto> {
    if (req.user.email && userPasswordDto.password) {
      const hashedPassword = await bcrypt.hash(userPasswordDto.password, 12);
      const result = await this.usersService.resetPassword(hashedPassword, req.user.email);
      return {
        email: result.email,
        name: result.name,
        surname: result.surname,
      };
    }
    throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user', description: 'Delete user account from the application' })
  @UseGuards(JwtAuthGuard)
  @Delete('user')
  @ApiOkResponse({ description: 'The found user', type: UserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  async deleteUser(@Req() req): Promise<UserDto> {
    if (req.user.email) {
      const result = await this.usersService.deleteUser(req.user.email);
      return {
        email: result.email,
        name: result.name,
        surname: result.surname,
      };
    }
    throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
  }
}
