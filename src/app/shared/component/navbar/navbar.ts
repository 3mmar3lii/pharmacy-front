import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../../feature/product/services/products';
import { CommonModule } from '@angular/common';

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

  constructor(private productsService: ProductsService) {}

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
    return this.allItems.filter(item => item.title.toLowerCase().startsWith(value));
  }
  closeDropdown() {
    this.filteredItems = [];
    this.filteration = '';
  }
  switchLanguage(language: string) {
    this.currentLanguage = language;
    console.log('Switched to', language);
  }
}