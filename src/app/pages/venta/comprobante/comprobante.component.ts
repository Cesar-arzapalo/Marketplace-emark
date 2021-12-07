import { Component, OnInit } from '@angular/core';
import { Pedido} from '../../../models/pedido.model';
import { CorreoService } from '../../../services/correo.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import html2canvas from "html2canvas";
import { PedidoService } from '../../../services/pedido.service';
import { Mensaje } from '../../../models/mensaje.model';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.scss']
})
export class ComprobanteComponent implements OnInit {
  mensaje!: Mensaje;
  pedido!: Pedido;
  monto: number = 0;
  comprobante: any;
  pedidoCargado: boolean = false;
  constructor(private actRouter: ActivatedRoute, public router: Router,private auth: AuthService,
    private pedidoService:PedidoService, public correoService: CorreoService) {
    this.generarPedido(<string>this.actRouter.snapshot.params.id)!;
    
  }

  ngOnInit(): void {
    
  }
    
  generarPedido(id:string){
    this.pedidoService.obtenerPedido(id).subscribe(resp  =>{
      this.pedido = new Pedido(resp.usuario, resp.fechaEmision, resp.productoReferencia)
      
      this.pedidoCargado=true;
      this.auth.user$.subscribe(perfil =>{
        this.mensaje= new Mensaje(this.pedido.usuario,(perfil)?(perfil?.email!):"","Gracias por Comprar en EMARK - Comprobante Electronico",`https://e-mark.herokuapp.com${this.router.url}`)
      })
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
