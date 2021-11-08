import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla/tabla.component';
import { ProductoComponent } from './producto/producto.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';



@NgModule({
  declarations: [TablaComponent,ProductoComponent,DetalleProductoComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
