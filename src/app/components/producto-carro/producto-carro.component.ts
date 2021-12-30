import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductoSolicitado } from '../../models/pedido/pedido.model';
import { ProductoCarro } from '../../models/producto-carro.model';
import { CarroService } from '../../services/carro/carro.service';

@Component({
  selector: 'app-producto-carro',
  templateUrl: './producto-carro.component.html',
  styleUrls: ['./producto-carro.component.scss']
})
export class ProductoCarroComponent implements OnInit {
  @Input() productoSolicitado!: ProductoSolicitado;
  @Input() indice!: number;
  @Output() emitirProductoCarro = new EventEmitter<ProductoCarro>();
  constructor() { 
  }

  ngOnInit(): void {
  }

  public aumentar = () => {
    console.log(CarroService.getProductosCarro()[this.indice]);
    this.productoSolicitado.cantidad=(this.productoSolicitado.cantidad<this.productoSolicitado.producto.stock)?this.productoSolicitado.cantidad + 1:this.productoSolicitado.cantidad;
    this.agregar();
    console.log(CarroService.getProductosCarro()[this.indice]);
  };

  public disminuir = () => {
    console.log(CarroService.getProductosCarro()[this.indice]);
    this.productoSolicitado.cantidad=(this.productoSolicitado.cantidad>1)?this.productoSolicitado.cantidad - 1:this.productoSolicitado.cantidad;
    this.agregar();
    console.log(CarroService.getProductosCarro()[this.indice]);
  };

  public agregar = () => {
    this.emitirProductoCarro.emit(new ProductoCarro(this.productoSolicitado, this.indice))
  }

}