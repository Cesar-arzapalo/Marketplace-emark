import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"auth", loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )},
  {path:"ventas",  loadChildren: () => import('./ventas/ventas.module').then( m => m.VentasModule)},
  {path: "**", pathMatch:"full", redirectTo:"/ventas/catalogo"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
