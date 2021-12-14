import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from '@auth0/auth0-angular';
import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
		ComponentsModule,
		AuthModule.forRoot({
      domain: 'aptir.auth0.com',
      clientId: 'vT3PBjnZFRcgh3Ri5gHETKSQdOVxdaS9'
    }),
    ComponentsModule,
    HttpClientModule,
    PipesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
