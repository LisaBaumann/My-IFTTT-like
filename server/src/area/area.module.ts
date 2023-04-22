import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AreaSchema } from './area.model';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { PlatformModule } from 'src/platform/platform.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: "ActionRea", schema: AreaSchema }]), PlatformModule],
    providers: [AreaService],
    controllers: [AreaController],
    exports: [AreaModule]
})
export class AreaModule {}
