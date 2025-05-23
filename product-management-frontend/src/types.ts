export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  images?: string[];
  selectedRam?: string;
  rating: number;
  description?: string;
  isFavorite: boolean;
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
