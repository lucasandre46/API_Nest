import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicFDto } from './DTO/create_musicF_dto';
import { FirebaseService } from '../firebase/firebase.service';

// Placeholder interface for the Music entity since we don't have Prisma types
export interface MusicF {
    id: number | string;
    title: string;
    description: string;
    imageUrl: string;
    audio: string;
}

@Injectable()
export class MusicFService {

    constructor(private readonly firebaseService: FirebaseService) { }

    private get collection() {
        return this.firebaseService.firestore.collection('music');
    }

    async create(createMusicFDto: CreateMusicFDto): Promise<MusicF> {
        const docRef = await this.collection.add({ ...createMusicFDto });
        return {
            id: docRef.id,
            ...createMusicFDto
        };
    }

    async findAll(): Promise<MusicF[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as MusicF));
    }

    async findOne(id: string): Promise<MusicF> {
        const doc = await this.collection.doc(String(id)).get();

        if (!doc.exists) {
            throw new NotFoundException(`Musica com o ID #${id} não encontrado`);
        }

        return {
            id: doc.id,
            ...doc.data()
        } as MusicF;
    }

    async update(id: string, createMusicFDto: CreateMusicFDto): Promise<MusicF> {
        const docRef = this.collection.doc(String(id));

        const dataToUpdate = {
            title: createMusicFDto.title,
            description: createMusicFDto.description,
            imageUrl: createMusicFDto.imageUrl,
            audio: createMusicFDto.audio,
        };

        await docRef.update(dataToUpdate);

        return {
            id: String(id),
            ...dataToUpdate
        };
    }
    async remove(id: string): Promise<void> {
        const docRef = this.collection.doc(String(id));
        const doc = await docRef.get();

        if (!doc.exists) {
            throw new NotFoundException(`Musica com o ID #${id} não encontrado`);
        }

        await docRef.delete();
    }
}
