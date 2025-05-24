export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  stockQuantity?: number;
  rating: number | 0;
  variants?: Variant[];
  createdAt?: string | Date;
  brand?: string;
  images?: (string | File)[];
  selectedRam?: string;
  isFavorite?: boolean;
}
export interface Variant {
  ram: string;
  price: number;
  stockQuantity?: number;
}

export interface Category {
  _id: string;
  category: string;
  subcategory: string[] | null;
}

export interface BreadcrumbItem {
  id: string;
  name: string;
  href: string;
}
