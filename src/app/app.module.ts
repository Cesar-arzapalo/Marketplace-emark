import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ProductoComponent } from './components/producto/producto.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { TablaComponent } from './components/tabla/tabla.component';


@NgModule({
  declarations: [
    AppComponent,
    AdministracionComponent,
    ProveedorComponent,
    CatalogoComponent,
    ProductoComponent,
    DetalleProductoComponent,
    TablaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
