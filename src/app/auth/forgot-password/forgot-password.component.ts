import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);
  private layout = inject(AuthLayoutComponent, { optional: true });

  isEmailSent = false;
  errorMessage = '';

  get currentLang() {
    return this.layout?.currentLang || 'ar'; // Default Arabic
  }

  forgotForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit() {
    if (this.forgotForm.valid) {
      this.errorMessage = '';
      const payload = this.forgotForm.value;

      this.http.post('http://localhost:3001/api/v1/users/forgotPassword', payload).subscribe({
        next: (response: any) => {
          this.isEmailSent = true;
        },
        error: (err) => {
          this.errorMessage = this.currentLang === 'ar' ? 'حدث خطأ. حاول مرة أخرى.' : 'An error occurred. Try again.';
        }
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
