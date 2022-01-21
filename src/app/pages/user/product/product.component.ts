import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Campo } from 'src/app/models/objeto-tabla.model';
import { Producto } from 'src/app/models/producto.model';
import Swal from 'sweetalert2'
import { ProductoService } from '../../../services/productos.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  camposImagenes: Campo[]
  camposCaracteristica: Campo[]
  productosForm: FormGroup

  constructor(private fb:FormBuilder, private productoService:ProductoService) { 
console.log(CryptoJS.AES.decrypt(
  localStorage.getItem('tkAuth')!,'eyJhbGciOiJIUzUxMiJ9')
    .toString(CryptoJS.enc.Utf8))
    this.camposImagenes=[new Campo("imagen","text")]
    this.camposCaracteristica=[new Campo("nombre","text"),new Campo("descripcion","text")]
    this.productosForm=fb.group({
      nombre: ['',[Validators.required,Validators.maxLength(128)]],
      descripcion:['',[Validators.required,Validators.maxLength(512)]],
      idCategoria:[0,[Validators.required,Validators.min(0),Validators.max(20)]],
      idProvedor:[{value:'61b64d064dc0db0016fc1e02',disabled:true},Validators.required],
      valoracion:[0,[Validators.required,Validators.min(0),Validators.max(99999)]],
      visitas:[0,[Validators.required,Validators.min(0)]],
      precio:[0,[Validators.required,Validators.min(0)]],
      stock:[0,[Validators.required,Validators.min(0)]],
      unidad:['',[Validators.required,Validators.minLength(0),Validators.maxLength(30)]],
      caracteristicas:fb.array([]),
      imagenes:fb.array([])
    });
  }

  
  ngOnInit(): void {
    this.crearListener();
  }
  
  crearListener(){
    this.productosForm.valueChanges.subscribe((valor) => {
      console.log(valor);
    })

    this.productosForm.statusChanges.subscribe((status) => {
      console.log({status})
    })

    var formControlNombre=this.productosForm.get('nombre')
    
    if(formControlNombre){
      formControlNombre.valueChanges.subscribe(console.log);
    }
  }

  actualizarCaracteristicas(form:FormArray){
    this.productosForm.setControl("caracteristicas",form)
  }
  actualizarImagenes(form:FormArray){
    this.productosForm.setControl("imagenes",form)
  }

  anyadirProducto(){
    if(this.productosForm.invalid){
      Swal.fire({
        title:'Datos incorrectos y/o incompletos',
        icon:'error'
      })
      return;
    }
    Swal.fire({
      title:'Espere por favor...'
    })
    Swal.showLoading ()
    let imagenes:Array<string> = [];
    this.productosForm.get("imagenes")?.value.forEach((img: any) => {
      imagenes.push(img.imagen);
    });
    
    let carracteristicas: string='{';
    this.productosForm.get("caracteristicas")?.value.forEach((caracteristica:any) => {
      carracteristicas+=`"${caracteristica.nombre}":"${caracteristica.descripcion}",`;
    });
    if(this.productosForm.get("caracteristicas")?.value.length>0){
      carracteristicas =carracteristicas.substring(0, carracteristicas.length - 1);
    } 
    carracteristicas+="}";
    console.log(carracteristicas);
    console.log(JSON.parse(carracteristicas))

    var productoNuevo = new Producto(
      ''
      ,this.productosForm.get("nombre")?.value,
      this.productosForm.get("descripcion")?.value,
      JSON.parse(carracteristicas),
      this.productosForm.get("unidad")?.value,
      this.productosForm.get("precio")?.value,
      this.productosForm.get("stock")?.value,
      this.productosForm.get("valoracion")?.value,
      this.productosForm.get("visitas")?.value,
      this.productosForm.get("idCategoria")?.value,
      this.productosForm.get("idProvedor")?.value,
      imagenes,
    )
    console.log(productoNuevo);
    this.productoService.guardarProducto(productoNuevo)
    .then(( (resp) => {
      console.log(resp);
      if(resp.ok){
        Swal.fire({
          title:'Producto añadido',
          icon:'success'
        })
      }else{
        
        Swal.fire({
          title:'No se pudo añador el producto',
          icon:'error'
        })
      }
    })).catch()
  }
}
