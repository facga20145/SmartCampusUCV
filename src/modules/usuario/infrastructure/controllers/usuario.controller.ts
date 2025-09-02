import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUsuarioUseCase } from '../../application/use-cases/create-usuario.use-case';
import { DeleteUsuarioUseCase } from '../../application/use-cases/delete-usuario.use-case';
import { FindAllUsuariosUseCase } from '../../application/use-cases/find-all-usuarios.use-case';
import { FindUsuarioByEmailUseCase } from '../../application/use-cases/find-usuario-by-email.use-case';
import { FindUsuarioByIdUseCase } from '../../application/use-cases/find-usuario-by-id.use-case';
import { UpdateUsuarioUseCase } from '../../application/use-cases/update-usuario.use-case';
import { UsuarioCreateRequestDto } from '../../application/dtos/usuario-create-request.dto';
import { UsuarioCreateResponseDto } from '../../application/dtos/usuario-create-response.dto';
import { UsuarioUpdateRequestDto } from '../../application/dtos/usuario-update-request.dto';
import { UsuarioUpdateResponseDto } from '../../application/dtos/usuario-update-response.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly createUsuarioUseCase: CreateUsuarioUseCase,
    private readonly updateUsuarioUseCase: UpdateUsuarioUseCase,
    private readonly deleteUsuarioUseCase: DeleteUsuarioUseCase,
    private readonly findAllUsuariosUseCase: FindAllUsuariosUseCase,
    private readonly findUsuarioByIdUseCase: FindUsuarioByIdUseCase,
    private readonly findUsuarioByEmailUseCase: FindUsuarioByEmailUseCase,
  ) {}

  @Post()
  async create(@Body() dto: UsuarioCreateRequestDto): Promise<UsuarioCreateResponseDto> {
    return this.createUsuarioUseCase.execute(dto);
  }

  @Get()
  async findAll(): Promise<UsuarioCreateResponseDto[]> {
    return this.findAllUsuariosUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<UsuarioCreateResponseDto> {
    return this.findUsuarioByIdUseCase.execute(id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<UsuarioCreateResponseDto> {
    return this.findUsuarioByEmailUseCase.execute(email);
  }

  @Put()
  async update(@Body() dto: UsuarioUpdateRequestDto): Promise<UsuarioUpdateResponseDto> {
    return this.updateUsuarioUseCase.execute(dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteUsuarioUseCase.execute(id);
  }
}