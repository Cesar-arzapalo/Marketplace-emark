import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../components/producto/interfaces/producto.interfaces';

@Injectable({
  providedIn: 'root'
})


export class ProdutosService {
  url='https://emark-backend-nodejs.herokuapp.com/producto';
  
  
  constructor(private http:HttpClient) { }

 
  getProductos(): Observable<any> {
    return this.http.get(this.url);
    console.log(this.http.get(this.url))
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


}
