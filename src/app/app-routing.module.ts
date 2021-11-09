import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"catalogo",  loadChildren: () => import('./pages/catalogo/catalogo.module').then( m => m.CatalogoModule)},
  {path:"administracion",  loadChildren: () => import('./pages/administracion/administracion.module').then( m => m.AdministracionModule)},
  {path:"proveedor",  loadChildren: () => import('./pages/proveedor/proveedor.module').then( m => m.ProveedorModule)},
  {path:"auth",  loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)},
  {path: "**", pathMatch:"full", redirectTo:"/catalogo"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
