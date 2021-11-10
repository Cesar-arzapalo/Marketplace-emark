
export class ProductoModel {
    constructor(public nombre: String, public descripcion: String, public caracteristica: Array<Object>,
        public unidad: String, public precioUnidad: Number, public stock: Number, public valoracion: Number,
        public visitas: Number, public idCategoria: String, public idProveedor: String,public imagenes: Array<String>) {

    }
}