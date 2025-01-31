import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor() {
    super('Registro(s) não encontrado(s).', HttpStatus.NOT_FOUND);
  }
}
