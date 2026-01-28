import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateCardDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  artist?: string;

  @IsOptional()
  @IsUrl()
  img?: string;

  @IsOptional()
  @IsNumber()
  valor?: number;

  @IsOptional()
  @IsNumber()
  quantidade?: number;

  @IsOptional()
  @IsString()
  data?: string;
}