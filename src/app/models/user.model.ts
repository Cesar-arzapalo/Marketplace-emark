class Tarjeta {
    constructor(public numero: number, public fecha_vencimiento: number, public ccv: number){}
}
class Direccion {
    constructor( public direccion: string, public distrito: string, public codigo_postal:number){}
}
export class Usuario{
    constructor( public nombre: string, public apellidos: string, public correo: string,
                 public direcciones: Array<Direccion>, public tarjetas: Array<Tarjeta>){}
}