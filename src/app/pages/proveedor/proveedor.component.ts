import { Component, OnInit } from '@angular/core';
import { COLUMN_DATA, ELEMENT_DATA } from 'src/app/utils';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {

  thead:string[]=[];
  data:any=[];

  constructor() { 
    this.thead=COLUMN_DATA;
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.data=ELEMENT_DATA;
    
    /* this.productoService..subscribe(data => {
      this.data=data;
    }, error => {
      console.log(error);
    } ) */
  }

  eliminarProducto(id:any){
    /* this.productoService.(id).subscribe( data => {
      this.obtenerProductos();
    }, error => {
      console.log(error);
    } ) */

    console.log("elimino Provee gaa",id);
  }

  editarProducto(id:any){
    console.log("edito Provee gaa",id);
  }

  verProducto(id:any){
    console.log("veo Provee gaa",id);
  }

}
