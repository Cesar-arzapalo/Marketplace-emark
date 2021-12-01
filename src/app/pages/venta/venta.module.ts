import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtapaVentaModule } from '../../components/etapa-venta/etapa-venta.module';
import { VentaComponent } from '../../pages/venta/venta.component';
import { PipesModule } from '../../pipes/pipes.module';
import { VentaRoutingModule } from './venta-routing.module';
import { ComprobanteComponent } from './comprobante/comprobante.component';



@NgModule({
  declarations: [
    VentaComponent,
    ComprobanteComponent
  ],
  imports: [
    CommonModule,
    EtapaVentaModule,
    PipesModule,
    VentaRoutingModule
  ]
})
export class VentaModule { }
