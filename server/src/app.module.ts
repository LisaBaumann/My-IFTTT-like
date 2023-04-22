import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AreaModule } from './area/area.module';
import { PlatformModule } from './platform/platform.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/area'),
    UsersModule, 
    AuthModule, 
    PlatformModule,
    AreaModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
