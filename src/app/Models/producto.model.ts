import { Comentario } from './comentario.model';

export class Producto {
    constructor(public _id: string, public nombre: string, public descripcion: string, public caracteristicas: Object,
        public unidad: string, public precioUnidad: number, public stock: number, public valoracion: number,
        public visitas: number, public idCategoria: string, public idProveedor: string,public imagenes: Array<string>) {

    }
}