class UsuarioComentario{
    constructor(public nombre: String, public foto: String){}
}

export class Comentario{
    constructor(public usuario: UsuarioComentario, public fecha: Date,
                public valoracion: Number, public respuestas: Array<Comentario>,
                public descripcion?: string, public imagen?: string){}
}