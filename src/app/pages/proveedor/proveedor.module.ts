import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedorRoutingModule } from './proveedor-routing.module';
import { ProveedorComponent } from './proveedor.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [ProveedorComponent],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
    ComponentsModule
  ]
})
export class ProveedorModule { }
