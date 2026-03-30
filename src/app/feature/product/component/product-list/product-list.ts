import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../models/products';
import { ProductsService } from '../../services/products';
import { ProductCard } from "../product-card/product-card";
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})

  // product list component to display all products data in product card component
export class ProductList implements OnInit {
  allProducts: Product[] = [];
  displayedProducts: Product[] = [];

  private readonly ProductsService = inject(ProductsService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly route = inject(ActivatedRoute);

  getAllProduct() {
    this.ProductsService.getProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
        this.applyFilter();
      },
      error: (err) => console.log(err),
    });
  }

  applyFilter() {
    this.route.queryParams.subscribe(params => {
      const categoryId = params['category'];
      if (categoryId && this.allProducts.length) {
        this.displayedProducts = this.allProducts.filter(p => 
          p.category && p.category.some((c: any) => c === categoryId || c?._id === categoryId)
        );
      } else {
        this.displayedProducts = [...this.allProducts];
      }
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnInit(): void {
    this.getAllProduct();
  }
}
