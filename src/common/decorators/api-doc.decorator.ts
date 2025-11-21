import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

export interface ApiDocOptions {
    summary: string;
    auth?: boolean;
    ok?: { status: number; description: string; type?: any };
    badRequest?: boolean | { description: string };
    notFound?: boolean | { description: string };
    unauthorized?: boolean;
}

export function ApiDoc(options: ApiDocOptions) {
    const decorators = [ApiOperation({ summary: options.summary })];

    if (options.auth) {
        decorators.push(ApiBearerAuth());
        decorators.push(ApiResponse({ status: 401, description: 'No autorizado' }));
    }

    if (options.ok) {
        decorators.push(
            ApiResponse({
                status: options.ok.status,
                description: options.ok.description,
                type: options.ok.type,
            }),
        );
    }

    if (options.badRequest !== false) {
        const description = typeof options.badRequest === 'object'
            ? options.badRequest.description
            : 'Solicitud incorrecta';
        decorators.push(ApiResponse({ status: 400, description }));
    }

    if (options.notFound) {
        const description = typeof options.notFound === 'object'
            ? options.notFound.description
            : 'Recurso no encontrado';
        decorators.push(ApiResponse({ status: 404, description }));
    }

    // Always add 500
    decorators.push(ApiResponse({ status: 500, description: 'Error interno del servidor' }));

    return applyDecorators(...decorators);
}
