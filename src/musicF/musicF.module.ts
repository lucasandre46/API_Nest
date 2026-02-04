import { Module } from '@nestjs/common';
import { MusicFService } from './musicF.service';
import { MusicFController } from './musicF.controller';

@Module({
    controllers: [MusicFController],
    providers: [MusicFService],
})
export class MusicFModule { }
