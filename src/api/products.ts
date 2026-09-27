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

const API_URL = 'https://v2.api.noroff.dev/online-shop';

export class ApiError extends Error {
  status: number | null;

  constructor(message: string, status: number | null = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function messageForStatus(status: number): string {
  if (status === 404) return 'We could not find what you were looking for.';
  if (status >= 500) return 'Our server is having trouble right now. Please try again in a moment.';
  return 'Something went wrong while loading data. Please try again.';
}

async function request<T>(url: string, signal?: AbortSignal): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url, { signal });
  } catch (err) {
    // Let aborts through untouched so callers can ignore them
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    throw new ApiError(
      'Could not connect to the server. Please check your internet connection.',
    );
  }

  if (!response.ok) {
    throw new ApiError(messageForStatus(response.status), response.status);
  }

  const result = await response.json();

  return result.data;
}

export function isAbortError(err: unknown): boolean {
  return err instanceof DOMException && err.name === 'AbortError';
}

export function getErrorMessage(err: unknown): string {
  if (err instanceof ApiError) return err.message;
  return 'Something unexpected went wrong. Please try again.';
}

export function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  return request<Product[]>(API_URL, signal);
}

export function fetchProduct(id: string, signal?: AbortSignal): Promise<Product> {
  return request<Product>(`${API_URL}/${id}`, signal);
}
