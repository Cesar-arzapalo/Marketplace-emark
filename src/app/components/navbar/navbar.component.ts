import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import * as CryptoJS from 'crypto-js';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	public terminoBusc:string="";

  constructor( private router: Router, 
    public userService: UserService,
    private authService: AuthService) { }

  ngOnInit(): void {
    
  }
	buscarTotal(forma:NgForm) {}

	buscarParcial(termino:string) {}

	goToLink(url:any){
    this.router.navigate([url]);
  }
  logueado(){
    return this.authService.auth.user;
  }

  isProveedor(){
    return this.authService.auth.user!.tipoUsuario === 'proveedor'
  }
  login(){
    return this.authService.isLogin()
  }
  cerrarSesion(){
   this.authService.cerrarSesion(this.authService.auth);
   this.router.navigateByUrl('/auth/login')
  }
}
