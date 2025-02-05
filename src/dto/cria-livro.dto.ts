import { Collection } from '@mikro-orm/core';
import { IsInt, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { Usuario } from 'src/entities/usuario.entity';

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
  @IsInt({ message: 'O estoque deve ser um número' })
  estoque!: number;
  @IsOptional()
  usuarios = new Collection<Usuario>(this);
}
