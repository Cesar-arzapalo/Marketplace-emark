import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../components/producto/interfaces/producto.interfaces';
import { ProductoModel } from '../Models/producto.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class ProdutosService {
  url='https://emark-backend-nodejs.herokuapp.com/producto';
  
  
  constructor(private http:HttpClient) { }

 
  getProductos = (): any => {
     return this.http.get(this.url);
  }


  eliminarProducto(id: string) : Observable<any>{
    return this.http.delete(this.url + id);
  }

  guardarProducto(producto: Producto): Observable<any> {
    return this.http.post(this.url, producto);
  }

  obtenerProducto(id: string) : Observable<any>{
    return this.http.get(this.url + id);
  }

//   private generarArregloproductos = (resp: any): ProductoModel[] => { {
//     const productos: ProductoModel[] = [];
//     const productoObject = resp.mensaje;

//     if (productoObject !== null) {
//         Object.keys(productoObject).forEach( key =>
//           productos.push( this.generarProducto(productoObject[key])));
//     }
//     return productos;
//   }
// }

//   private generarProducto = (producto: any): ProductoModel => {
//     const pregunta =
//       new ProductoModel(producto.nombre, producto.descripcion,
//         producto.caracteristica, producto.unidad, producto.precioUnidad,
//         producto.stock,producto.valoracion,producto.visitas,producto.idCategoria,
//         producto.idProveedor, producto.imagenes);
//     return pregunta;
//   }


}
