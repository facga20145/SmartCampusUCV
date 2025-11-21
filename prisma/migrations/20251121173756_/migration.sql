-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('administrador', 'organizador', 'estudiante');

-- CreateEnum
CREATE TYPE "EstadoInscripcion" AS ENUM ('pendiente', 'confirmada', 'cancelada');

-- CreateEnum
CREATE TYPE "EstadoNotificacion" AS ENUM ('pendiente', 'leida');

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido" VARCHAR(100) NOT NULL,
    "correo_institucional" VARCHAR(150) NOT NULL,
    "contrasena" VARCHAR(255) NOT NULL,
    "rol" "RolUsuario" NOT NULL,
    "intereses" TEXT,
    "hobbies" TEXT,
    "foto" TEXT,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "actividad" (
    "id_actividad" SERIAL NOT NULL,
    "titulo" VARCHAR(150) NOT NULL,
    "descripcion" TEXT,
    "categoria" VARCHAR(50) NOT NULL,
    "fecha" DATE NOT NULL,
    "hora" TIME NOT NULL,
    "lugar" VARCHAR(150) NOT NULL,
    "max_participantes" INTEGER,
    "nivel_sostenibilidad" INTEGER,
    "organizador_id" INTEGER NOT NULL,

    CONSTRAINT "actividad_pkey" PRIMARY KEY ("id_actividad")
);

-- CreateTable
CREATE TABLE "inscripcion" (
    "id_inscripcion" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "actividad_id" INTEGER NOT NULL,
    "fecha_inscripcion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "EstadoInscripcion" NOT NULL DEFAULT 'pendiente',

    CONSTRAINT "inscripcion_pkey" PRIMARY KEY ("id_inscripcion")
);

-- CreateTable
CREATE TABLE "participacion" (
    "id_participacion" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "actividad_id" INTEGER NOT NULL,
    "asistencia" BOOLEAN NOT NULL DEFAULT false,
    "feedback" TEXT,
    "puntos" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "participacion_pkey" PRIMARY KEY ("id_participacion")
);

-- CreateTable
CREATE TABLE "reconocimiento" (
    "id_reconocimiento" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tipo" VARCHAR(50),
    "descripcion" TEXT,
    "fecha" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reconocimiento_pkey" PRIMARY KEY ("id_reconocimiento")
);

-- CreateTable
CREATE TABLE "encuesta" (
    "id_encuesta" SERIAL NOT NULL,
    "actividad_id" INTEGER NOT NULL,
    "pregunta" TEXT NOT NULL,
    "tipo" VARCHAR(50),

    CONSTRAINT "encuesta_pkey" PRIMARY KEY ("id_encuesta")
);

-- CreateTable
CREATE TABLE "respuesta_encuesta" (
    "id_respuesta" SERIAL NOT NULL,
    "encuesta_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "respuesta" TEXT,

    CONSTRAINT "respuesta_encuesta_pkey" PRIMARY KEY ("id_respuesta")
);

-- CreateTable
CREATE TABLE "notificacion" (
    "id_notificacion" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "mensaje" TEXT NOT NULL,
    "fecha_envio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "EstadoNotificacion" NOT NULL DEFAULT 'pendiente',

    CONSTRAINT "notificacion_pkey" PRIMARY KEY ("id_notificacion")
);

-- CreateTable
CREATE TABLE "interaccion_chatbot" (
    "id_interaccion" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "mensaje_usuario" TEXT NOT NULL,
    "respuesta_bot" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "interaccion_chatbot_pkey" PRIMARY KEY ("id_interaccion")
);

-- CreateTable
CREATE TABLE "preferencia_usuario" (
    "id_preferencia" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "categoria" VARCHAR(50),
    "nivel_interes" INTEGER,

    CONSTRAINT "preferencia_usuario_pkey" PRIMARY KEY ("id_preferencia")
);

-- CreateTable
CREATE TABLE "recomendacion_ia" (
    "id_recomendacion" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "actividad_id" INTEGER,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" VARCHAR(50),
    "aceptada" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "recomendacion_ia_pkey" PRIMARY KEY ("id_recomendacion")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_correo_institucional_key" ON "usuario"("correo_institucional");

-- CreateIndex
CREATE UNIQUE INDEX "inscripcion_usuario_id_actividad_id_key" ON "inscripcion"("usuario_id", "actividad_id");

-- AddForeignKey
ALTER TABLE "actividad" ADD CONSTRAINT "actividad_organizador_id_fkey" FOREIGN KEY ("organizador_id") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscripcion" ADD CONSTRAINT "inscripcion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscripcion" ADD CONSTRAINT "inscripcion_actividad_id_fkey" FOREIGN KEY ("actividad_id") REFERENCES "actividad"("id_actividad") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participacion" ADD CONSTRAINT "participacion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participacion" ADD CONSTRAINT "participacion_actividad_id_fkey" FOREIGN KEY ("actividad_id") REFERENCES "actividad"("id_actividad") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reconocimiento" ADD CONSTRAINT "reconocimiento_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encuesta" ADD CONSTRAINT "encuesta_actividad_id_fkey" FOREIGN KEY ("actividad_id") REFERENCES "actividad"("id_actividad") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respuesta_encuesta" ADD CONSTRAINT "respuesta_encuesta_encuesta_id_fkey" FOREIGN KEY ("encuesta_id") REFERENCES "encuesta"("id_encuesta") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respuesta_encuesta" ADD CONSTRAINT "respuesta_encuesta_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificacion" ADD CONSTRAINT "notificacion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interaccion_chatbot" ADD CONSTRAINT "interaccion_chatbot_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preferencia_usuario" ADD CONSTRAINT "preferencia_usuario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recomendacion_ia" ADD CONSTRAINT "recomendacion_ia_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recomendacion_ia" ADD CONSTRAINT "recomendacion_ia_actividad_id_fkey" FOREIGN KEY ("actividad_id") REFERENCES "actividad"("id_actividad") ON DELETE CASCADE ON UPDATE CASCADE;
