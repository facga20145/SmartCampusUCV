import { Injectable } from '@nestjs/common';
import { Recomendacion_iaFindAllService } from '../../../domain/services/queries/recomendacion_ia-find-all.service';
import { RecomendacionIaCreateResponseDto } from '../../dtos/recomendacion_ia-create-response.dto';

@Injectable()
export class RecomendacionIaFindAllUseCase {
  constructor(private readonly recomendacionIaFindAllService: Recomendacion_iaFindAllService) {}

  async execute(): Promise<RecomendacionIaCreateResponseDto[]> {
    const recomendaciones = await this.recomendacionIaFindAllService.execute();
    return recomendaciones.map(r => RecomendacionIaCreateResponseDto.fromEntity(r));
  }
}