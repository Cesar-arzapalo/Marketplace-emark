import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})

export class CarroService {
  static carro:Pedido = new Pedido("",new Date(), [])
  static monto: number = 0;
  constructor() {
   }

   static getCarro(){
     return CarroService.carro;
   }

   static getProductosCarro(){
     return CarroService.carro.productos;
   }
   static actualizarMonto(){
    CarroService.monto = CarroService.carro.getMontoTotal()
   } 

   static getMonto(){
    return CarroService.monto;
  }

  

}
