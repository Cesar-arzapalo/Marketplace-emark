import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from '../../models/pedido/pedido.model';
import { ProductoCarro } from '../../models/producto-carro.model';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.scss']
})
export class CarroComponent implements OnInit {

  pedido: Pedido;
  montoTotal:number=0;
  constructor(private router:Router, private authService: AuthService) {
    this.pedido = this.authService.auth.pedido;
    this.montoTotal= Pedido.getMontoTotal(this.authService.auth.pedido);

  }

  ngOnInit(): void {
  }

  navegar(){
    this.router.navigateByUrl("/ventas/pedido")
  }
  
  actualizarMonto(){
    this.montoTotal=Pedido.getMontoTotal(this.authService.auth.pedido);
  }
  

}
