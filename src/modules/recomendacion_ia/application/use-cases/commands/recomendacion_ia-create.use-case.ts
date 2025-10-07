import { Injectable } from '@nestjs/common';
import { RecomendacionIaCreateRequestDto } from '../../dtos/recomendacion_ia-create-request.dto';
import { RecomendacionIaCreateResponseDto } from '../../dtos/recomendacion_ia-create-response.dto';
import { Recomendacion_iaCreateService } from '../../../domain/services/commands/recomendacion_ia-create.service';

@Injectable()
export class RecomendacionIaCreateUseCase {
  constructor(private readonly recomendacionIaCreateService: Recomendacion_iaCreateService) {}

  async execute(dto: RecomendacionIaCreateRequestDto): Promise<RecomendacionIaCreateResponseDto> {
    const recomendacion = await this.recomendacionIaCreateService.execute(dto);
    return RecomendacionIaCreateResponseDto.fromEntity(recomendacion);
  }
}