import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla/tabla.component';
import { ProductoComponent } from './producto/producto.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [TablaComponent,ProductoComponent,DetalleProductoComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports:[TablaComponent,ProductoComponent]
})
export class ComponentsModule { }
