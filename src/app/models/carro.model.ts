import { ProductoSolicitado } from './pedido/pedido.model';
export class Carro{
    constructor(public productoSolicitado: ProductoSolicitado, public idProductoCarro:number){
        
    }
}
