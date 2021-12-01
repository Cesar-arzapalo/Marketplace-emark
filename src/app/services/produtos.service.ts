import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { tap, map } from 'rxjs/operators'
// import { ProductoModel } from '../Models/producto.model';
// import { map } from 'rxjs/operators';


                           
export interface responseProducto{
  ok: boolean;
  mensaje: Producto[];
}


@Injectable({
  providedIn: 'root'
})


export class ProductoService {
  url='https://emark-backend-nodejs.herokuapp.com/producto';
  // url='http://localhost:2800/producto';
  
  
  constructor(private http:HttpClient) { }

 
  obtenerProductos = (): any => {
     return this.http.get(this.url)
      .pipe(
        map( (resultado: any) => this.generarArregloproductos(resultado.mensaje))
      );
  }

  eliminarProducto(id: string) : Observable<any>{
    return this.http.delete(`${this.url}?id=${id}`);
  }

  guardarProducto(producto: Producto): Observable<any> {
    return this.http.post(this.url,producto);
  }

  obtenerProducto(id: string) : Observable<any>{
    return this.http.put(`${this.url}?id=${id}`,{})
    .pipe(
      map( (resultado: any) => this.generarProducto(resultado.mensaje))
    );
  }

  private generarArregloproductos = (resp: any): Producto[] => { {
    const productos: Producto[] = [];
    const productoObject = resp;

    if (productoObject !== null) {
        Object.keys(productoObject).forEach( key =>
          productos.push( this.generarProducto(productoObject[key])));
    }
    console.log(productos)
    return productos;
  }
}

  private generarProducto = (productoObject: any): Producto => {
    const producto =
      new Producto(productoObject._id,productoObject.nombre, productoObject.descripcion,
        productoObject.caracteristicas[0], productoObject.unidad, productoObject.precioUnidad,
        productoObject.stock,productoObject.valoracion,productoObject.visitas,productoObject.idCategoria,
        productoObject.idProveedor, productoObject.imagenes);
    return producto;
  }


}
