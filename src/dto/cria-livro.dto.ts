import { IsInt, IsString, IsBoolean } from 'class-validator';

export class CriaLivroDto {
  @IsInt()
  id!: number;
  @IsString()
  titulo!: string;
  @IsString()
  autor!: string;
  @IsInt()
  anoPublicacao!: number;
  @IsBoolean()
  disponivel!: boolean;
}
