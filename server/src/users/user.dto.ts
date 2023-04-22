import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({description: "The user's name"})
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({description: "The user's surname"})
  @IsString()
  @IsNotEmpty()
  readonly surname: string;

  @ApiProperty({description: "The user's email"})
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}

export class UserLoggedDto {
  @ApiProperty({description: "The user's Json web token"})
  @IsString()
  @IsNotEmpty()
  readonly access_token: string;
}

// Parameters

export class UserLoginDto {
  @ApiProperty({description: "The user's email"})
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({description: "The user's password"})
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class UserRegisterDto {
  @ApiProperty({description: "The user's email"})
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({description: "The user's password"})
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({description: "The user's surname"})
  @IsString()
  @IsNotEmpty()
  readonly surname : string;

  @ApiProperty({description: "The user's name"})
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class UserPasswordDto {
  @ApiProperty({description: "The user's new password"})
  @IsString()
  @IsNotEmpty()
  password: string;
}