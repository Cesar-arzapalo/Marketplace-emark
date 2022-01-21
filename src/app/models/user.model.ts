interface Tarjeta {
    numero: number;
    fecha_vencimiento: Date;
    ccv: number;
}
interface Direccion {
    direccion: string,
    distrito: string;
    codigo_postal:string;
}
export interface  Usuario{
    nombres: string;
    apellidos: string;
    dni: number;
    celular: number;
    direccion: Direccion;
    tarjeta: Tarjeta;
    foto: string;
}