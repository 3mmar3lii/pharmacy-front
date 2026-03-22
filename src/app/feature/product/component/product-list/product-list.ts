import { Component, inject } from '@angular/core';
import { Product } from '../../models/products';
import { ProductsService } from '../../services/products';
import { ProductCard } from "../product-card/product-card";

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  allProducts: Product[] = [];

  private readonly ProductsService = inject(ProductsService);

  getAllProduct() {
    this.ProductsService.getProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.allProducts = res.data;
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getAllProduct();
  }
}
