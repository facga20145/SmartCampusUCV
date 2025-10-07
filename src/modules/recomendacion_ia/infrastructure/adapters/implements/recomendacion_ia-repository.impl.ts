import { Injectable, Inject } from '@nestjs/common';
import { RecomendacionIaRepositoryPort } from '../ports/recomendacion_ia-repository.port';
import { IRecomendacion_iaCreate } from '../../../domain/interfaces/recomendacion_ia-create.interface';
import { IRecomendacion_iaUpdate } from '../../../domain/interfaces/recomendacion_ia-update.interface';
import { Recomendacion_iaEntity } from '../../../domain/entities/recomendacion_ia.entity';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class Recomendacion_iaRepositoryImpl implements RecomendacionIaRepositoryPort {
  constructor(
    @Inject(PrismaClient) private readonly prisma: PrismaClient,
  ) {}

  private toEntity(recomendacion: any): Recomendacion_iaEntity {
    return new Recomendacion_iaEntity(
      recomendacion.id,
      recomendacion.usuarioId,
      recomendacion.actividadId,
      recomendacion.fecha,
      recomendacion.tipo,
      recomendacion.aceptada,
    );
  }

  async create(data: IRecomendacion_iaCreate): Promise<Recomendacion_iaEntity> {
    const recomendacion = await this.prisma.recomendacionIA.create({ data });
    return this.toEntity(recomendacion);
  }

  async update(data: IRecomendacion_iaUpdate): Promise<Recomendacion_iaEntity> {
    const recomendacion = await this.prisma.recomendacionIA.update({
      where: { id: data.id },
      data: {
        usuarioId: data.usuarioId,
        actividadId: data.actividadId,
        tipo: data.tipo,
        aceptada: data.aceptada,
      },
    });
    return this.toEntity(recomendacion);
  }

  async findAll(): Promise<Recomendacion_iaEntity[]> {
    const recomendaciones = await this.prisma.recomendacionIA.findMany();
    return recomendaciones.map((r) => this.toEntity(r));
  }

  async findById(id: number): Promise<Recomendacion_iaEntity | null> {
    const recomendacion = await this.prisma.recomendacionIA.findUnique({ where: { id } });
    if (!recomendacion) return null;
    return this.toEntity(recomendacion);
  }
}