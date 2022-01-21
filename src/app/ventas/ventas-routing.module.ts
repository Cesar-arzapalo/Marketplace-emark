import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from './ventas.component';

const routes: Routes = [
  {path: "",
    component: VentasComponent,
    children:[
      {path:"catalogo",  loadChildren: () => import('../pages/catalogo/catalogo.module').then( m => m.CatalogoModule)},
      {path:"administracion",  loadChildren: () => import('../pages/administracion/administracion.module').then( m => m.AdministracionModule)},
      {path:"proveedor",  loadChildren: () => import('../pages/proveedor/proveedor.module').then( m => m.ProveedorModule)},
      {path:"user",  loadChildren: () => import('../pages/user/user.module').then( m => m.UserModule)},
      {path:"pedido",  loadChildren: () => import('../pages/venta/venta.module').then( m => m.VentaModule)},
      {path: "**", pathMatch:"full", redirectTo:"/ventas/catalogo"}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }