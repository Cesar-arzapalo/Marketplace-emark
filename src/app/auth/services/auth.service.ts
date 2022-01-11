import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { Pedido, ProductoSolicitado } from '../../models/pedido/pedido.model';
import { CarroService } from '../../services/carro/carro.service';

export interface Auth{
  idUser: string;
  nick: string;
  tipoUsuario: string;
  productos: ProductoSolicitado[];
  token:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = 'https://red-social-hds.herokuapp.com';

  private _auth: Auth | undefined;

  get auth(){
    return {... this._auth!}
  }
  
  set auth(value: Auth){
    this._auth = value;
  }
  

  constructor(private http: HttpClient) {
    if(localStorage.getItem('tkAuth')){
      this.auth= <Auth>JSON.parse(
        CryptoJS.AES.decrypt(
          localStorage.getItem('tkAuth')!,'eyJhbGciOiJIUzUxMiJ9')
            .toString(CryptoJS.enc.Utf8)
      );
      console.log(this.auth)
    }
   }

  public static verificarAuth = (): Observable<boolean> =>of(!!localStorage.getItem('tkAuth'));

  public login(email:string, password:string){
    return this.http.post(`${this.url}/login`,{email:email,password:password}).toPromise()
      .then((resp:any) =>{
        this.auth = <Auth>{
          idUser: resp.usuario._id,
          nick:resp.usuario.username,
          tipoUsuario: this.getRole(resp.usuario.isStaff),
          token: resp.token,
          productos: CarroService.getInstanceCarro().productos
        };
        console.log(this.auth)
        this.actualizarToken(this.auth);
        return this._auth;
      })
      .catch((err:any)=>{
        return this._auth;
      })
  }
  public register(user: any){
    return this.http.post(`${this.url}/usuario`,user).toPromise()
      .then((resp:any) =>{
        return this._auth;
      })
      .catch((err:any)=>{
        return this._auth;
      })
  }

  public actualizarToken(data: Auth){
    localStorage.setItem('tkAuth',
    CryptoJS.AES.encrypt(
      JSON.stringify(data),'eyJhbGciOiJIUzUxMiJ9')
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
  
}
