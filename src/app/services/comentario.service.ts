import { Injectable } from '@angular/core';
import { Comentario, UsuarioComentario } from '../models/comentario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductComponent } from '../pages/user/product/product.component';
import { Producto } from '../models/producto.model';

export interface responseProducto{
  ok: boolean;
  mensaje: Comentario[];
}

@Injectable({
  providedIn: 'root'
})  

export class ComentarioService {
  url='https://red-social-hds.herokuapp.com';
  
  constructor(private http:HttpClient) { }
 
  obtenerComentarios = (idPost: string):  Observable<any> => {
     return this.http.get(`${this.url}/post/comment/${idPost}`)
      .pipe(
        map( (resultado: any) => this.generarArregloComentarios(resultado.comment))
      );
  }

  guardarComentario(comentario: Comentario, producto: Producto): Observable<any> {
    
    let header = new HttpHeaders({token: localStorage.getItem('token')!+""});
    console.log(localStorage.getItem('token'),header)
    return this.http.post(`${this.url}/comment`,{
      description:comentario.descripcion,
      post:producto._id
    },{headers: header});
  }
  
  eliminarComentario(id: string) : Observable<any>{
    return this.http.delete(`${this.url}?id=${id}`);
  }


  obtenerComentario(id: string) : Observable<any>{
    return this.http.put(`${this.url}?id=${id}`,{})
    .pipe(
      map( (resultado: any) => this.generarComentario(resultado.mensaje))
    );
  }

  actualizarComentario(id: string, comentario: Comentario) : Observable<any>{
    return this.http.put(`${this.url}?id=${id}`,comentario);
  }

  private generarArregloComentarios = (resp: any): Comentario[] => { {
    const comentario: Comentario[] = [];
    const comentarioObject = resp;

    if (comentarioObject !== null) {
        Object.keys(comentarioObject).forEach( key =>
          comentario.push( this.generarComentario(comentarioObject[key])));
    }
    return comentario;
  }
}

  private generarComentario = (comentarioObject: any): Comentario => {
    const imagenUser: string = comentarioObject.user.image?comentarioObject.user.image:'https://imgur.com/h6TaSw4.png';
    const fechaUComent: Date = comentarioObject.updatedAt?new Date(comentarioObject.updatedAt):new Date();
    return new Comentario(comentarioObject._id,new UsuarioComentario(comentarioObject.user.username,imagenUser),
                          fechaUComent, [], comentarioObject.description, undefined);
  }
    
}
