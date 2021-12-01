import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentaComponent } from './venta.component';
import { ComprobanteComponent } from './comprobante/comprobante.component';
const routes: Routes = [
    {
		path: '',
		component: VentaComponent
	},{
		path: "comprobante/:id", 
		component: ComprobanteComponent
	},{
		path: "**", 
		pathMatch:"full", 
		redirectTo:"/venta"
		
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentaRoutingModule { }
