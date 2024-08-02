import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Iproduct } from 'src/app/shared/model/product.interface';
import { ProductService } from 'src/app/shared/service/product.service';
import { UuidService } from 'src/app/shared/service/uuid.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm!: FormGroup;
  ratingArray: number[] = [1, 2, 3, 4, 5];
  storageArr: string[] = ['16GB', '64GB', '128GB', '256GB', '512GB'];
  screenSizeArr: string[] = ['4.0', '4.2', '4.5', '4.7', '4.8', '5.0', '5.1', '5.2', '5.5', '5.6', '5.7', '5.8', '6.0', '6.1', '6.2', '6.3', '6.4', '6.5', '6.7', '6.8', '7.0', '7.1', '7.2'];
  isInEditMode: boolean = false;
  prodId!: string;
  prodObj!: Iproduct;
  canReturn!: string;
  constructor(
    private _routes: ActivatedRoute,
    private _productService: ProductService,
    private _uuid: UuidService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.manageProdIdParam();
    this.manageQueryParams()
  }

  createForm() {
    this.productForm = new FormGroup({
      brand: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      model: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      rating: new FormControl(null, [Validators.required]),
      storage: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      screen_size: new FormControl(null, [Validators.required]),
      processor: new FormControl(null, [Validators.required]),
      battery_capacity: new FormControl(null, [Validators.required]),
      canReturn: new FormControl(null, [Validators.required])
    })


  }

  manageProdIdParam() {
    this.prodId = this._routes.snapshot.params['prodId']
    if (this.prodId) {
      this.isInEditMode = true;
      this.prodObj = this._productService.getSingleProdObj(this.prodId)
      this.productForm.patchValue(this.prodObj)
      console.log(this.prodObj);
    }
    else {
      this.isInEditMode = false;
    }
  }
  manageQueryParams() {
    this.canReturn = this._routes.snapshot.queryParams['canReturn'];
    if (this.canReturn === '0') {
      this.productForm.disable();
    }
    else {
      this.productForm.enable();
    }
  }

  get control() {
    return this.productForm.controls
  }

  onFormSubmit() {
    if (this.productForm.valid) {
      let newProduct = { ...this.productForm.getRawValue(), prodId: this._uuid.uuid() };
      this._productService.addProd(newProduct)
    }

  }

  onProdUpdate() {
    let updatedObj = { ...this.productForm.getRawValue(), prodId: this.prodId };
    this._productService.updateProd(updatedObj)
  }

  onCancel() {
    this._router.navigate(['products'])

  }


}
