import { Controller, Get, Post, Delete, Put, Body, Param, ParseIntPipe, Header, StreamableFile, NotFoundException } from '@nestjs/common';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
    constructor(private readonly musicService: MusicService) { }


    @Get()
    pegaBanco() {
        return this.musicService.pegaBD();
    }

    @Get('audio/:id')
    @Header('Content-Type', 'audio/mpeg')
    @Header('Content-Disposition', 'inline')
    async proxyAudio(@Param('id', ParseIntPipe) id: number): Promise<StreamableFile> {
        try {
            // Obtém o ID do arquivo do serviço
            const idAudio = this.musicService.pegaMusica(id);
            if (!idAudio) {
                throw new NotFoundException('Áudio não encontrado no serviço');
            }
            // Monta a URL de download do Drive
            const fileUrl = `https://drive.google.com/uc?export=download&id=${idAudio}`;
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
    pegaMusica(@Param('id', ParseIntPipe) id: number) {
        return this.musicService.pegaMusica(id)
    }

    @Post()
    createMusic(@Body() bodyData: any) {
        return this.musicService.createMusic(bodyData)
    }

    @Delete(':id')
    deletaMusic(@Param('id', ParseIntPipe) id: number) {
        return this.musicService.deletaMusic(id);
    }

    @Put(':id')
    atualizaMusic(
        @Body() bodydata: any,
        @Param('id', ParseIntPipe) id: number) {
        return this.musicService.atualizaMusic(id, bodydata);
    }



}