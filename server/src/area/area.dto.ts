import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AreaActionDto {
    @ApiProperty({description: "Platform name"})
    @IsString()
    platform: string;

    @ApiProperty({description: "Action name"})
    @IsString()
    name: string;

    @ApiProperty({description: "Action parameters"})
    parameters: Record<string, any>;
}

export class AreaReactionDto {
    @ApiProperty({description: "Platform name"})
    @IsString()
    platform: string;

    @ApiProperty({description: "Reaction name"})
    @IsString()
    name: string;

    @ApiProperty({description: "Reaction parameters"})
    parameters: Record<string, any>;
}

export class AreaDto {
    @ApiProperty({description: "The user'id"})
    userId: string;

    @ApiProperty({type: AreaActionDto, description: "Details of the action"})
    action: AreaActionDto;

    @ApiProperty({type: AreaReactionDto, description: "Details of every reactions"})
    reactions: AreaReactionDto[];
}

export class UserAreaDto {
    @ApiProperty({type: AreaActionDto, description: "Details of the action"})
    action: AreaActionDto;

    @ApiProperty({type: AreaReactionDto, description: "Details of every reactions"})
    reactions: AreaReactionDto[];
}
