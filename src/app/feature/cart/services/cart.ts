import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../product/models/products';
import { ToastrService } from 'ngx-toastr';

export interface CartItem {
  _id?: string;
  product: Product;
  quantity: number;
  price: number;
  hasPrescription?: boolean;
  requiresPrescription?: boolean;
}

export interface Cart {
  _id: string;
  cartItems: CartItem[];
  totalCartPrice: number;
  user: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3001/api/v1/cart';
  private orderApiUrl = 'http://localhost:3001/api/v1/orders';
  private prescriptionApiUrl = 'http://localhost:3001/api/v1/prescriptions';
  
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  
  public currentCartId: string | null = null;
  public totalCartPrice: number = 0;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.fetchCart();
  }

  fetchCart() {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (res) => {
        if (res && res.data) {
          this.currentCartId = res.data._id;
          this.totalCartPrice = res.data.totalCartPrice;
          
          const formattedItems = res.data.cartItems.map((item: any) => ({
            _id: item._id,
            product: item.product,
            quantity: item.quantity,
            price: item.price,
            hasPrescription: item.hasPrescription,
            requiresPrescription: item.requiresPrescription
          }));
          
          this.cartItemsSubject.next(formattedItems);
        }
      },
      error: (err) => {
        this.cartItemsSubject.next([]);
        this.currentCartId = null;
        this.totalCartPrice = 0;
      }
    });
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  addToCart(product: Product) {
    this.http.post<any>(this.apiUrl, { productId: product._id, quantity: 1 }).subscribe({
      next: () => {
        this.toastr.success('Item added to cart!');
        this.fetchCart();
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Failed to add item');
      }
    });
  }

  increaseQuantity(productId: string, cartItemId: string | undefined) {
    const item = this.getCartItems().find(i => i.product._id === productId);
    if (item && cartItemId) {
      this.http.put<any>(`${this.apiUrl}/${cartItemId}`, { quantity: item.quantity + 1 }).subscribe({
         next: () => this.fetchCart(),
         error: (err) => this.toastr.error(err.error?.message || 'Failed to update')
      });
    }
  }

  decreaseQuantity(productId: string, cartItemId: string | undefined) {
    const item = this.getCartItems().find(i => i.product._id === productId);
    if (item && cartItemId) {
      if (item.quantity > 1) {
        this.http.put<any>(`${this.apiUrl}/${cartItemId}`, { quantity: item.quantity - 1 }).subscribe({
           next: () => this.fetchCart(),
           error: (err) => this.toastr.error(err.error?.message || 'Failed to update')
        });
      } else {
        this.removeItem(productId, cartItemId);
      }
    }
  }

  removeItem(productId: string, cartItemId: string | undefined) {
    if (cartItemId) {
      this.http.delete<any>(`${this.apiUrl}/${cartItemId}`).subscribe({
        next: () => {
          this.toastr.error('Item removed from cart');
          this.fetchCart();
        },
        error: (err) => this.toastr.error('Failed to remove item')
      });
    }
  }

  clearCart() {
    this.http.delete<any>(this.apiUrl).subscribe({
      next: () => {
        this.toastr.info('Cart cleared');
        this.fetchCart();
      },
      error: (err) => this.toastr.error('Failed to clear cart')
    });
  }
  
  checkoutCart(shippingAddress: string = 'Placeholder Address') {
    if (!this.currentCartId) { return; }
    
    this.http.post<any>(`${this.orderApiUrl}/${this.currentCartId}`, { shippingAddress }).subscribe({
       next: () => {
         this.toastr.success('Order placed successfully! Checked Out!');
         this.fetchCart(); // This will pull the now-empty cart
       },
       error: (err) => {
         this.toastr.error(err.error?.message || 'Failed to checkout');
       }
    });
  }

  uploadPrescription(file: File, cartItemId: string) {
    const formData = new FormData();
    formData.append('file', file);

    // 1. Upload to Node ImageKit handler
    this.http.post<any>(this.prescriptionApiUrl, formData).subscribe({
      next: (uploadRes) => {
        // 2. Extract ID and link to Cart Item
        if (uploadRes.data && uploadRes.data._id) {
          const prescriptionId = uploadRes.data._id;
          
          this.http.put<any>(`${this.apiUrl}/${cartItemId}/prescription`, { prescriptionId }).subscribe({
            next: () => {
              this.toastr.success('Prescription securely attached to item!', 'Upload Success');
              this.fetchCart(); // Refresh cart memory to show green badge
            },
            error: (err) => {
              this.toastr.error(err.error?.message || 'Failed to bind prescription');
            }
          });
        }
      },
      error: (uploadErr) => {
        this.toastr.error(uploadErr.error?.message || 'Failed to upload image file');
      }
    });
  }
}
