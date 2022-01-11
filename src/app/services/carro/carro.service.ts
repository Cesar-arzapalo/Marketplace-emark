import { Injectable } from '@angular/core';
import { Pedido } from '../../models/pedido/pedido.model';
import { PedidoEnCompra } from '../../models/pedido/state.model';

@Injectable({
  providedIn: 'root'
})

export class CarroService {
  private static _carro: Pedido| null = null;
  static monto: number = 0;

  get carro(){
    return {... CarroService._carro!}
  }
  
  set auth(value: Pedido){
    CarroService._carro = value;
  }
  private constructor() {
   }

   public static getInstanceCarro(){
    if(CarroService._carro==null){
      CarroService._carro = new Pedido("",new Date(), [],new PedidoEnCompra())
     }
     return CarroService._carro;
   }

   static getProductosCarro(){
     
     return  this.getInstanceCarro().productos;
   }
   static actualizarMonto(){
    CarroService.monto =  this.getInstanceCarro().getMontoTotal()
   } 

   static getMonto(){
    return CarroService.monto;
  }

  

}
