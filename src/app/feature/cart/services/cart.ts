import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../product/models/products';
import { ToastrService } from 'ngx-toastr';

export interface CartItem {
  product: Product;
  cartQuantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private toastr: ToastrService) { }

  private loadCart(): CartItem[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  private saveCart(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items));
    this.cartItemsSubject.next(items);
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  addToCart(product: Product) {
    const currentItems = this.getCartItems();
    const existingItemIndex = currentItems.findIndex(item => item.product._id === product._id);

    if (existingItemIndex !== -1) {
      // Increase quantity directly
      currentItems[existingItemIndex].cartQuantity += 1;
      this.saveCart(currentItems);
      this.toastr.info('Quantity increased!', '', { timeOut: 2000 });
    } else {
      // Add new item
      currentItems.push({ product, cartQuantity: 1 });
      this.saveCart(currentItems);
      this.toastr.info('Medication added to cart!', '', { timeOut: 2000 });
    }
  }

  increaseQuantity(productId: string) {
    const currentItems = this.getCartItems();
    const item = currentItems.find(i => i.product._id === productId);
    if (item) {
      item.cartQuantity += 1;
      this.saveCart(currentItems);
    }
  }

  decreaseQuantity(productId: string) {
    const currentItems = this.getCartItems();
    const itemIndex = currentItems.findIndex(i => i.product._id === productId);
    if (itemIndex !== -1) {
      if (currentItems[itemIndex].cartQuantity > 1) {
        currentItems[itemIndex].cartQuantity -= 1;
      } else {
        currentItems.splice(itemIndex, 1);
      }
      this.saveCart(currentItems);
    }
  }

  removeItem(productId: string) {
    const currentItems = this.getCartItems().filter(i => i.product._id !== productId);
    this.saveCart(currentItems);
    this.toastr.error('Item removed from cart', '', { timeOut: 2000 });
  }

  clearCart() {
    this.saveCart([]);
  }
}
