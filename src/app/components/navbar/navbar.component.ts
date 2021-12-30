import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, User, UserValid } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	public terminoBusc:string="";

  constructor(public auth: AuthService, private router: Router, public userService: UserService) { }

  ngOnInit(): void {
    
    this.auth.user$.subscribe(
      (profile) => {
        if(profile){
          this.userService.login(
            new UserValid('jonathan.canales@unmsm.edu.pe','123456'))
              .subscribe(response => {
                localStorage.setItem('token',response.token);
              })
          if(true){

          }
        }else{
          localStorage.removeItem('token');
        }
        
      }
    );
  }


	buscarTotal(forma:NgForm) {

	}

	buscarParcial(termino:string) {
	}

	goToLink(url:any){
    this.router.navigate([url]);
  }

  login(){
    this.auth.loginWithRedirect().subscribe(resp => {
      console.log(resp);
    })
  }
}
