import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla/tabla.component';
import { ProductoComponent } from './producto/producto.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { PipesModule } from '../pipes/pipes.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
		TablaComponent,
		ProductoComponent,
		DetalleProductoComponent, 
		NavbarComponent
	],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    RouterModule
  ],
  exports:[TablaComponent,ProductoComponent, NavbarComponent]
})
export class ComponentsModule { }
