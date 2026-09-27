export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: {
    url: string;
    alt: string;
  };
  rating: number;
  tags: string[];
  reviews: {
    id: string;
    username: string;
    rating: number;
    description: string;
  }[];
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('https://v2.api.noroff.dev/online-shop');

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const result = await response.json();

  return result.data;
}

export async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  const result = await response.json();

  return result.data;
}
