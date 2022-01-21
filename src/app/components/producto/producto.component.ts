import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductoSolicitado } from '../../models/pedido/pedido.model';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  @Input() producto!: Producto;
  @Output() emitirProductoSolicitado = new EventEmitter<ProductoSolicitado>();
  cantidad: number;
  constructor(private authService: AuthService) {
    this.cantidad = 1;
  }

  ngOnInit(): void {
  }

  public aumentar = () => {
    this.cantidad = (this.cantidad < this.producto.stock) ? this.cantidad + 1 : this.cantidad;
  };

  public disminuir = () => {
    this.cantidad = (this.cantidad > 1) ? this.cantidad - 1 : this.cantidad;
  };

  public agregar = () => {
    let registro = true;
    this.authService.auth.pedido.productos=this.authService.auth.pedido.productos.map( p => {
      if (p.producto._id == this.producto!._id){
        p.cantidad+=this.cantidad;
        registro = false;
      }
      return p;
    })
    if(registro){
      this.authService.auth.pedido.productos.push(new ProductoSolicitado(this.producto!,this.cantidad))
    }
    this.authService.actualizarToken(this.authService.auth)
    this.cantidad = 1;
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1200,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: `Se ${registro?"registro":"actualizo"} el producto en el carro`
    })
  }
}
