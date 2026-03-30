import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  _id: string;
  nameEn: string;
  nameAr: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly http = inject(HttpClient);
  
  getAllCategories(): Observable<{ data: Category[] }> {
    return this.http.get<{ data: Category[] }>('http://localhost:3001/api/v1/categories');
  }
}
