import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  row!: HTMLElement;
  formRegister: FormGroup;
  urlAdmin: string = 'https://administracion-pmtd.herokuapp.com';
  urlAdminLocal: string = 'http://localhost:4400';

  constructor(fb: FormBuilder, private authService:AuthService,
    private router:Router) { 
    this.formRegister = fb.group({
      username:['', [Validators.required]],
      firstname:['', [Validators.required]],
      lastname:['', [Validators.required]],
      isStaff:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.crearListener();
  }
  
  crearListener(){
    this.formRegister.valueChanges.subscribe((valor) => {
      console.log(valor);
    })

    this.formRegister.statusChanges.subscribe((status) => {
      console.log({status})
    })

    var formControlNombre=this.formRegister.get('nombre')
    
    if(formControlNombre){
      formControlNombre.valueChanges.subscribe(console.log);
    }
  }

  public  registrar = () =>  {
    Toast.showLoading();

    if(!this.formRegister.valid){
      this.notificationErr(Toast,"Los datos del formulario no son validos") 
      return;
    }

    const user : any = {
      username:this.formRegister.get('username')!.value,
      firstName:this.formRegister.get('firstname')!.value,
      lastName:this.formRegister.get('lastname')!.value,
      email:this.formRegister.get('email')!.value,
      password:this.formRegister.get('password')!.value,
      isStaff:this.obtenerRol(this.formRegister.get('isStaff')?.value),
      isActivated:true
    }

    console.log(user)
    this.authService.register(user)
        .then(resp => {
          console.log(resp)
          this.notificationSuccess(Toast,"Se registro correctamente")
          this.router.navigateByUrl('/auth/login');
        })
        .catch(err  => {
          this.notificationErr(Toast,"Error al conectarse con el servidor")
        })
  }
  getSizeIcon(){
    return this.row.clientWidth - this.row.clientHeight
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
  obtenerRol(isStaff: string): string{
    switch(isStaff){
      case 'proveedor':{
        return 'ADMIN_ROLE'
      }
      default: return 'USER_ROLE'
    }
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
