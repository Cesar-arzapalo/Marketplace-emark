import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IUser{
  usuario:string;
  nombres:string;
  apellidos:string;
  correo:string;
  imagen:string;
}

export class UserValid{
  constructor(public email: string,public password: string){}
}

export class User{
  constructor(public usuario: IUser['usuario'], 
              public nombres: IUser['nombres'], 
              public apellidos: IUser['apellidos'],
              public correo: IUser['correo'],
              public imagen: IUser['imagen']){}
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  url='https://red-social-hds.herokuapp.com';
  
  
  constructor(private http:HttpClient) { }
  
  login(userData: UserValid):Observable<any>{
    return this.http.post(`${this.url}/login`,{email: userData.email,password: userData.password});
  }

  guardarProducto(usuario: User): Observable<any> {
    console.log(usuario)
    return this.http.post(this.url,usuario);
  }

  obtenerProducto(id: string) : Observable<any>{
    return this.http.put(`${this.url}?id=${id}`,{})
    .pipe(
      map( (resultado: any) => this.generarUsuario(resultado.mensaje))
    );
  }
  private generarUsuario = (usuarioObject: any): User => {
    return new User(usuarioObject.username,usuarioObject.firstName,usuarioObject.lastName,usuarioObject.email,usuarioObject.image);
  }
}
