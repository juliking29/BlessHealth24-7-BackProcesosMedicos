export interface ServicioPorEspecialidad {
    idServicio: number;
    nombreServicio: string;
    descripcionServicio?: string;
    precio: number;
    iva: number;
    precioTotal: number;
    duracionEstimada?: number;
    requiereAutorizacion: string;
}

export interface ServicioCompleto extends ServicioPorEspecialidad {
    nombreEspecialidad: string;
}

export interface ServicioTexto {
    texto: string;
}