import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-tipo-recepcion',
  templateUrl: './tipo-recepcion.component.html',
  styleUrls: ['./tipo-recepcion.component.scss']
})
export class TipoRecepcionComponent implements OnInit {
  opcionesTipoRecepcion: string[];
  opcionId: number = 0;
  recepcionForm!: FormGroup;
  @Output() formularioEmitter: EventEmitter<FormGroup>;
  constructor(fb: FormBuilder, private authService: AuthService) {
    this.opcionesTipoRecepcion = ["Yo recepciono", "Un conocido mio recepciona"],
      this.recepcionForm = fb.group({
        nombres_completos: ['', [Validators.required]],
        apellidos_completos: ['', [Validators.required]],
        dni: [0, [Validators.required, Validators.min(1000000), Validators.max(99999999)]],
        telefono: [0, [Validators.required, Validators.min(900000000), Validators.max(999999999)]],
        nombres_completos_otro_recepcionista!: ['Dato', [Validators.required]],
        dni_otro_recepcionista: [99999999, [Validators.required, Validators.min(1000000), Validators.max(99999999)]],
        telefono_otro_recepcionista: [999999999, [Validators.required, Validators.min(900000000), Validators.max(999999999)]],
        otro_recepcionista: [false, [Validators.required]]
      })
    this.crearListener();
    if(this.authService.isLogin()){
      this.recepcionForm.get('nombres_completos')?.setValue(this.capitalizate(this.authService.auth.user!.firstName)) 
      this.recepcionForm.get('apellidos_completos')?.setValue(this.capitalizate(this.authService.auth.user!.lastName)) 
    }

    this.formularioEmitter = new EventEmitter<FormGroup>()
  }

  capitalizate(texto: string) {
    let palabras: string[] = texto.toLowerCase().split(" ");
    for (var i = 0; i < palabras.length; i++) {
      palabras[i] = palabras[i].charAt(0).toUpperCase() + palabras[i].slice(1);
    }
    return palabras.join(" ");
  }

  ngOnInit(): void {

  }

  crearListener() {
    this.recepcionForm.valueChanges.subscribe((valor) => {
    })

    this.recepcionForm.statusChanges.subscribe((status) => {
      if (status == "VALID") {
        this.formularioEmitter.emit(this.recepcionForm);
      }
    })
  }


  obtenerIdOpcion(idOpcion: number) {
    this.recepcionForm.get("otro_recepcionista")?.setValue((idOpcion === 0 ? false : true))
    if (idOpcion === 1) {
      this.recepcionForm.get("nombres_completos_otro_recepcionista")?.setValue("")
      this.recepcionForm.get("dni_otro_recepcionista")?.setValue(undefined)
      this.recepcionForm.get("telefono_otro_recepcionista")?.setValue(undefined)
    } else {
      this.recepcionForm.get("nombres_completos_otro_recepcionista")?.setValue("Dato")
      this.recepcionForm.get("dni_otro_recepcionista")?.setValue(99999999)
      this.recepcionForm.get("telefono_otro_recepcionista")?.setValue(999999999)
    }
    this.opcionId = idOpcion
  }

}
