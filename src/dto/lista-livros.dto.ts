import { Collection } from '@mikro-orm/core';
import { IsNotEmpty, IsInt, IsBoolean, IsOptional } from 'class-validator';
import { Usuario } from '../entities/usuario.entity';

export class ListaLivrosDto {
  @IsNotEmpty({ message: 'O titulo não pode ser vazio' })
  @IsOptional()
  titulo!: string;
  @IsNotEmpty({ message: 'O autor não pode ser vazio' })
  @IsOptional()
  autor!: string;
  @IsInt({ message: 'O ano de publicação deve ser um número' })
  @IsOptional()
  anoPublicacao!: number;
  @IsBoolean()
  @IsOptional()
  disponivel!: boolean;
  @IsInt({ message: 'O estoque deve ser um número' })
  @IsOptional()
  estoque!: number;
  @IsOptional()
  usuarios = new Collection<Usuario>(this);
}
