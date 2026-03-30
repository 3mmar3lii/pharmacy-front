import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../services/cart';
import { inject } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: 'cart.component.html',
    styleUrl: 'cart.component.css'
})
export class CartComponent implements OnInit {
    cartItems: CartItem[] = [];
    protected readonly languageService = inject(LanguageService);

    constructor(private cartService: CartService) { }

    ngOnInit() {
        this.cartService.cartItems$.subscribe(items => {
            this.cartItems = items;
        });
    }

    get totalItems(): number {
        return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    }

    get totalPrice(): number {
        return this.cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    }

    increaseQuantity(productId: string, cartItemId?: string) {
        this.cartService.increaseQuantity(productId, cartItemId);
    }

    decreaseQuantity(productId: string, cartItemId?: string) {
        this.cartService.decreaseQuantity(productId, cartItemId);
    }

    removeItem(productId: string, cartItemId?: string) {
        this.cartService.removeItem(productId, cartItemId);
    }

    clearCart() {
        this.cartService.clearCart();
    }
    
    checkoutCart() {
        this.cartService.checkoutCart('Cairo, Egypt'); // Standardized fallback for now
    }

    triggerFileInput(itemId: string | undefined) {
        if (!itemId) return;
        const inputElement = document.getElementById(`upload-prescription-${itemId}`) as HTMLInputElement;
        if (inputElement) {
            inputElement.click();
        }
    }

    onFileSelected(event: any, itemId: string | undefined) {
        if (!itemId) return;
        const file: File = event.target.files[0];
        if (file) {
            this.cartService.uploadPrescription(file, itemId);
            // Reset input so user can re-trigger if needed
            event.target.value = null;
        }
    }
}
