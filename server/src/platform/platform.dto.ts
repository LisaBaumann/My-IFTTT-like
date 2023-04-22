import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class PlatformDetailsDto {
    @ApiProperty({ description: 'Name of the platform' })
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty({ description: 'Indicates if the user is connected to the platform' })
    isConnected: boolean;
  
    @ApiProperty({ description: "Image path for the logo's platform" })
    @IsString()
    @IsNotEmpty()
    imagePath: string;
}

export class PlatformsDto {
    @ApiProperty({ 
        type: [PlatformDetailsDto],
        description: 'List of every platforms and informations about if the user is connected or not' 
    })
    platforms: PlatformDetailsDto[];
}
  
// Get actions / reactions

export class InputDto {}

export class VariablesDto {}

export class ActionDto {
    @ApiProperty({ description: 'Title of the action' })
    title: string;
    
    @ApiProperty({ description: 'Description of the action' })
    description: string;
    
    @ApiProperty({
        type: [InputDto],
        description: 'List of available inputs for the action'
    })
    inputs: InputDto[];

    @ApiProperty({
        type: [VariablesDto],
        description: 'List of available varibles for the reactions'
    })
    variables: VariablesDto[];
}

export class ReactionDto {
    @ApiProperty({ description: 'Title of the reaction' })
    title: string;
    
    @ApiProperty({ description: 'Description of the reaction' })
    description: string;
    
    @ApiProperty({
        type: [InputDto],
        description: 'List of available inputs for the reaction'
    })
    inputs: InputDto[];
}

export class ActionsReactionsDto {
    @ApiProperty({
      type: [ActionDto],
      description: 'List of available actions'
    })
    actions: ActionDto[];
  
    @ApiProperty({
      type: [ReactionDto],
      description: 'List of available reactions'
    })
    reactions: ReactionDto[];
}

export class DeletePlatformDto {
    @ApiProperty({description: "Name of the service"})
    @IsString()
    @IsNotEmpty()
    readonly platform: string;
}