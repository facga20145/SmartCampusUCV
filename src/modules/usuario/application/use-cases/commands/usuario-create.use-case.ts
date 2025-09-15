import { Injectable } from '@nestjs/common';
import { UsuarioCreateRequestDto } from '../../dtos/usuario-create-request.dto';
import { UsuarioCreateResponseDto } from '../../dtos/usuario-create-response.dto';
import { UsuarioCreateService } from '../../../domain/services/commands/usuario-create.service';

@Injectable()
export class UsuarioCreateUseCase {
  constructor(private readonly usuarioCreateService: UsuarioCreateService) {}

  async execute(dto: UsuarioCreateRequestDto): Promise<UsuarioCreateResponseDto> {
    const usuario = await this.usuarioCreateService.execute(dto);
    return UsuarioCreateResponseDto.fromEntity(usuario);
  }
}