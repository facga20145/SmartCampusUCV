import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Patch } from '@nestjs/common';
import { UsuarioCreateUseCase } from '../../application/use-cases/commands/usuario-create.use-case';
import { UsuarioDeleteUseCase } from '../../application/use-cases/commands/usuario-delete.use-case';
import { UsuarioFindAllUseCase } from '../../application/use-cases/queries/usuario-find-all.use-case';
import { UsuarioFindByEmailUseCase } from '../../application/use-cases/queries/usuario-find-by-email.use-case';
import { UsuarioFindOneUseCase } from '../../application/use-cases/queries/usuario-find-one.use-case';
import { UsuarioUpdateUseCase } from '../../application/use-cases/commands/usuario-update.use-case';
import { UsuarioCreateRequestDto } from '../../application/dtos/usuario-create-request.dto';
import { UsuarioCreateResponseDto } from '../../application/dtos/usuario-create-response.dto';
import { UsuarioUpdateRequestDto } from '../../application/dtos/usuario-update-request.dto';
import { UsuarioUpdateResponseDto } from '../../application/dtos/usuario-update-response.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiDoc } from '../../../../common/decorators/api-doc.decorator';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly createUsuarioUseCase: UsuarioCreateUseCase,
    private readonly updateUsuarioUseCase: UsuarioUpdateUseCase,
    private readonly deleteUsuarioUseCase: UsuarioDeleteUseCase,
    private readonly findAllUsuariosUseCase: UsuarioFindAllUseCase,
    private readonly findUsuarioByIdUseCase: UsuarioFindOneUseCase,
    private readonly findUsuarioByEmailUseCase: UsuarioFindByEmailUseCase,
  ) { }

  @Post()
  @ApiDoc({
    summary: 'Registrar un nuevo usuario',
    ok: { status: 201, description: 'Usuario creado exitosamente', type: UsuarioCreateResponseDto },
  })
  async create(@Body() dto: UsuarioCreateRequestDto): Promise<UsuarioCreateResponseDto> {
    return this.createUsuarioUseCase.execute(dto);
  }

  @Get()
  @ApiDoc({
    summary: 'Listar todos los usuarios',
    ok: { status: 200, description: 'Lista de usuarios', type: [UsuarioCreateResponseDto] },
  })
  async findAll(): Promise<UsuarioCreateResponseDto[]> {
    return this.findAllUsuariosUseCase.execute();
  }

  @Get(':id')
  @ApiDoc({
    summary: 'Obtener usuario por ID',
    ok: { status: 200, description: 'Usuario encontrado', type: UsuarioCreateResponseDto },
    notFound: true,
  })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<UsuarioCreateResponseDto> {
    return this.findUsuarioByIdUseCase.execute(id);
  }

  @Get('email/:email')
  @ApiDoc({
    summary: 'Obtener usuario por email',
    ok: { status: 200, description: 'Usuario encontrado', type: UsuarioCreateResponseDto },
    notFound: true,
  })
  async findByEmail(@Param('email') email: string): Promise<UsuarioCreateResponseDto> {
    return this.findUsuarioByEmailUseCase.execute(email);
  }

  @Patch(':id')
  @ApiDoc({
    summary: 'Actualizar usuario',
    ok: { status: 200, description: 'Usuario actualizado', type: UsuarioUpdateResponseDto },
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UsuarioUpdateRequestDto): Promise<UsuarioUpdateResponseDto> {
    return this.updateUsuarioUseCase.execute({ id, ...dto } as any);
  }

  @Delete(':id')
  @ApiDoc({
    summary: 'Eliminar usuario',
    ok: { status: 200, description: 'Usuario eliminado' },
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteUsuarioUseCase.execute(id);
  }
}