import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: 'cart.component.html',
    styleUrl: 'cart.component.css'
})
export class CartComponent implements OnInit {
    cartItems: CartItem[] = [];

    constructor(private cartService: CartService) { }

    ngOnInit() {
        this.cartService.cartItems$.subscribe(items => {
            this.cartItems = items;
        });
    }

    get totalItems() {
        return this.cartItems.reduce((acc, item) => acc + item.cartQuantity, 0);
    }

    get totalPrice() {
        return this.cartItems.reduce((acc, item) => acc + (item.product.price * item.cartQuantity), 0);
    }

    increaseQuantity(productId: string) {
        this.cartService.increaseQuantity(productId);
    }

    decreaseQuantity(productId: string) {
        this.cartService.decreaseQuantity(productId);
    }

    removeItem(productId: string) {
        this.cartService.removeItem(productId);
    }

    clearCart() {
        this.cartService.clearCart();
    }
}
