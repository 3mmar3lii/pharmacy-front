import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
@Input() layout!: string;
currentLang: 'en' | 'ar' = 'ar';

  toggleLang() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
  }
}
