import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  // Quick reference to parent layout to access current lang
  private layout = inject(AuthLayoutComponent, { optional: true });

  get currentLang() {
    return this.layout?.currentLang || 'ar'; // Default Arabic
  }

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      
      const payload = {
        email: formValue.username, // map username to email for backend
        password: formValue.password
      };

      this.http.post('http://localhost:3001/api/v1/users/login', payload, { withCredentials: true }).subscribe({
        next: (response: any) => {
          console.log('Login success:', response);
          if (response.token) {
            document.cookie = `token=${response.token}; path=/; max-age=2592000; SameSite=Lax`;
          }
          this.router.navigate(['/home']); // or somewhere else upon success
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
    }
  }
}
