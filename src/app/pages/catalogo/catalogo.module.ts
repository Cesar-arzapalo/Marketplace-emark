import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CatalogoComponent } from './catalogo.component';
import { ComponentsModule } from '../../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CatalogoComponent],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class CatalogoModule { }
