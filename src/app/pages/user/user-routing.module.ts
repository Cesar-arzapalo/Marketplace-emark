import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user.component';
const routes: Routes = [
  {
		path: '',
		component: UserComponent,
		children: [
			{
				path: 'profile',
				component: ProfileComponent,
			},
			{
				path: 'products',
				component: ProductComponent,
			},
			{
				path: "**", 
				pathMatch:"full", 
				redirectTo:"profile"
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
