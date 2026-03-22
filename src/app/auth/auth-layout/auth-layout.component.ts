import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {
  currentLang: 'en' | 'ar' = 'en';
  isLogin = true;
  isDropdownOpen = false;

  constructor(private renderer: Renderer2, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isLogin = event.urlAfterRedirects.includes('login') || event.urlAfterRedirects === '/';
    });
  }

  ngOnInit() {
    this.updateLanguage();
    // initial check
    this.isLogin = this.router.url.includes('login') || this.router.url === '/';
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectLanguage(lang: 'en' | 'ar') {
    this.currentLang = lang;
    this.isDropdownOpen = false;
    this.updateLanguage();
  }

  private updateLanguage() {
    this.renderer.setAttribute(document.documentElement, 'dir', this.currentLang === 'ar' ? 'rtl' : 'ltr');
    this.renderer.setAttribute(document.documentElement, 'lang', this.currentLang);
  }
}
