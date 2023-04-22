import { Controller, Post, Get, Body, Delete} from '@nestjs/common';
import { Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';
import { AreaDto, UserAreaDto } from './area.dto';
import { AreaService } from './area.service';
import { ApiOkResponse, ApiBody, ApiNotFoundResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AreaController {
    constructor(private readonly areaService: AreaService) {}

    @ApiBearerAuth()
    @ApiOperation({ summary: 'New action / reaction(s)', description: "User adds a new action associated to reaction(s)" })
    @Post('area')
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: AreaDto, description: 'New area details' })
    @ApiOkResponse({ description: 'The user has been created', type: [UserAreaDto] })
    @ApiNotFoundResponse({ description: 'Incorrect area' })
    async getActionReaction(@Body() areaDto: AreaDto, @Request() req): Promise<UserAreaDto> {
        const areaObject = {
            userId: req.user.id,
            ...areaDto
        };
        return this.areaService.inserAreaInDb(areaObject);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: "User's area", description: "List of every actions / reactions of the user" })
    @Get('area')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: "The user's area(s) details", type: [UserAreaDto] })
    @ApiNotFoundResponse({ description: 'Incorrect area' })
    async getAllArea(@Request() req): Promise<UserAreaDto[]> {
        const areas = await this.areaService.getAllAreas(req.user);
        return areas;
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete area', description: "Deletion of area" })
    @Delete('area')
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: UserAreaDto, description: 'The deleted area details' })
    @ApiOkResponse({ description: "The deleted area details", type: [UserAreaDto] })
    @ApiNotFoundResponse({ description: 'Area not found' })
    async deleteArea(@Body() deleteAreaDto: UserAreaDto, @Request() req): Promise<UserAreaDto> {
        const area = await this.areaService.deleteArea(req.user, deleteAreaDto);
        return area;
    }
}