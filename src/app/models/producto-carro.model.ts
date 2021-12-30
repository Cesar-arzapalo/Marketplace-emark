import { ProductoSolicitado } from './pedido/pedido.model';
export class ProductoCarro{
    constructor(public productoSolicitado: ProductoSolicitado, public idProductoCarro:number){
        
    }
}