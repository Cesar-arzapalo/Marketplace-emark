import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasComponent } from './ventas.component';
import { ComponentsModule } from '../components/components.module';
import { VentasRoutingModule } from './ventas-routing.module';



@NgModule({
  declarations: [
    VentasComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    ComponentsModule
  ]
})
export class VentasModule { }
