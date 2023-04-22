import { Controller, Post, Get, Injectable, Res, HttpStatus, Param, Delete, Body} from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { Query } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';
import { OutlookService } from './outlook.service';
import { GoogleService } from './google.service';
import { GithubService } from './github.service';
import { SlackService } from './slack.service';
import { PlatformService } from './platform.service';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiOperation, ApiNotFoundResponse } from '@nestjs/swagger';
import { ActionsReactionsDto, PlatformsDto, DeletePlatformDto } from './platform.dto';
import { TwitchService } from './twitch.service';
import { OnedriveService } from './onedrive.service';
import { TeamsService } from './teams.service';

@Controller()
export class PlatformController {
    constructor(
        private readonly SpotifyService: SpotifyService,
        private readonly OutlookService: OutlookService,
        private readonly GoogleService: GoogleService,
        private readonly GithubService: GithubService,
        private readonly SlackService: SlackService,
        private readonly PlatformService: PlatformService,
        private readonly TwitchService: TwitchService,
        private readonly OnedriveService: OnedriveService,
        private readonly TeamsService: TeamsService,
    ) {}

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Oauth2 spotify', description: 'Registration on the Spotify service' })
    @Get('auth/spotify')
    @UseGuards(JwtAuthGuard)
    @ApiQuery({ name: 'code', type: String, description: 'The authorization code received from Spotify' })
    @ApiOkResponse({ description: 'Success', type: Object })
    async connectWithSpotify(@Query('code') code: string, @Request() req) {
        var token = await this.SpotifyService.AuthSpotUser(code, req.user);
        console.log("the token is: " + token.access_token)
        await this.SpotifyService.LoadTokenInDb(token.access_token, req.user, "spotify", token.refresh_token);
        return {status: "Success"};
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Oauth2 outlook', description: 'Registration on the Outlook service' })
    @Get('auth/outlook')
    @UseGuards(JwtAuthGuard)
    @ApiQuery({ name: 'code', type: String, description: 'The authorization code received from Outlook' })
    @ApiOkResponse({ description: 'Success', type: Object })
    async connectWithOutlook(@Query('code') code: string, @Request() req) {
        var token = await this.OutlookService.AuthOutlook(code, req.user);
        console.log("the token is: " + token.access_token)
        await this.OutlookService.LoadTokenInDb(token.access_token, req.user, "outlook", token.refresh_token);
        return {status: "Success"};
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Oauth2 google', description: 'Registration on the Google service' })
    @Get('auth/google')
    @UseGuards(JwtAuthGuard)
    @ApiQuery({ name: 'code', type: String, description: 'The authorization code received from Google' })
    @ApiOkResponse({ description: 'Success', type: Object })
    async connectWithGoogle(@Query('code') code: string, @Request() req) {
        var token = await this.GoogleService.AuthGoogle(code, req.user);
        console.log(token)
        await this.GoogleService.LoadTokenInDb(token.access_token, req.user, "google", token.refresh_token);
        return {status: "Success"};
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Oauth2 slack', description: 'Registration on the Slack service' })
    @Get('auth/slack')
    @UseGuards(JwtAuthGuard)
    @ApiQuery({ name: 'code', type: String, description: 'The authorization code received from Slack' })
    @ApiOkResponse({ description: 'Success', type: Object })
    async connectWithTrello(@Query('code') code: string, @Request() req) {
        var token = await this.SlackService.AuthSlack(code, req.user);
        console.log(token)
        await this.SlackService.LoadTokenInDb(token.access_token, req.user, "slack", token.refresh_token);
        return {status: "Success"};
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Oauth2 github', description: 'Registration on the Github service' })
    @Get('auth/github')
    @UseGuards(JwtAuthGuard)
    @ApiQuery({ name: 'code', type: String, description: 'The authorization code received from Github' })
    @ApiOkResponse({ description: 'Success', type: Object })
    async connectWithGithub(@Query('code') code: string, @Request() req) {
        var token = await this.GithubService.AuthGithub(code, req.user);
        console.log(token)
        await this.GithubService.LoadTokenInDb(token.access_token, req.user, "github", token.refresh_token);
        return {status: "Success"};
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Oauth2 twitch', description: 'Registration on the Twitch service' })
    @Get('auth/twitch')
    @UseGuards(JwtAuthGuard)
    @ApiQuery({ name: 'code', type: String, description: 'The authorization code received from Twitch' })
    @ApiOkResponse({ description: 'Success', type: Object })
    async connectWithTwitch(@Request() req) {
        var token = await this.TwitchService.AuthTwitchUser();
        console.log(token);
        await this.TwitchService.LoadTokenInDb(token, req.user, "twitch", '');
        return {status: "Success"};
    }


    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get service', description: "Get a list of every services available on the application and if the user is connected on the service" })
    @Get('platform')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'List of every platforms available on the application', type: PlatformsDto })
    async getPlatform(@Request() req): Promise<PlatformsDto> {
        return await this.PlatformService.getAllPlatforms(req.user.id);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: "Get actions and reactions", description: "Get a list of every actions and reactions available on a service" })
    @Get('platform/:service')
    @ApiQuery({ name: 'service', type: 'string', description: 'The details of the requested service' })
    @ApiOkResponse({ description: 'Success', type: ActionsReactionsDto })
    @UseGuards(JwtAuthGuard)
    async getAreaPlatform(@Param('service') service): Promise<ActionsReactionsDto> {
        return await this.PlatformService.getService(service);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'delete service', description: "Delete a service in order to disconnect from it" })
    @Delete('platform')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'Success', type: DeletePlatformDto})
    @ApiNotFoundResponse({description: "platform not found"})
    async deletePlatform(@Body() platform: DeletePlatformDto, @Request() req): Promise<DeletePlatformDto> {
        return await this.PlatformService.deletePlatform(req.user.id, platform);
    }
}
