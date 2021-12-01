
export class Producto {
    constructor(public id: string, public nombre: string, public descripcion: string, public caracteristica: Object,
        public unidad: string, public precioUnidad: number, public stock: number, public valoracion: number,
        public visitas: number, public idCategoria: string, public idProveedor: string,public imagenes: Array<string>) {

    }
}