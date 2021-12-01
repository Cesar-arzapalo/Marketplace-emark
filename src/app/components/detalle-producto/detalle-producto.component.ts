import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/produtos.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto.model';
import { CarroCompartidoService } from '../../services/carro.service';
import { ProductoSolicitado } from 'src/app/models/pedido.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss'],
})
export class DetalleProductoComponent implements OnInit {
  producto?: Producto;
  productoCargado: boolean = false;
  imagenActual:string=""
  idProductoSeleccionado=1;
  cantidad: number;
  constructor(private productoService: ProductoService, private router : ActivatedRoute) {
    this.cantidad = 1;
  }

  ngOnInit(): void {

    this.obtener_producto();
  }

  obtener_producto() {
    console.log(this.router.snapshot.params.id)
     this.productoService
      .obtenerProducto(this.router.snapshot.params.id)
      .subscribe(respProducto => {
        this.producto=respProducto;
        this.imagenActual=this.producto?.imagenes[0]!;
        this.productoCargado=true;
        console.log(this.producto)
      });
      
  }


  actualizarImagenSeleccionada = (idx:number) => {
      this.idProductoSeleccionado = idx
      this.imagenActual = this.producto!.imagenes[idx-1]
  }
  public aumentar = () => {
    this.cantidad = (this.cantidad < this.producto!.stock) ? this.cantidad + 1 : this.cantidad;
    console.log(this.cantidad);
  };

  public disminuir = () => {
    this.cantidad = (this.cantidad > 1) ? this.cantidad - 1 : this.cantidad;
    console.log(this.cantidad);
  };

  public agregar = () => {
    let registro = true;
    CarroCompartidoService.getCarro().productos=CarroCompartidoService.getCarro().productos.map( p => {
      if (p.producto.id == this.producto!.id){
        p.cantidad+=this.cantidad;
        registro = false;
      }
      return p;
    })
    if(registro){
      CarroCompartidoService.getCarro().productos.push(new ProductoSolicitado(this.producto!,this.cantidad))
    }
    CarroCompartidoService.actualizarMonto();
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
