import { Producto } from '../producto.model';
import { State } from './state.model';
import { Usuario } from '../user.model';
export class ProductoSolicitado{
    constructor(public producto:Producto, public cantidad:number){

    }
}
export class ProductoSolicitadoDB{
    constructor(public productoReferencia:string, public cantidad:number){

    }
}

export interface  ProductoPagado{
  nombre: string;
  descripcion: string;
  caracteristicas: Object;
  imagenes: Array<string>;
  cantidad: number;
  precioUnidad: number; 
}

export class Comprobante{
    
  constructor(public fechaEmision:Date, public productos:ProductoPagado[], public usuario?:Usuario, ){
  }

  static getMontoTotal(comprobante: Comprobante){
    var monto:number = 0;
    comprobante.productos.map(producto => monto+=producto.cantidad*producto.precioUnidad)
    return monto;
}
}
export class Pedido{
    
    constructor(public fechaEmision:Date, public productos:ProductoSolicitado[], public usuario?:Usuario, ){
    }

    static getMontoTotal(pedido: Pedido){
        var monto:number = 0;
        pedido.productos.map(producto => monto+=producto.cantidad*producto.producto.precioUnidad)
        return monto;
    }
    
   
  
  public transitionTo(state: State): void {
    console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
  }
}

