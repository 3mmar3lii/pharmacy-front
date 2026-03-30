import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/products';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../cart/services/cart';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: Product;
  private readonly cartService = inject(CartService);
  protected readonly languageService = inject(LanguageService);

  get isLoggedIn(): boolean {
    return document.cookie.includes('token=');
  }

  get localizedName(): string {
    return this.languageService.currentLang() === 'ar' ? this.product?.nameAr : this.product?.nameEn;
  }

  get imageUrl(): string {
    if (!this.product?.image) return '/image.png';
    return this.product.image.startsWith('http') ? this.product.image : `http://localhost:3001/uploads/medicines/${this.product.image}`;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
