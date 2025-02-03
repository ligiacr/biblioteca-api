import { IsInt, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CriaLivroDto {
  @IsInt()
  id!: number;
  @IsNotEmpty({ message: 'O titulo não pode ser vazio' })
  titulo!: string;
  @IsNotEmpty({ message: 'O autor não pode ser vazio' })
  autor!: string;
  @IsInt({ message: 'O ano de publicação deve ser um número' })
  anoPublicacao!: number;
  @IsBoolean()
  disponivel!: boolean;
  @IsOptional()
  idUsuario?: number;
}
