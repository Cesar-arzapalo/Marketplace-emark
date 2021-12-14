export class UsuarioComentario{
    constructor(public nombre: String, public foto: String){}
}

export class Comentario{
    constructor(public id: string, public usuario: UsuarioComentario,
                public fecha: Date, public respuestas: Array<Comentario>,
                public descripcion?: string, public imagen?: string){}
}