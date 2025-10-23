import {IsNoEmpty, IsString } from 'class-validator'

export class CreateMusicDto {
    @IsString()
    @IsNoEmpty()

}