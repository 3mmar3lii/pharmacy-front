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

  // product list component to display all products data in product card component
export class ProductList implements OnInit {
  allProducts: Product[] = [];

  // inject products service to get products data from backend api
  private readonly ProductsService = inject(ProductsService);

  // inject change detector ref to detect changes after getting products data
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  // get all products data from backend api and assign it to allProducts variable
  getAllProduct() {
    this.ProductsService.getProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.allProducts = res.data;
        this.changeDetectorRef.detectChanges();
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  // call getAllProduct method on component initialization to get products data and display it in product card component
  ngOnInit(): void {
    this.getAllProduct();
  }
}
