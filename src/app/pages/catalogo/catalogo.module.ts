import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CatalogoComponent } from './catalogo.component';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [CatalogoComponent],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    ComponentsModule
  ]
})
export class CatalogoModule { }
