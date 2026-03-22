import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../models/products';
import { ProductsService } from '../../services/products';
import { ProductCard } from "../product-card/product-card";

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  allProducts: Product[] = [];

  private readonly ProductsService = inject(ProductsService);
  private readonly cdr = inject(ChangeDetectorRef);

  getAllProduct() {
    this.ProductsService.getProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.allProducts = res.data;
        this.cdr.detectChanges();
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
