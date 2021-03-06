import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
		UserRoutingModule,
		ComponentsModule,
		ReactiveFormsModule
  ]
})
export class UserModule { }
