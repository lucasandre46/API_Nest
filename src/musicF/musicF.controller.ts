import { Controller, Get, Post, Delete, Put, Body, Param, ParseIntPipe, Header, StreamableFile, NotFoundException, UseGuards } from '@nestjs/common';
import { MusicFService } from './musicF.service';
import { CreateMusicFDto } from './DTO/create_musicF_dto';
// Assuming we want to keep the same AuthGuard logic, but if not we can remove it. keeping it as requested "same system"
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';

@UseGuards(JwtAuthGuard)
@Controller('musicF')
export class MusicFController {
    constructor(private readonly musicFService: MusicFService) { }


    @Get()
    findAll() {
        return this.musicFService.findAll();
    }

    @Get('audio/:id')
    @Header('Content-Type', 'audio/mpeg')
    @Header('Content-Disposition', 'inline')
    async proxyAudio(@Param('id') id: string): Promise<StreamableFile> {
        // Changed id to string as Firebase IDs are usually strings
        try {
            // Obtém o ID do arquivo do serviço
            const music = await this.musicFService.findOne(id);
            if (!music || !music.audio) {
                throw new NotFoundException('Áudio não encontrado no serviço');
            }
            // Monta a URL de download do Drive - MANTENDO LOGICA ORIGINAL por enquanto
            // Se for mudar para Storage do Firebase, isso mudará depois.
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
    findOne(@Param('id') id: string) {
        // Firebase uses string IDs usually, removing ParseIntPipe for flexibility for now or keeping it if we stick to Int IDs initially but logic suggests string for Firebase
        return this.musicFService.findOne(id);
    }

    @Post()
    create(@Body() createMusicFDto: CreateMusicFDto) {
        return this.musicFService.create(createMusicFDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.musicFService.remove(id);
    }

    @Put(':id')
    update(
        @Body() bodydata: CreateMusicFDto,
        @Param('id') id: string) {
        return this.musicFService.update(id, bodydata);
    }

}
