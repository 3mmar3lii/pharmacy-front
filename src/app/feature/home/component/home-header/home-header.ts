import { Component, OnInit, inject } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryService, Category } from '../../../../core/services/category.service';
import { LanguageService } from '../../../../core/services/language.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home-header',
  imports: [CarouselModule, CommonModule, RouterLink],
  templateUrl: './home-header.html',
  styleUrl: './home-header.css',
})
export class HomeHeader implements OnInit {
  protected readonly languageService = inject(LanguageService);
  private readonly categoryService = inject(CategoryService);

  categories: Category[] = [];
  
  images = [
    '/1-drugs.png',
    '/2-baby-care.png',
    '/3-man-care.png',
    '/4-woman-care.png',
    '/Gomla update .png',
    '/Home Care (1).png',
    '/Makeup & Accessories (1).png',
    '/Flashoffer.jpg',
    '/11-hair-care.png',
    '/12-skin-care.png'
  ];
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data ? [...res.data] : [];
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Failed to load categories', err)
    });
  }

  getImage(index: number) {
    return this.images[index % this.images.length];
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 50,
    navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
}
