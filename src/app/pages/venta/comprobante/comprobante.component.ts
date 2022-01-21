import { Component, OnInit } from '@angular/core';
import { Comprobante, Pedido, ProductoSolicitado } from '../../../models/pedido/pedido.model';
import { CorreoService } from '../../../services/correo.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import html2canvas from "html2canvas";
import { PedidoService } from '../../../services/pedido.service';
import { Mensaje } from '../../../models/mensaje.model';
import { PedidoComprado } from '../../../models/pedido/state.model';

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.scss']
})
export class ComprobanteComponent implements OnInit {
  mensaje!: Mensaje;
  comprobante!: Comprobante;
  monto: number = 0;
  pedidoCargado: boolean = false;
  constructor(private actRouter: ActivatedRoute, public router: Router,
    private pedidoService:PedidoService, public correoService: CorreoService) {
    this.generarPedido(<string>this.actRouter.snapshot.params.id)!;
    
  }

  ngOnInit(): void {
    
  }
    
  generarPedido(id:string){
    this.pedidoService.obtenerPedido(id).subscribe(resp  =>{
      console.log(resp.mensaje)      
      this.comprobante = new Comprobante(new Date(resp.mensaje.fechaEmision), resp.mensaje.productoSolicitados,resp.mensaje.comprador)
      this.monto=Comprobante.getMontoTotal(this.comprobante)
      this.pedidoCargado=true;
        this.mensaje= new Mensaje(`${this.comprobante.usuario!.apellidos}, ${this.comprobante.usuario!.nombres}`,"","Gracias por Comprar en EMARK - Comprobante Electronico",`https://e-mark.herokuapp.com${this.router.url}`)
    });
    
  }

  async crearComprobante(){
    
    html2canvas(  <HTMLCanvasElement> document.querySelector("#comprobante")!).then((canvas:any) => {
      this.comprobante = canvas.toDataURL();
      this.realizarDescarga(this.comprobante)      
    }).catch((err: any) =>{
      console.error(err.error)
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'error',
        title: (err.error)
      })
    });
  }

  realizarDescarga(comprobante: any){
    var archivo = document.createElement('a')
    archivo.href=comprobante;
    archivo.download = "Comprobante Electronico.png"
    archivo.click();
  }

  async descargarComprobante(){
    const Toast = Swal.mixin({
      title: ('Descargando comprobante'),
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true
    })

    await this.crearComprobante()
    const Toast2 = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: (`Se descargo el comprobante`)
    })

  }


  crearAsunto(){

  }
  async enviarCorreo(){

    const Toast = Swal.mixin({
      toast: true,
      title: 'Envio de comprobante',
      input: 'email',
    })
    const { value: email} = await Toast.fire({
      inputValue: this.mensaje.correo,
      inputLabel: 'Correo electronico:',
      inputPlaceholder: 'Ingrese un correo'
    })
    
    if (email) {
      const Toast = Swal.mixin({
        title: ('Verificando envio'),
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timerProgressBar: true
      })
      Toast.isLoading()
      //await this.crearComprobante()
      this.crearAsunto();
      this.correoService.enviarCorreo('sistemas_distribuidos',email,this.mensaje.usuario,this.mensaje.asunto,this.mensaje.mensaje).toPromise().then( mns => {
        console.log(mns);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1800,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: (`Se envio el comprobante al correo: ${email}`)
        })
      }).catch( (err: any) => {
        console.error(err.error)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1800,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: (err.error)
        })
      })
    }
  }

}
