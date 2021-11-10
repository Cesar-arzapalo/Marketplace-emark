import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutosService } from 'src/app/services/produtos.service';
//import { COLUMN_DATA, ELEMENT_DATA } from 'src/app/utils';
import { ProductoModel } from '../../Models/producto.model';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  thead:string[]=[];
  data:any[]=[];
  ver:boolean=false;
  productoForm: FormGroup;
  dataRecibida: boolean = false;

  constructor(private productoService:ProdutosService, private fb:FormBuilder ) { 
    this.thead=['nombre'];
    this.obtenerProductos();
    
    this.productoForm= this.fb.group({
      nombre:[''],
      descripcion:[''],
      caracteristicas:[''],
      unidad:[''],
      precioUnidad:[''],
      stock:[''],
      valoracion:[''],
      visitas:[''],
      idCategoria:[''],
      idProveedor:[''],
      imagenes:[''],
    })
  }

  ngOnInit(): void {
  }

  agregarProducto(){
    console.log(this.productoForm);
    
    const PRODUCTO: any = {
      nombre: this.productoForm.get('nombre')?.value,
      descripcion:this.productoForm.get('descripcion')?.value,
      caracteristicas:this.productoForm.get('caracteristicas')?.value,
      unidad: this.productoForm.get('unidad')?.value,
      precioUnidad: this.productoForm.get('precioUnidad')?.value,
      stock: this.productoForm.get('stock')?.value,
      valoracion: this.productoForm.get('valoracion')?.value,
      visitas: this.productoForm.get('visitas')?.value,
      idCategoria: this.productoForm.get('idCategoria')?.value,
      idProveedor: this.productoForm.get('idProveedor')?.value,
      imagenes: this.productoForm.get('imagenes')?.value,
    }

    console.log(PRODUCTO);
    /* this.productoService.(PRODUCTO).subscribe(data => {
      console.log("registro con exito");
    }, error => {
      console.log(error);
      this.productoForm.reset();
    }) */
    this.vaciar();
    
  }

  vaciar(){
    this.productoForm= this.fb.group({
      nombre:[''],
      descripcion:[''],
      caracteristicas:[''],
      unidad:[''],
      precioUnidad:[''],
      stock:[''],
      valoracion:[''],
      visitas:[''],
      idCategoria:[''],
      idProveedor:[''],
      imagenes:[''],
    })
  }

  obtenerProductos(): any {
    return this.productoService.getProductos().subscribe((resp: any) => {
      this.data = resp.mensaje;
      console.log(resp);
      this.dataRecibida=true;
      
    });
    ;
  }

  eliminarProducto(id:any){
    this.productoService.eliminarProducto(id).subscribe( data => {
      this.obtenerProductos();
    }, error => {
      console.log(error);
    } )

    console.log("elimino Cata gaa",id);
  }

  editarProducto(id:any){

    console.log("edito Cata gaa",id);
    
    
      /* this.productoService.obtenerProducto(id).subscribe(data => {
        this.productoForm.setValue({
          nombre: data.nombre,
          descripcion: data.descripcion,
          caracteristicas: data.caracteristicas,
          unidad: data.unidad,
          precioUnidad:data.precioUnidad,
          stock:data.stock,
          valoracion:data.valoracion,
          visitas:data.visitas,
          idCategoria:data.idCategoria,
          idProveedor:data.idProveedor,
          imagenes:data.imagenes,
        })
      }) */
    

  }

  verProducto(id:any){
    console.log("veo Cata gaa",id);
    this.productoForm= this.fb.group({
      nombre:['a'],
      descripcion:['s'],
      caracteristicas:['d'],
      unidad:['ds'],
      precioUnidad:['1'],
      stock:[''],
      valoracion:[''],
      visitas:[''],
      idCategoria:[''],
      idProveedor:[''],
      imagenes:[''],
    })
    //this.productoForm.value['nombre']="aea";
    console.log(this.productoForm);
    this.productoForm.controls['nombre'].disable();
  }
}
