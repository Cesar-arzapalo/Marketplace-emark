import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, User, UserValid } from '../../services/user.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	public terminoBusc:string="";

  constructor( private router: Router, public userService: UserService) { }

  ngOnInit(): void {
    
  }
	buscarTotal(forma:NgForm) {}

	buscarParcial(termino:string) {}

	goToLink(url:any){
    this.router.navigate([url]);
  }
  logueado(){
    return localStorage.getItem('tkAuth');
  }

  isProveedor(){
    return JSON.parse(CryptoJS.AES.decrypt(
      localStorage.getItem('tkAuth')!,'eyJhbGciOiJIUzUxMiJ9')
        .toString(CryptoJS.enc.Utf8)).tipoUsuario === 'proveedor'
  }
  login(){
  }
  cerrarSesion(){
    localStorage.clear();
    this.router.navigateByUrl('/auth/login')
  }
}
