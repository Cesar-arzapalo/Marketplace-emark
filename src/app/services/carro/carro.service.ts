import { Injectable } from '@angular/core';
import { Pedido } from '../../models/pedido/pedido.model';
import { PedidoEnCompra } from '../../models/pedido/state.model';

@Injectable({
  providedIn: 'root'
})

export class CarroService {
  private static carro: Pedido| null = null;
  static monto: number = 0;
  
  private constructor() {
   }

   public static getInstanceCarro(){
    if(CarroService.carro==null){
      CarroService.carro = new Pedido("",new Date(), [],new PedidoEnCompra())
     }
     return CarroService.carro;
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
