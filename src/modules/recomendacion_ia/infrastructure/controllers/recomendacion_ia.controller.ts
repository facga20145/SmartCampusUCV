import { Body, Controller, Get, Param, ParseIntPipe, Post, Patch } from '@nestjs/common';
import { RecomendacionIaCreateUseCase } from '../../application/use-cases/commands/recomendacion_ia-create.use-case';
import { RecomendacionIaUpdateUseCase } from '../../application/use-cases/commands/recomendacion_ia-update.use-case';
import { RecomendacionIaFindAllUseCase } from '../../application/use-cases/queries/recomendacion_ia-find-all.use-case';
import { RecomendacionIaFindOneUseCase } from '../../application/use-cases/queries/recomendacion_ia-find-one.use-case';
import { RecomendacionIaCreateRequestDto } from '../../application/dtos/recomendacion_ia-create-request.dto';
import { RecomendacionIaCreateResponseDto } from '../../application/dtos/recomendacion_ia-create-response.dto';
import { RecomendacionIaUpdateRequestDto } from '../../application/dtos/recomendacion_ia-update-request.dto';
import { RecomendacionIaUpdateResponseDto } from '../../application/dtos/recomendacion_ia-update-response.dto';

@Controller('recomendaciones-ia')
export class Recomendacion_iaController {
  constructor(
    private readonly createRecomendacionIaUseCase: RecomendacionIaCreateUseCase,
    private readonly updateRecomendacionIaUseCase: RecomendacionIaUpdateUseCase,
    private readonly findAllRecomendacionIaUseCase: RecomendacionIaFindAllUseCase,
    private readonly findOneRecomendacionIaUseCase: RecomendacionIaFindOneUseCase,
  ) {}

  @Post()
  async create(@Body() dto: RecomendacionIaCreateRequestDto): Promise<RecomendacionIaCreateResponseDto> {
    return this.createRecomendacionIaUseCase.execute(dto);
  }

  @Get()
  async findAll(): Promise<RecomendacionIaCreateResponseDto[]> {
    return this.findAllRecomendacionIaUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<RecomendacionIaCreateResponseDto> {
    return this.findOneRecomendacionIaUseCase.execute(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: RecomendacionIaUpdateRequestDto): Promise<RecomendacionIaUpdateResponseDto> {
    return this.updateRecomendacionIaUseCase.execute({ id, ...dto });
  }
}