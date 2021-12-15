import { Component, OnInit } from '@angular/core';
import { ProductoService, Params } from '../../services/productos.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto.model';
import { CarroService } from '../../services/carro.service';
import { ProductoSolicitado } from 'src/app/models/pedido.model';
import Swal from 'sweetalert2';
import { Comentario, UsuarioComentario } from '../../models/comentario.model';
import { Usuario } from '../../models/user.model';
import { ComentarioService } from '../../services/comentario.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss'],
})
export class DetalleProductoComponent implements OnInit {
  producto?: Producto;
  comentarios?: Comentario[]=[];
  productoCargado: boolean = false;
  comentarioCargado = false;
  imagenActual:string=""
  idProductoSeleccionado=1;
  cantidad: number;
  constructor(private productoService: ProductoService, private router : ActivatedRoute, private comentarioService: ComentarioService,public userService: UserService) {
    this.cantidad = 1;
    this.obtener_producto();
    this.obtenerComentarios();
  }

  ngOnInit(): void {

    
  }
  async enviarComentario(){
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Comentario',
      inputPlaceholder: 'Escribe el comentario aqui...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })
    
    if (text) {
      const comentario = new Comentario("",new UsuarioComentario('Juan','https://imgur.com/h6TaSw4.png'),new Date(),[],text);
      this.comentarios!.push(comentario);
      this.comentarioService
        .guardarComentario(comentario,this.producto!)
          .subscribe(resp =>{
            if(resp.ok){
              Swal.fire({
                title:'Comentario añadido',
                icon:'success'
              })
            }else{
              
              Swal.fire({
                title:'No se pudo añador el comentario',
                icon:'error'
              })
            }
          })
    }
  }

  private obtenerComentarios(){
    this.comentarioService.obtenerComentarios(this.router.snapshot.params.id).subscribe((resp: Comentario[]) => {
      this.comentarios = resp;
      this.comentarioCargado = true;
    });
  }

  private obtener_producto() {
     this.productoService
      .obtenerProducto(this.router.snapshot.params.id)
      .subscribe(respProducto => {
        console.log(respProducto);
        this.producto=respProducto;
        console.log(this.producto);
        this.imagenActual=this.producto?.imagenes[0]!;
        this.productoCargado=true;
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
    CarroService.getCarro().productos=CarroService.getCarro().productos.map( p => {
      if (p.producto._id == this.producto!._id){
        p.cantidad+=this.cantidad;
        registro = false;
      }
      return p;
    })
    if(registro){
      CarroService.getCarro().productos.push(new ProductoSolicitado(this.producto!,this.cantidad))
    }
    CarroService.actualizarMonto();
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
