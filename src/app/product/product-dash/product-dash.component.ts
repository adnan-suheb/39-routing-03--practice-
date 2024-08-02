import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/shared/model/product.interface';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-product-dash',
  templateUrl: './product-dash.component.html',
  styleUrls: ['./product-dash.component.scss']
})
export class ProductDashComponent implements OnInit {

  productArr:Iproduct[]=[];
  constructor(
    private _productService:ProductService
  ) { }

  ngOnInit(): void {
    this.productArr = this._productService.fetchAllProducts()
  }

}
