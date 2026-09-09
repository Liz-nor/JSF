import { useState, useEffect, useMemo } from 'react';
import Pagination from '../components/Pagination';
import TagsFilter from '../components/SearchBar';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: object;
  rating: number;
  tags: string[];
  reviews: {
    id: string;
    content: string;
    rating: number;
    description: string;
  }[];
}
const PRODUCTS_PER_PAGE = 10;

export function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState('All');

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://v2.api.noroff.dev/online-shop', {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Im sorry, there was an error: ${response.statusText}`);
      }

      const result = await response.json();
      setProducts(result.data);
    } catch (err: any) {
      setError(err.message);
      console.error('Failed to fetch products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tags = useMemo(
    () => ['All', ...new Set(products.flatMap((product) => product.tags))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    if (selectedTag === 'All') {
      return products;
    }
    return products.filter((product) => product.tags.includes(selectedTag));
  }, [products, selectedTag]);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  return (
    <div className=" gap-4">
      <h2 className="bold">Products</h2>
      <TagsFilter
        tags={tags}
        selectedTag={selectedTag}
        onTagChange={handleTagChange}
      />
      {currentProducts.length > 0 ? (
        <ul className="product-list">
          {currentProducts.map((product) => (
            <li className="product-item" key={product.id}>
              <h3>{product.title}</h3>
              <p className="product-description">{product.description}</p>
              {product.discountedPrice < product.price ? (
                <div>
                  <span className="originalPrice">
                    Original Price:${product.price}
                  </span>
                  <span>Discounted Price: ${product.discountedPrice}</span>
                </div>
              ) : (
                <span>Price: ${product.price}</span>
              )}
              <img src={(product.image as any).url} alt={product.title} />
              <p>Rating: {product.rating}</p>
              <p>Tags: {product.tags.join(', ')}</p>
              <p>
                Reviews:{' '}
                {product.reviews.map((review) => review.content).join(', ')}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available.</p>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Products;
