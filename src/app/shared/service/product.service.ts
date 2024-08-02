import { Injectable } from '@angular/core';
import { Iproduct } from '../model/product.interface';
import { mobileProducts } from '../model/products.const';
import { Router } from '@angular/router';
import { SnackBarService } from './snack-bar.service';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productArr: Iproduct[] = mobileProducts;



  constructor(
    private _router: Router,
    private _snackbar: SnackBarService,
    private _dialog: DialogService
  ) { }

  fetchAllProducts(): Iproduct[] {
    return this.productArr
  }


  getSingleProdObj(id: string) {
    return this.productArr.find(user => user.prodId === id) as Iproduct;
  }

  addProd(data: Iproduct) {
    this.productArr.push(data)
    this._router.navigate(['/products']);
    this._snackbar.openSnackbar(`New user ${data.model} added successfully!!!`)
  }

  updateProd(data: Iproduct) {
    let index = this.productArr.findIndex(user => user.prodId === data.prodId)
    this.productArr[index] = data;
    this._snackbar.openSnackbar(`${data.model} updated successfully!!!`);
    this._router.navigate(['/products'])
  }

  onRemove(prodId: string) {
    let index = this.productArr.findIndex(user => user.prodId === prodId);
    let obj = this.productArr[index];
    this._dialog.openDialog("Confirmation",
      `Are you sure you want to remove ${obj.model}?`
    ).subscribe(res => {
      if (res) {
        this.productArr.splice(index, 1);
        this._snackbar.openSnackbar(`${obj.model} removed successfully!!!`);
        this._router.navigate(['/products'])
      }

    })

  }
}
