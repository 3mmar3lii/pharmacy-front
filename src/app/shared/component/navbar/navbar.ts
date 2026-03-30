import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ProductsService } from '../../../feature/product/services/products';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../feature/cart/services/cart';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  allItems: any[] = [];
  filteredItems: any[] = [];

  private _filteration: string = '';

  currentLanguage: string = 'EN';
  dir: 'ltr' | 'rtl' = 'ltr';

  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  totalItems$ = this.cartService.cartItems$.pipe(
    map((items) => items.reduce((acc, item) => acc + item.cartQuantity, 0)),
  );

  constructor() { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.productsService.getProducts().subscribe((res) => {
      this.allItems = res.data;
      this.filteredItems = [];
    });
  }

  get filteration(): string {
    return this._filteration;
  }

  set filteration(value: string) {
    this._filteration = value;
    this.filteredItems = this.filterItems(value);
  }

  filterItems(search: string): any[] {
    const value = search?.toLowerCase() || '';
    if (!value) return [];
    return this.allItems.filter((item) => item.title.toLowerCase().startsWith(value));
  }
  closeDropdown() {
    this.filteredItems = [];
    this.filteration = '';
  }
  switchLanguage(language: string) {
    this.currentLanguage = language;
    this.dir = language === 'AR' ? 'rtl' : 'ltr';
    console.log('Switched to', language, 'Direction:', this.dir);
  }

  onMyAccountClick() {
    // Assuming no token/session exists for the user currently
    const hasAccount = false;

    if (hasAccount) {
      this.router.navigate(['/profile']);
    } else {
      Swal.fire({
        title: this.currentLanguage === 'EN' ? 'No Account Found' : 'لا يوجد حساب',
        text: this.currentLanguage === 'EN' ? 'You don\'t have an account. Create now?' : 'ليس لديك حساب. هل تود إنشاء حساب الآن؟',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#111f59',
        cancelButtonColor: '#dc3545',
        confirmButtonText: this.currentLanguage === 'EN' ? 'Yes' : 'نعم',
        cancelButtonText: this.currentLanguage === 'EN' ? 'No' : 'لا'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
