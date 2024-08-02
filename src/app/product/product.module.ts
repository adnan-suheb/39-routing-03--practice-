import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDashComponent } from './product-dash/product-dash.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from '../routing/routing-routing.module';



@NgModule({
  declarations: [
    ProductDashComponent,
    ProductFormComponent,
    SingleProductComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  exports:[ProductDashComponent]
})
export class ProductModule { }
