import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ActividadRepositoryPort } from '../ports/actividad-repository.port';
import { IActividadCreate } from '../../../domain/interfaces/actividad-create.interface';
import { IActividadUpdate } from '../../../domain/interfaces/actividad-update.interface';
import { IActividadFilters } from '../../../domain/interfaces/actividad-filters.interface';
import { ActividadEntity } from '../../../domain/entities/actividad.entity';

@Injectable()
export class ActividadRepositoryImpl implements ActividadRepositoryPort {
  constructor(
    @Inject(PrismaClient) private readonly prisma: PrismaClient,
  ) {}

  private toEntity(a: any): ActividadEntity {
    return new ActividadEntity(
      a.id,
      a.titulo,
      a.descripcion,
      a.categoria,
      new Date(a.fecha),
      new Date(a.hora),
      a.lugar,
      a.maxParticipantes,
      a.nivelSostenibilidad,
      a.organizadorId,
    );
  }

  async create(data: IActividadCreate): Promise<ActividadEntity> {
    const creada = await this.prisma.actividad.create({
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion ?? null,
        categoria: data.categoria, // Ahora acepta cualquier categoría
        fecha: data.fecha,
        hora: data.hora,
        lugar: data.lugar,
        maxParticipantes: data.maxParticipantes ?? null,
        nivelSostenibilidad: data.nivelSostenibilidad ?? null,
        organizadorId: data.organizadorId,
      },
    });
    return this.toEntity(creada);
  }

  async findAll(filters?: IActividadFilters): Promise<ActividadEntity[]> {
    const where: any = {};
    if (filters?.categoria) where.categoria = filters.categoria;
    if (filters?.lugar) where.lugar = { contains: filters.lugar, mode: 'insensitive' };
    if (filters?.fechaDesde || filters?.fechaHasta) {
      where.fecha = {};
      if (filters.fechaDesde) where.fecha.gte = filters.fechaDesde;
      if (filters.fechaHasta) where.fecha.lte = filters.fechaHasta;
    }
    if (typeof filters?.nivelSostenibilidadMin === 'number') {
      where.nivelSostenibilidad = { gte: filters.nivelSostenibilidadMin };
    }

    const items = await this.prisma.actividad.findMany({ where });
    return items.map((a) => this.toEntity(a));
  }

  async findById(id: number): Promise<ActividadEntity | null> {
    const a = await this.prisma.actividad.findUnique({ where: { id } });
    return a ? this.toEntity(a) : null;
  }

  async update(data: IActividadUpdate): Promise<ActividadEntity> {
    const updateData: any = {};
    
    if (data.titulo !== undefined) updateData.titulo = data.titulo;
    if (data.descripcion !== undefined) updateData.descripcion = data.descripcion;
    if (data.categoria !== undefined) updateData.categoria = data.categoria; // Acepta cualquier categoría
    if (data.fecha !== undefined) updateData.fecha = data.fecha;
    if (data.hora !== undefined) updateData.hora = data.hora;
    if (data.lugar !== undefined) updateData.lugar = data.lugar;
    if (data.maxParticipantes !== undefined) updateData.maxParticipantes = data.maxParticipantes;
    if (data.nivelSostenibilidad !== undefined) updateData.nivelSostenibilidad = data.nivelSostenibilidad;

    const actualizada = await this.prisma.actividad.update({
      where: { id: data.id },
      data: updateData,
    });
    return this.toEntity(actualizada);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.actividad.delete({ where: { id } });
  }
}