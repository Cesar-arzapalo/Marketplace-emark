import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from '../../models/pedido/pedido.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PedidoService } from '../../services/pedido.service';
import { ProductoService } from '../../services/productos.service';
import { PedidoEnCompra } from '../../models/pedido/state.model';
import { AuthService } from '../../auth/services/auth.service';
import { Usuario } from '../../models/user.model';

interface Paginacion{
  id:number;
  nombre:string;
}
@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})


export class VentaComponent implements OnInit {
  pagina: string;
  idPagina: number;
  paginacion: Paginacion[];
  pedido: Pedido;
  monto: number;
  formPedido: FormGroup;
  activacion=false;


  constructor(private router: Router,private productoServices: ProductoService, 
    private pedidoService: PedidoService,private fb :FormBuilder,
    private authService: AuthService) {
    this.pagina="tipo de recepcion";
    this.idPagina=1;
    this.paginacion=[{id:1,nombre:"tipo de recepcion"},{id:2,nombre:"tipo de entrega"}
    ,{id:3,nombre:"metodo de pago"},{id:4,nombre:"finalizar venta"}]
    this.pedido=this.authService.auth.pedido;
    this.monto = Pedido.getMontoTotal(this.authService.auth.pedido)
    this.formPedido=this.fb.group({
      recepcionForm:[,Validators.required],
      entregaForm:[,Validators.required],
      ventaForm:[,Validators.required]
    })
   }

  ngOnInit(): void {
    this.crearListener()
  }

  crearListener(){
    this.formPedido.valueChanges.subscribe((valor) => {
    })

    this.formPedido.statusChanges.subscribe((status) => {
      if(status == "VALID"){
      }
    })
  }
  navegar(idPagNav:number,direccion: string){
    switch(idPagNav){
      case 1: this.pagina="tipo de recepcion"; break;
      case 2: this.pagina="tipo de entrega"; break;
      case 3: this.pagina="metodo de pago"; break;
      case 4: this.finalizarCompra();
    }
    switch(direccion){
      case "izquierda": this.idPagina-=1; break;
      case "derecha": this.idPagina+=1; break;
    }

    this.activacion=false;
    
  }

  finalizarCompra(){
    const usuario: Usuario = {
      nombres: <string>this.formPedido.get('recepcionForm')?.value.value['nombres_completos'],
      apellidos: <string>this.formPedido.get('recepcionForm')?.value.value['apellidos_completos'],
      dni: +this.formPedido.get('recepcionForm')?.value.value['dni'],
      celular: +this.formPedido.get('recepcionForm')?.value.value['telefono'],
      tarjeta:{
        numero: +this.formPedido.get('ventaForm')?.value.value['nro_tarjeta'],
        fecha_vencimiento: new Date(this.formPedido.get('ventaForm')?.value.value['fecha_caducidad']),
        ccv: +this.formPedido.get('ventaForm')?.value.value['ccv']
      },
      direccion:{
        direccion: <string>this.formPedido.get('entregaForm')?.value.value['direccion'],
        distrito: <string>this.formPedido.get('entregaForm')?.value.value['distrito'],
        codigo_postal: <string>this.formPedido.get('entregaForm')?.value.value['codigo_postal']
      },
      foto: "https://imgur.com/h6TaSw4.png"
    }
    const pedido = new Pedido(new Date(),this.pedido.productos, usuario);
    this.pedidoService.guardarPedido(pedido).subscribe( ref => {
      console.log(ref)
      if(ref.ok){
        this.router.navigateByUrl(`/ventas/pedido/comprobante/${ref.mensaje._id}`)
      }
    })
    
  }

  obtenerPaginacion(id:number):string{
    var nombre:string=""
    this.paginacion.map(pag => { if (pag.id ===id) nombre= pag.nombre});
    return nombre;
  }

  actualizarForm(form: FormGroup, idx: number){
    switch(idx){
      case 0: this.formPedido.get('recepcionForm')?.setValue(form);break;
      case 1: this.formPedido.get('entregaForm')?.setValue(form);break;
      case 2: this.formPedido.get('ventaForm')?.setValue(form);break;
    }
    this.activacion=true

  }

  obtenerForm( idx: number):AbstractControl{
    switch(idx){
      case 0: return this.formPedido.get('recepcionForm')!;
      case 1: return this.formPedido.get('entregaForm')!;;
      case 2: return this.formPedido.get('ventaForm')!;
      default: return this.formPedido.get('ventaForm')!;
    }
  }

}