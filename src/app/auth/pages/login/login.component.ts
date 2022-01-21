import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(fb: FormBuilder, private authService:AuthService,
    private router:Router) { 
    this.formLogin = fb.group({
      username:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    // this.crearListener();
  }
  
  crearListener(){
    this.formLogin.valueChanges.subscribe((valor) => {
      console.log(valor);
    })

    this.formLogin.statusChanges.subscribe((status) => {
      console.log({status})
    })

    var formControlNombre=this.formLogin.get('nombre')
    
    if(formControlNombre){
      formControlNombre.valueChanges.subscribe(console.log);
    }
  }


  public  ingresar = () =>  {
    Toast.showLoading();

    if(!this.formLogin.valid){
      this.notificationErr(Toast,"Los datos del formulario no son validos") 
      return;
    }
    this.authService.login(
      this.formLogin.get('username')?.value,this.formLogin.get('password')?.value)
        .then(resp => {
          if(resp){
            this.notificationSuccess(Toast,"Ingresando al sistema")
            this.router.navigate(['/ventas/catalogo']);
          }
        })
        .catch(err  => {
          switch(err.statusText){
            case 'Bad Request':{
              this.notificationErr(Toast,"Usuario y/o contraseña incorrecta")
              break;
            } 
            default:{
              this.notificationErr(Toast,"Error al conectarse con el servidor")
              break;
            }
          }
        })
  }

  notificationErr(Toast: any, tittleError: string){
      Toast.fire({
        icon: 'error',
        title: tittleError
      })
    
  }
  notificationSuccess(Toast: any,tittleOk:string){
    Toast.fire({
      icon: 'success',
      title: tittleOk
    })
  }
  
  
}
const Toast = Swal.mixin({
  toast: true,
  title: 'Cargando ...',
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
