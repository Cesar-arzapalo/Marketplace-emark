import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  accountForm!: FormGroup; 
  subscriptions: Array<Subscription> = [];
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$
    this.accountForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      fecha_nacimiento: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      tipo_documento: new FormControl('', Validators.required),
      documento: new FormControl('', [Validators.required]), 
      email: new FormControl('', [Validators.email, Validators.required]),
    });
  }
  ngOnDestroy(){
    for(let subscription of this.subscriptions){
      subscription.unsubscribe();
    }
  }

}
