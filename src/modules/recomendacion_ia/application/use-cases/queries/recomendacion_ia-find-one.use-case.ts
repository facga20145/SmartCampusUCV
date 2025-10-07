import { Injectable, NotFoundException } from '@nestjs/common';
import { Recomendacion_iaFindOneService } from '../../../domain/services/queries/recomendacion_ia-find-one.service';
import { RecomendacionIaCreateResponseDto } from '../../dtos/recomendacion_ia-create-response.dto';

@Injectable()
export class RecomendacionIaFindOneUseCase {
  constructor(private readonly recomendacionIaFindOneService: Recomendacion_iaFindOneService) {}

  async execute(id: number): Promise<RecomendacionIaCreateResponseDto> {
    const recomendacion = await this.recomendacionIaFindOneService.execute(id);
    if (!recomendacion) throw new NotFoundException('Recomendación IA no encontrada');
    return RecomendacionIaCreateResponseDto.fromEntity(recomendacion);
  }
}