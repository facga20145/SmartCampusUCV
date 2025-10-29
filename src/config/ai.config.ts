/**
 * Configuración del microservicio de IA
 * Usa variable de entorno AI_SERVICE_URL o valor por defecto
 */
export const AI_CONFIG = {
  /**
   * URL del microservicio de IA
   * En producción: debe ser una URL accesible (ej: https://smartcampus-ai.onrender.com)
   * En desarrollo local: http://127.0.0.1:8000
   */
  SERVICE_URL: process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000',
  
  /**
   * Timeout para las peticiones al microservicio (en milisegundos)
   */
  TIMEOUT: parseInt(process.env.AI_SERVICE_TIMEOUT || '30000', 10),
};

