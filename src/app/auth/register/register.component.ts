import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  private layout = inject(AuthLayoutComponent, { optional: true });

  get currentLang() {
    return this.layout?.currentLang || 'en';
  }

  currentStep = 1;

  registerForm = this.fb.group({
    pharmacyName: ['', [Validators.required]],
    ownerName: ['', [Validators.required]],
    whatsapp: ['', [Validators.required]],
    landline: [''], // Optional
    email: ['', [Validators.required, Validators.email]],
    pharmacyType: ['Individual', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.currentStep < 3) {
      this.currentStep++;
      return;
    }
    if (this.registerForm.valid) {
      console.log('Register Form Value:', this.registerForm.value);
    }
  }

  onCancel() {
    if (this.currentStep > 1) {
      this.currentStep--;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
