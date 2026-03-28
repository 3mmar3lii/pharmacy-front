import { Component, Input, inject } from '@angular/core';
import { Product } from '../../models/products';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../cart/services/cart';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: Product;
  private readonly cartService = inject(CartService);

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
