export interface Product {
  _id: string;
  nameEn: string;
  nameAr: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  category: any[];
  brand: string;
  expiryDate?: string;
  supplier?: string;
  requiresPrescription: boolean;
  Prescription?: string;
  discount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}
