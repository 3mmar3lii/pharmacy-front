import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products';
import { Product } from '../../models/products';
import { CartService } from '../../../cart/services/cart';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})

export class ProductDetails implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly cartService = inject(CartService);

  productID!: string | null;
  productDetails: Product = {} as Product;
  chageDetectorRef: any;

  protected readonly languageService = inject(LanguageService);

  get localizedName(): string {
    return this.languageService.currentLang() === 'ar' ? this.productDetails?.nameAr : this.productDetails?.nameEn;
  }

  get imageUrl(): string {
    if (!this.productDetails?.image) return '/image.png';
    return this.productDetails.image.startsWith('http') ? this.productDetails.image : `http://localhost:3001/uploads/medicines/${this.productDetails.image}`;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

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
    if (!id) return;
    this.productsService.getProductDetails(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.productDetails = res.data;
        this.changeDetectorRef.detectChanges(); // force UI update mapping
      },
    });
  }
}
