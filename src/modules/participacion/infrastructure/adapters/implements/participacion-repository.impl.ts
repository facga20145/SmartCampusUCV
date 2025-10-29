import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ParticipacionRepositoryPort } from '../ports/participacion-repository.port';
import { IParticipacionCreate } from '../../../domain/interfaces/participacion-create.interface';
import { IParticipacionUpdate } from '../../../domain/interfaces/participacion-update.interface';
import { ParticipacionEntity } from '../../../domain/entities/participacion.entity';
  
@Injectable()
export class ParticipacionRepositoryImpl implements ParticipacionRepositoryPort {
  constructor(
    @Inject(PrismaClient) private readonly prisma: PrismaClient,
  ) {}

  private toEntity(p: any): ParticipacionEntity {
    return new ParticipacionEntity(
      p.id,
      p.usuarioId,
      p.actividadId,
      p.asistencia,
      p.feedback,
      p.puntos,
    );
  }

  async create(data: IParticipacionCreate): Promise<ParticipacionEntity> {
    const created = await this.prisma.participacion.create({
      data: {
        usuarioId: data.usuarioId,
        actividadId: data.actividadId,
        asistencia: data.asistencia ?? false,
        feedback: data.feedback ?? null,
        puntos: data.puntos ?? 0,
      },
    });
    return this.toEntity(created);
  }

  async update(data: IParticipacionUpdate): Promise<ParticipacionEntity> {
    const updated = await this.prisma.participacion.update({
      where: { id: data.id },
      data: {
        asistencia: data.asistencia,
        feedback: data.feedback,
        puntos: data.puntos,
      },
    });
    return this.toEntity(updated);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.participacion.delete({ where: { id } });
  }

  async findById(id: number): Promise<ParticipacionEntity | null> {
    const p = await this.prisma.participacion.findUnique({ where: { id } });
    return p ? this.toEntity(p) : null;
  }

  async findByActividad(actividadId: number): Promise<ParticipacionEntity[]> {
    const items = await this.prisma.participacion.findMany({ where: { actividadId } });
    return items.map((p) => this.toEntity(p));
  }

  async findByUsuario(usuarioId: number): Promise<ParticipacionEntity[]> {
    const items = await this.prisma.participacion.findMany({ where: { usuarioId } });
    return items.map((p) => this.toEntity(p));
  }

  async findByUsuarioAndActividad(usuarioId: number, actividadId: number): Promise<ParticipacionEntity | null> {
    const item = await this.prisma.participacion.findFirst({
      where: { usuarioId, actividadId },
    });
    return item ? this.toEntity(item) : null;
  }

  async aggregateRankingGlobal(limit = 10): Promise<Array<{ usuarioId: number; puntos: number; usuario?: any }>> {
    const result = await this.prisma.participacion.groupBy({
      by: ['usuarioId'],
      _sum: { puntos: true },
      orderBy: { _sum: { puntos: 'desc' } },
      take: limit,
    });
    
    // Obtener información de usuarios
    const usuarioIds = result.map(r => r.usuarioId);
    const usuarios = await this.prisma.usuario.findMany({
      where: { id: { in: usuarioIds } },
      select: { id: true, nombre: true, apellido: true, correoInstitucional: true, foto: true },
    });
    
    const usuarioMap = new Map(usuarios.map(u => [u.id, u]));
    
    return result.map((r) => ({
      usuarioId: r.usuarioId,
      puntos: r._sum.puntos ?? 0,
      usuario: usuarioMap.get(r.usuarioId),
    }));
  }

  async aggregateRankingByActividad(actividadId: number, limit = 10): Promise<Array<{ usuarioId: number; puntos: number; usuario?: any }>> {
    const result = await this.prisma.participacion.groupBy({
      by: ['usuarioId'],
      where: { actividadId },
      _sum: { puntos: true },
      orderBy: { _sum: { puntos: 'desc' } },
      take: limit,
    });
    
    // Obtener información de usuarios
    const usuarioIds = result.map(r => r.usuarioId);
    const usuarios = await this.prisma.usuario.findMany({
      where: { id: { in: usuarioIds } },
      select: { id: true, nombre: true, apellido: true, correoInstitucional: true, foto: true },
    });
    
    const usuarioMap = new Map(usuarios.map(u => [u.id, u]));
    
    return result.map((r) => ({
      usuarioId: r.usuarioId,
      puntos: r._sum.puntos ?? 0,
      usuario: usuarioMap.get(r.usuarioId),
    }));
  }
}