import { Injectable, Inject } from '@nestjs/common';
import { ReconocimientoRepositoryPort } from '../../../infrastructure/adapters/ports/reconocimiento-repository.port';
import { IReconocimientoCreate } from '../../interfaces/reconocimiento-create.interface';
import { ReconocimientoEntity } from '../../entities/reconocimiento.entity';
  
@Injectable()
export class ReconocimientoCreateService {
  constructor(
    @Inject(ReconocimientoRepositoryPort)
    private readonly repo: ReconocimientoRepositoryPort,
  ) {}

  async execute(data: IReconocimientoCreate): Promise<ReconocimientoEntity> {
    return this.repo.create(data);
  }
}