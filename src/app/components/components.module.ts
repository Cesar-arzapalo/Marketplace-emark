import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla/tabla.component';
import { ProductoComponent } from './producto/producto.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PipesModule } from '../pipes/pipes.module';
import {RouterModule} from '@angular/router';
import { TablaCaracteristicasComponent } from './tabla-caracteristicas/tabla-caracteristicas.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComentarioComponent } from './comentario/comentario.component';
import { CarroComponent } from './carro/carro.component';
import { ProductoCarroComponent } from './producto-carro/producto-carro.component';
import { BarraComponent } from './barra/barra.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
		TablaComponent,
		ProductoComponent,
		DetalleProductoComponent, 
		NavbarComponent, 
    TablaCaracteristicasComponent,
    ComentarioComponent,
    CarroComponent,
    ProductoCarroComponent,
    BarraComponent
	],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
    RouterModule,
    FlexLayoutModule
  ],
  exports:[TablaComponent,ProductoComponent, NavbarComponent, BarraComponent]
})
export class ComponentsModule { }
