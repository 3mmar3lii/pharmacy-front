import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products';
import { Product } from '../../models/products';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
  
export class ProductDetails {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

  productID!: string | null;
  productDetails: Product = {} as Product;

  getproductID() {
    // get the id from url (1)
    this.activatedRoute.paramMap.subscribe({
      next: (urlData) => {
        console.log(urlData.get('id'));
        this.productID = urlData.get('id');
      },
      error: (err) => {
        console.log(err);
      },
    });

    // get the id from url (2)
    // console.log(this.activatedRoute.snapshot.params['id']);
  }

  getproductDetails(id: string | null) {
    this.productsService.getProductDetails(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.productDetails = res.data;
      },
    });
  }

  ngOnInit(): void {
    this.getproductID();
    this.getproductDetails(this.productID);
  }
}
