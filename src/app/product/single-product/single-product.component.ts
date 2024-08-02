import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/shared/model/product.interface';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  prodObj!: Iproduct;
  prodId!: string;
  constructor(
    private _productService: ProductService,
    private _routes: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this._routes.params.subscribe(res => {
      if (res) {
        this.prodId = this._routes.snapshot.params['prodId'];
        this.prodObj = this._productService.getSingleProdObj(this.prodId);
      }
    })
  }


  goToEditProduct() {
    this._router.navigate(['editproduct'], {
      relativeTo: this._routes,
      queryParamsHandling: 'preserve'
    })
  }

  onRemove() {
    this._productService.onRemove(this.prodId);
  }


}
