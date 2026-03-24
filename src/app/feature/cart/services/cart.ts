import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cart {

  constructor(private http: HttpClient) {}

  addProductToCart() {
    return this.http.post("https://ecommerce.routemisr.com/api/v1/products" + "cart", {});
  }
}
function addProductToCart() {
  throw new Error('Function not implemented.');
}

