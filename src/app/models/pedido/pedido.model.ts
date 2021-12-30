import { Producto } from '../producto.model';
import { State } from './state.model';
export class ProductoSolicitado{
    constructor(public producto:Producto, public cantidad:number){

    }
}
export class ProductoSolicitadoDB{
    constructor(public productoReferencia:string, public cantidad:number){

    }
}
export class Pedido{
    
    private state: State;
    constructor(public usuario:string, public fechaEmision:Date, public productos:ProductoSolicitado[], state: State){
        this.state = state;
        this.state.setContext(this);
    }

    getMontoTotal(){
        var monto:number = 0;
        this.productos.map(producto => monto+=producto.cantidad*producto.producto.precioUnidad)
        console.log(monto)
        return monto;
    }
    
   
  
  public transitionTo(state: State): void {
    console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
    this.state = state;
    this.state.setContext(this);
}
    public request1(): void {
        this.state.handle1();
    }

    public request2(): void {
        this.state.handle2();
    }

}

