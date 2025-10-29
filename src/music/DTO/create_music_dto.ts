import {IsNotEmpty, IsString } from 'class-validator'

export class CreateMusicDto {
    @IsString()
    @IsNotEmpty()
    title: string;          
    description: string;       
    imageUrl: string;       
    audioUrl: string;
}