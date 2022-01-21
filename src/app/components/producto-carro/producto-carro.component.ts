import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductoSolicitado } from '../../models/pedido/pedido.model';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-producto-carro',
  templateUrl: './producto-carro.component.html',
  styleUrls: ['./producto-carro.component.scss']
})
export class ProductoCarroComponent implements OnInit {
  @Input() productoSolicitado!: ProductoSolicitado;
  @Input() indice!: number;
  @Output() emitirProductoCarro = new EventEmitter<string>();

  constructor(private authService: AuthService) { 
  }

  ngOnInit(): void {
  }

  public aumentar = () => {
    this.productoSolicitado.cantidad=(this.productoSolicitado.cantidad<this.productoSolicitado.producto.stock)?this.productoSolicitado.cantidad + 1:this.productoSolicitado.cantidad;
    this.authService.actualizarToken(this.authService.auth);
    this.emitirProductoCarro.emit("aumento");
  };

  public disminuir = () => {
    this.productoSolicitado.cantidad=(this.productoSolicitado.cantidad>1)?this.productoSolicitado.cantidad - 1:this.productoSolicitado.cantidad;
    this.authService.actualizarToken(this.authService.auth);
    this.emitirProductoCarro.emit("disminuyo");
  };

  public eliminar = () =>{
    this.authService.auth.pedido.productos=this.authService.auth.pedido.productos.filter(p => p!==this.productoSolicitado)
    this.authService.actualizarToken(this.authService.auth);
    this.emitirProductoCarro.emit("se elimino");
  }

}