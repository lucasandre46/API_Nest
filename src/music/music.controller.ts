import { Controller, Get, Post, Delete, Put, Body, Param, ParseIntPipe, Header, StreamableFile, NotFoundException, UseGuards } from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './DTO/create_music_dto';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';

@UseGuards(JwtAuthGuard)
@Controller('music')
export class MusicController {
    constructor(private readonly musicService: MusicService) { }


    @Get()
    findAll() {
        return this.musicService.findAll();
    }

    @Get('audio/:id')
    @Header('Content-Type', 'audio/mpeg')
    @Header('Content-Disposition', 'inline')
    async proxyAudio(@Param('id', ParseIntPipe) id: number): Promise<StreamableFile> {
        try {
            // Obtém o ID do arquivo do serviço
            const music = await this.musicService.findOne(id);
            if (!music || !music.audio) {
                throw new NotFoundException('Áudio não encontrado no serviço');
            }
            // Monta a URL de download do Drive
            const fileUrl = `https://drive.google.com/uc?export=download&id=${music.audio}`;
            // Faz o fetch do arquivo
            const response = await fetch(fileUrl);
            if (!response.ok) {
                throw new NotFoundException('Erro ao baixar áudio do Drive');
            }
            // Converte para Buffer e retorna como StreamableFile
            const buffer = Buffer.from(await response.arrayBuffer());
            return new StreamableFile(buffer);
        } catch (err) {
            console.error(err);
            throw new NotFoundException('Erro ao processar áudio');
        }
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.musicService.findOne(id);
    }

    @Post()
    create(@Body() createMusicDto: CreateMusicDto) {
        return this.musicService.create(createMusicDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.musicService.remove(id);
    }

    @Put(':id')
    update(
        @Body() bodydata: CreateMusicDto,
        @Param('id', ParseIntPipe) id: number) {
        return this.musicService.update(id, bodydata);
    }



}