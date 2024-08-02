import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../shared/component/home/home.component';
import { PageNotFoundComponent } from '../shared/component/page-not-found/page-not-found.component';
import { UserDashComponent } from '../users/user-dash/user-dash.component';
import { ProductDashComponent } from '../product/product-dash/product-dash.component';
import { UserFormComponent } from '../users/user-form/user-form.component';
import { SingleUserComponent } from '../users/single-user/single-user.component';
import { ProductFormComponent } from '../product/product-form/product-form.component';
import { SingleProductComponent } from '../product/single-product/single-product.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'users',
    component: UserDashComponent,
    children: [

      {
        path: 'addUser',
        component: UserFormComponent
      },
      {
        path: ':userId',
        component: SingleUserComponent
      },
      {
        path: ':userId/editUser',
        component: UserFormComponent
      },
    ]
  },
  {
    path: 'products',
    component: ProductDashComponent,
    children: [
      {
        path: 'addProduct',
        component: ProductFormComponent
      },
      {
        path: ':prodId',
        component: SingleProductComponent
      },
      {
        path: ':prodId/editproduct',
        component: ProductFormComponent
      },
    ]
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
