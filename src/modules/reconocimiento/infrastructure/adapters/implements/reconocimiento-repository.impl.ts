import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ReconocimientoRepositoryPort } from '../ports/reconocimiento-repository.port';
import { IReconocimientoCreate } from '../../../domain/interfaces/reconocimiento-create.interface';
import { ReconocimientoEntity } from '../../../domain/entities/reconocimiento.entity';
  
@Injectable()
export class ReconocimientoRepositoryImpl implements ReconocimientoRepositoryPort {
  constructor(
    @Inject(PrismaClient) private readonly prisma: PrismaClient,
  ) {}

  private toEntity(r: any): ReconocimientoEntity {
    return new ReconocimientoEntity(r.id, r.usuarioId, r.tipo, r.descripcion, new Date(r.fecha));
  }

  async create(data: IReconocimientoCreate): Promise<ReconocimientoEntity> {
    const created = await this.prisma.reconocimiento.create({
      data: {
        usuarioId: data.usuarioId,
        tipo: data.tipo ?? null,
        descripcion: data.descripcion ?? null,
      },
    });
    return this.toEntity(created);
  }

  async findByUsuario(usuarioId: number): Promise<ReconocimientoEntity[]> {
    const items = await this.prisma.reconocimiento.findMany({ where: { usuarioId } });
    return items.map((r) => this.toEntity(r));
  }
}