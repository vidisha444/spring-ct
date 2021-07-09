import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as productsList from 'src/assets/json/products.json';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  qtyToBuy?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  validUserDetails = {
    username: 'admin',
    password: 'P@ssw0rd'
  };

  categoryArr = [
    'Clothing',
    'Appliances',
    'Healthy Food',
    'Essentials'
  ];

  loggedIn = false;
  public products: Product[] = [];
  public basket: Product[] = [];

  constructor(
    private snackBar: MatSnackBar
  ) {
    this.products = productsList.productList;
    this.products.forEach(t => t.qtyToBuy = 0);
  }

  successMsg(msg: string): void {
    this.snackBar.open(msg, 'OK', { duration: 3000 });
  }

  public getBasketSize(): number {
    const arr = this.basket.map(t => t.qtyToBuy);
    return arr.length > 0 ? arr.reduce((a, b) => a + b) : 0;
  }

}
