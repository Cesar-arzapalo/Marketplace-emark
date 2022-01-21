import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { Pedido } from '../../models/pedido/pedido.model';

export interface Auth{
  user?:{
    idUser: string;
    nick: string;
    firstName: string;
    lastName: string;
    tipoUsuario: string;
    email:string;
  }
  pedido: Pedido;
  token?:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = 'https://red-social-hds.herokuapp.com';

  private static _auth: Auth | undefined;

  get auth(){
    return {... AuthService._auth!}
  }
  
  set auth(value: Auth){
    AuthService._auth = value;
  }
  

  constructor(private http: HttpClient) {
    if(localStorage.getItem('tkAuth')){
      this.auth= <Auth>JSON.parse(
        CryptoJS.AES.decrypt(
          localStorage.getItem('tkAuth')!,'eyJhbGciOiJIUzUxMiJ9')
            .toString(CryptoJS.enc.Utf8)
      );
    }else{
      this.auth = <Auth>{
        pedido:  new Pedido(new Date(), [])
      };
      this.actualizarToken(this.auth)
    }
   }

  public static verificarAuth = (): Observable<boolean> =>of(!!localStorage.getItem('tkAuth'));

  public login(email:string, password:string){
    return this.http.post(`${this.url}/login`,{email:email,password:password}).toPromise()
      .then((resp:any) =>{
        this.auth = <Auth>{
          user:{
            idUser: resp.usuario._id,
            nick:resp.usuario.username,
            firstName: resp.usuario.firstName,
            lastName: resp.usuario.lastName,
            tipoUsuario: this.getRole(resp.usuario.isStaff),
            email:resp.usuario.email
          },          
          token: resp.token,
          pedido: this.auth.pedido
        };
        this.actualizarToken(this.auth);
        return this.auth;
      })
  }
  public register(user: any){
    return this.http.post(`${this.url}/usuario`,user).toPromise()
      .then((resp:any) =>{
        return this.auth;
      })
      .catch((err:any)=>{
        return this.auth;
      })
  }

  public actualizarToken(data: Auth){
    localStorage.setItem('tkAuth',
      CryptoJS.AES.encrypt(
        JSON.stringify(data),'eyJhbGciOiJIUzUxMiJ9')
          .toString()
    )
  }

  public cerrarSesion(data: Auth){
    this.auth = {
      pedido: data.pedido
    }
    
    localStorage.setItem('tkAuth',
      CryptoJS.AES.encrypt(
        JSON.stringify(this.auth),'eyJhbGciOiJIUzUxMiJ9')
          .toString()
    )
  }

  public updatePassword = (email:string, oldPassword: string, newPassword: string) => {
    return this.login(email, oldPassword)
          .then( (resp =>{
            return this.http.put(`${this.url}/auth/update/password/${localStorage.getItem('idUser')}`
                    ,{email: email, oldpassword: oldPassword, newpassword: newPassword }).toPromise()
          }))
          .catch()
  }
  private getRole(role: String){
    switch(role){
      case 'ADMIN_ROLE': return 'proveedor';
      default: return 'usuario';
    }
  }
  public isLogin(): boolean{
    return !!this.auth.user
  }
  
}
