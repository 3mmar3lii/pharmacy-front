import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private layout = inject(AuthLayoutComponent, { optional: true });

  token: string | null = null;
  errorMessage = '';

  get currentLang() {
    return this.layout?.currentLang || 'ar'; // Default Arabic
  }

  resetForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordConfirm: ['', [Validators.required]]
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    console.log("--- SUBMIT TRIGGERED ---");
    console.log("Token:", this.token);
    console.log("Password:", this.resetForm.value.password);
    console.log("Confirm Password:", this.resetForm.value.passwordConfirm);

    if (!this.token) {
      this.errorMessage = this.currentLang === 'ar' ? 'الرابط غير صالح' : 'Invalid token';
      console.warn("Failed: No Token");
      return;
    }

    if (this.resetForm.value.password !== this.resetForm.value.passwordConfirm) {
      this.errorMessage = this.currentLang === 'ar' ? 'كلمات السر غير متطابقة' : 'Passwords do not match';
      console.warn("Failed: Passwords mismatch");
      return;
    }

    if (this.resetForm.valid) {
      this.errorMessage = '';
      const payload = { password: this.resetForm.value.password };
      console.log("Sending PATCH request to backend...", payload);

      this.http.patch(`http://localhost:3001/api/v1/users/resetPassword/${this.token}`, payload).subscribe({
        next: (response: any) => {
          console.log("✅ Success! Server replied:", response);
          if (response.token) {
            document.cookie = `token=${response.token}; path=/; max-age=2592000; SameSite=Lax`;
          }
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error("❌ HTTP PATCH FAILED:", err);
          this.errorMessage = err.error?.message || (this.currentLang === 'ar' ? 'حدث خطأ. استجابة الخادم فشلت.' : 'An error occurred. Server request failed.');
        }
      });
    } else {
      console.warn("Failed: Form is not valid");
    }
  }
}
