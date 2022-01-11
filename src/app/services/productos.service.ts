import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../models/producto.model';
import { map } from 'rxjs/operators'
import * as CryptoJS from 'crypto-js';

                         
export interface responseProducto{
  ok: boolean;
  mensaje: Producto[];
}
export interface Params{
  name: string;
  value: any;
}

@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  url='https://emark-backend-nodejs.herokuapp.com/producto';
  // url='http://localhost:2800/producto';
  urlRedSocial='https://red-social-hds.herokuapp.com'
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

  guardarProducto(producto: Producto): Promise<any> {
    console.log(producto)
    let header = new HttpHeaders({token: JSON.parse(CryptoJS.AES.decrypt(
      localStorage.getItem('tkAuth')!,'eyJhbGciOiJIUzUxMiJ9')
        .toString(CryptoJS.enc.Utf8)).token+""});
    return this.http.post(`${this.urlRedSocial}/post`,{
      title:producto.nombre,
      content:producto.descripcion,
      image:producto.imagenes[0]
    },{headers: header}).toPromise()
    .then((resp:any) =>{
      if(resp.ok){
        console.log(resp.post._id)
        producto.setID(resp.post._id)
        console.log(producto)
        return this.http.post(this.url,producto).toPromise();
      }else{
        return of(false).toPromise()
      }
    })
  }

  obtenerProducto(id: string) : Observable<any>{
    return this.http.put(`${this.url}?id=${id}`,{})
    .pipe(
      map( (resultado: any) => this.generarProducto(resultado.mensaje))
    );
  }

  actualizarProducto(id: string,params:Params[]) : Observable<any>{
    const productoParam =  new HttpParams();
    params.forEach(param => {
      productoParam.set(param.name,param.value)
    });
    return this.http.put(`${this.url}?id=${id}`,undefined,{responseType:'json', params:productoParam});
  }

  private generarArregloproductos = (resp: any): Producto[] => { 
    const productos: Producto[] = [];
    const productoObject = resp;
    if (productoObject !== null) {
        Object.keys(productoObject).forEach( key =>
          productos.push( this.generarProducto(productoObject[key])));
    }
    console.log(productos)
    return productos;
  }

  private generarProducto = (productoObject: any): Producto => {
    const producto =
      new Producto(productoObject._id,productoObject.nombre, productoObject.descripcion,
        productoObject.caracteristicas, productoObject.unidad, productoObject.precioUnidad,
        productoObject.stock,productoObject.valoracion,productoObject.visitas,productoObject.idCategoria,
        productoObject.idProveedor, productoObject.imagenes);
    return producto;
  }
}
