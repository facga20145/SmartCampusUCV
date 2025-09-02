import { Injectable } from '@nestjs/common';
import { UsuarioFindAllService } from '../../domain/services/queries/usuario-find-all.service';
import { UsuarioCreateResponseDto } from '../dtos/usuario-create-response.dto';

@Injectable()
export class FindAllUsuariosUseCase {
  constructor(private readonly usuarioFindAllService: UsuarioFindAllService) {}

  async execute(): Promise<UsuarioCreateResponseDto[]> {
    const usuarios = await this.usuarioFindAllService.execute();
    return usuarios.map(usuario => UsuarioCreateResponseDto.fromEntity(usuario));
  }
}