export interface Product {
  id: string;
  name: string;
  anime: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
  tags: string[];
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  searchQuery: string;
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
}
