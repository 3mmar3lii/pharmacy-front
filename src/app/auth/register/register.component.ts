import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
  private http = inject(HttpClient);

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
      const formValue = this.registerForm.value;
      
      this.http.post('http://localhost:3001/api/v1/users/signup', formValue, { withCredentials: true }).subscribe({
        next: (response: any) => {
          console.log('Register success:', response);
          if (response.token) {
            document.cookie = `token=${response.token}; path=/; max-age=2592000; SameSite=Lax`;
          }
          this.router.navigate(['/']); // or somewhere else upon success
        },
        error: (err) => {
          console.error('Registration failed', err);
        }
      });
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
