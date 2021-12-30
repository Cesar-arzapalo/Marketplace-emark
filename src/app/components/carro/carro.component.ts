import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from '../../models/pedido/pedido.model';
import { CarroService } from '../../services/carro/carro.service';
import { ProductoCarro } from '../../models/producto-carro.model';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.scss']
})
export class CarroComponent implements OnInit {

  pedido: Pedido;
  montoTotal:number;
  constructor(private router:Router) { 
    this.pedido = CarroService.getInstanceCarro()
    this.montoTotal=CarroService.getMonto();

  }

  ngOnInit(): void {
  }

  navegar(){
    this.router.navigateByUrl("/venta")
  }
  actualizarCarro(productoCarro: ProductoCarro){
    CarroService.getInstanceCarro().productos[productoCarro.idProductoCarro]=productoCarro.productoSolicitado;
    this.pedido.productos[productoCarro.idProductoCarro]=productoCarro.productoSolicitado;
    CarroService.actualizarMonto();
    this.montoTotal=CarroService.getMonto();
  }
  obtenerCarro(){
    this.montoTotal=CarroService.getMonto();
  }
  

}
