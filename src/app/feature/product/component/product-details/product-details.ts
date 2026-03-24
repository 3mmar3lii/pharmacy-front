import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products';
import { Product } from '../../models/products';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})

export class ProductDetails implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly changeDetectorRef= inject(ChangeDetectorRef);

  productID!: string | null;
  productDetails: Product = {} as Product;
  cdr: any;

  ngOnInit(): void {
    // get the id from url asynchronously, then fetch product data
    this.activatedRoute.paramMap.subscribe({
      next: (urlData) => {
        this.productID = urlData.get('id');
        this.getproductDetails(this.productID);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getproductDetails(id: string | null) {
    this.productsService.getProductDetails(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.productDetails = res.data;
        this.changeDetectorRef.detectChanges(); // force UI update mapping
      },
    });
  }
}
