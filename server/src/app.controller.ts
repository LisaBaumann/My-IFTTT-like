import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("about.json")
  async aboutJson() {
    return this.appService.getAbout();
  }

  @Get()
  async baseRoute() {
    return "Documentation API : http://localhost:8080/documentation";
  }

  @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file) {
        const fileName = file.originalname;
        console.log(process.cwd() + '/driveFiles/' + fileName)
        const filePath = process.cwd() + '/driveFiles/' + fileName;
        const stream = fs.createWriteStream(filePath);
        stream.write(file.buffer);
        stream.end();
        return {
            message: 'File uploaded successfully',
            fileName: fileName
        };
    }
}
