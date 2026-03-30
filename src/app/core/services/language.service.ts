import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // Global reactive state via Signals
  currentLang = signal<'ar' | 'en'>('ar');
  dir = signal<'rtl' | 'ltr'>('rtl');

  constructor() {
    // Keep preference sticky between sessions
    const saved = localStorage.getItem('app-lang') as 'ar' | 'en';
    if (saved === 'en' || saved === 'ar') {
      this.currentLang.set(saved);
      this.dir.set(saved === 'ar' ? 'rtl' : 'ltr');
    }
  }

  setLanguage(lang: 'ar' | 'en') {
    this.currentLang.set(lang);
    this.dir.set(lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('app-lang', lang);
  }
}
