import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  url='https://emark-backend-nodejs.herokuapp.com/pedido';
  // url='http://localhost:2800/producto';
  
  
  constructor(private http:HttpClient) { }

 
  obtenerPdedido = (): any => {
     return this.http.get(this.url)
      .pipe(
        map( (resultado: any) => this.generarArregloPedido(resultado.mensaje))
      );
  }

  eliminarPedido(id: string) : Observable<any>{
    return this.http.delete(`${this.url}?id=${id}`);
  }

  guardarPedido(pedido: Pedido): Observable<any> {
    return this.http.post(this.url,pedido)
      .pipe(
        map((resultado:any) => {
          if(resultado.ok){
            return resultado.mensaje;
          }else{
            console.info(resultado.mensaje);
            return false;
          }
        })
      );
  }

  obtenerPedido(id: string) : Observable<any>{
    return this.http.put(`${this.url}?id=${id}`,{})
    .pipe(
      map( (resultado: any) => this.generarPedido(resultado.mensaje))
    );
  }

  private generarArregloPedido = (resp: any): Pedido[] => { {
    const pedidos: Pedido[] = [];
    const pedidoObject = resp;

    if (pedidoObject !== null) {
        Object.keys(pedidoObject).forEach( key =>
          pedidos.push( this.generarPedido(pedidoObject[key])));
    }
    console.log(pedidos)
    return pedidos;
  }
}

  private generarPedido = (pedidoObject: any): Pedido => {
    return new Pedido(pedidoObject.usuario,pedidoObject.fechaEmision, pedidoObject.productos);
  }


}
