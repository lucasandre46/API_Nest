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
        const docRef = await this.collection.add(createMusicFDto);
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

    async findOne(id: number | string): Promise<MusicF> {
        const doc = await this.collection.doc(String(id)).get();

        if (!doc.exists) {
            throw new NotFoundException(`Musica com o ID #${id} não encontrado`);
        }

        return {
            id: doc.id,
            ...doc.data()
        } as MusicF;
    }

    async update(id: number | string, createMusicFDto: CreateMusicFDto): Promise<MusicF> {
        const docRef = this.collection.doc(String(id));
        const doc = await docRef.get();

        if (!doc.exists) {
            throw new NotFoundException(`Musica com o ID #${id} não encontrado`);
        }

        await docRef.update({ ...createMusicFDto }); // Cast required if types are strict, but here spread works for plain object

        return {
            id: String(id),
            ...createMusicFDto
        };
    }

    async remove(id: number | string): Promise<void> {
        const docRef = this.collection.doc(String(id));
        const doc = await docRef.get();

        if (!doc.exists) {
            throw new NotFoundException(`Musica com o ID #${id} não encontrado`);
        }

        await docRef.delete();
    }
}
