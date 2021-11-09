import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla/tabla.component';
import { ProductoComponent } from './producto/producto.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
		TablaComponent,
		ProductoComponent,
		DetalleProductoComponent, 
		NavbarComponent
	],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
		TablaComponent,
		NavbarComponent
	]
})
export class ComponentsModule { }
