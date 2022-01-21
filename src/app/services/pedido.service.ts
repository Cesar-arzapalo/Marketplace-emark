import { Injectable } from '@angular/core';
import { Pedido, ProductoSolicitado } from '../models/pedido/pedido.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductoService } from './productos.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  // url = 'https://emark-backend-nodejs.herokuapp.com/pedido';
  url='http://localhost:2800/pedido';


  constructor(private http: HttpClient, private productoService: ProductoService) { }


  obtenerPdedido = (): any => {
    return this.http.get(this.url)
      .pipe(
        map((resultado: any) => this.generarArregloPedido(resultado.mensaje))
      );
  }

  eliminarPedido(id: string): Observable<any> {
    return this.http.delete(`${this.url}?id=${id}`);
  }

  guardarPedido(pedido: Pedido): Observable<any> {

    let productosSolicitados: any[] = [];
    pedido.productos.map((p: ProductoSolicitado) => {
      productosSolicitados.push({
        nombre: p.producto.nombre,
        descripcion: p.producto.descripcion,
        caracteristicas: p.producto.caracteristicas,
        imagenes: p.producto.imagenes,
        cantidad: p.cantidad,
        precioUnidad:p.producto.precioUnidad
      })
    })
    productosSolicitados.push()
    return this.http.post(this.url, {
      fechaEmision: new Date(),
      productoSolicitados: productosSolicitados,
      comprador: pedido.usuario 
    })
      // .pipe(
      //   map(async (resultado: any) => {
      //     if (resultado.ok) {
      //       // return {
      //       //   pedidos:resultado.mensaje,
      //       //   productos: await Promise.all(resultado.mensaje.productoSolicitados.map((productoSolicitado: any) => {
      //       //     return  this.productoService.obtenerProducto(resultado.mensaje.productoSolicitados._id).toPromise()
      //       //     .then( resp =>{

      //       //     });
      //       //     const stock = productoSolicitado.producto.stock-productoSolicitado.cantidad;
      //       //     this.productoService.actualizarProducto(productoSolicitado.producto._id,stock)

      //       //   }))
      //       // }
      //       return resultado.mensaje;
      //     } else {
      //       console.info(resultado.mensaje);
      //       return false;
      //     }
      //   })
      // );
  }

  obtenerPedido(id: string): Observable<any> {
    return this.http.put(`${this.url}?id=${id}`, {});
  }

  private generarArregloPedido = (resp: any): Pedido[] => {
    {
      const pedidos: Pedido[] = [];
      const pedidoObject = resp;

      if (pedidoObject !== null) {
        Object.keys(pedidoObject).forEach(key =>
          pedidos.push(this.generarPedido(pedidoObject[key])));
      }
      console.log(pedidos)
      return pedidos;
    }
  }

  private generarPedido = (pedidoObject: any): Pedido => {
    return new Pedido(pedidoObject.usuario, pedidoObject.fechaEmision, pedidoObject.producto);
  }


}
