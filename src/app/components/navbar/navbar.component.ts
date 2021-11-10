import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	public terminoBusc:string="";

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


	buscarTotal(forma:NgForm) {

	}

	buscarParcial(termino:string) {
	}

	goToLink(url:any){
    this.router.navigate([url]);
  }
}
