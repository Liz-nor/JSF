import { useEffect, useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import Pagination from '../components/Pagination';
import TagsFilter from '../components/TagsFilter';
import SearchBar from '../components/SearchBar';
import { Heart, ShoppingCart } from 'lucide-react';
import { fetchProducts, type Product } from '../api/products';
import { useCartStore } from '../store/CartStore';
import { Fragment } from 'react';
import { banner } from './Banners';

const PRODUCTS_PER_PAGE = 12;

const hasDiscount = (product: Product) =>
  product.discountedPrice < product.price;

const getDiscountPercent = (product: Product) =>
  Math.round(((product.price - product.discountedPrice) / product.price) * 100);

export function Products() {
  const addItem = useCartStore((state) => state.addItem);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState('All');

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const products = await fetchProducts();

      setProducts(products);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }

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
  const [searchQuery, setSearchQuery] = useState('');
  const filteredProducts = products.filter(
    (product) =>
      (selectedTag === 'All' || product.tags.includes(selectedTag)) &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
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

  if (isLoading) {
    return <p className="text-center py-8 text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center py-8 text-red-600">Error: {error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4">
      <TagsFilter
        tags={tags}
        selectedTag={selectedTag}
        onTagChange={handleTagChange}
      />
      <SearchBar
        onSearch={(query) => {
          setCurrentPage(1);
          setSelectedTag('All');
          setSearchQuery(query);
        }}
      />
      {currentProducts.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentProducts.map((product, index) => {
            const globalIndex = startIndex + index;

            return (
              <Fragment key={product.id}>
                <li className="relative border rounded-lg bg-white shadow-sm text-gray-800 transition duration-300 overflow-hidden">
                  {hasDiscount(product) && (
                    <p className="absolute top-0 right-2 z-10 bg-green-600 text-white text-xs font-bold px-2 py-1 [clip-path:polygon(0_0,90%_0,100%_50%,90%_100%,0_100%,10%_50%)] shadow-md">
                      -{getDiscountPercent(product)}%
                    </p>
                  )}
                  <Link
                    to="/product/$productId"
                    params={{ productId: product.id }}
                    className="flex flex-col h-full"
                  >
                    <img
                      className="aspect-[3/4] w-full object-cover"
                      src={product.image.url}
                      alt={product.image.alt || product.title}
                    />
                    <div className="flex flex-col gap-1 p-2 flex-1">
                      <h3 className="font-bold text-xl text-sm line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-1">
                        {product.description}
                      </p>

                      {hasDiscount(product) ? (
                        <div className="flex flex-col items-baseline gap-2 my-4">
                          <span className="text-red-500 font-semibold text-lg">
                            kr {product.discountedPrice.toFixed(2)},-
                          </span>
                          <span className="text-gray-500 line-through text-sm">
                            kr {product.price.toFixed(2)},-
                          </span>
                        </div>
                      ) : (
                        <span className="font-semibold my-4 flex-1 text-lg">
                          kr {product.price.toFixed(2)},-
                        </span>
                      )}
                      <p
                        className="text-sm text-yellow-600"
                        aria-label={`Rating: ${product.rating} out of 5`}
                      >
                        {'★'.repeat(Math.round(product.rating))}
                        {'☆'.repeat(5 - Math.round(product.rating))}
                        <span className="ml-1 text-xs text-gray-500">
                          {product.rating}
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                  <div className="absolute top-2 left-2 z-10 flex gap-2">
                    <button
                      type="button"
                      className="bg-white rounded-full p-1.5 shadow-md cursor-pointer transition duration-300 hover:scale-110"
                      aria-label={`Add ${product.title} to wishlist`}
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        addItem({
                          id: product.id,
                          title: product.title,
                          price: product.discountedPrice,
                          image: product.image,
                        })
                      }
                      className="bg-white rounded-full p-1.5 shadow-md cursor-pointer transition duration-300 hover:scale-110"
                      aria-label={`Add ${product.title} to cart`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </li>
                {(globalIndex + 1) % 3 === 0 && (
                  <li className="relative col-span-full">
                    {(() => {
                      const currentBanner =
                        banner[Math.floor(globalIndex / 3) % banner.length];

                      return (
                        <>
                          <img
                            src={currentBanner.image}
                            alt={currentBanner.title}
                            className="w-full h-100 my-4"
                          />
                          <div className="absolute inset-0 flex flex-col justify-center items-center text-black p-4">
                            <h2
                              className={`text-2xl font-bold absolute bottom-10 left-4 p-2 mb-4 ${currentBanner.titleColor ? ` text-${currentBanner.titleColor}` : ''}`}
                            >
                              {currentBanner.title}
                            </h2>
                            <p
                              className={`text-xl absolute bottom-4 left-4 text-black font-cursive p-2 ${currentBanner.textColor ? ` text-${currentBanner.textColor}` : ''}`}
                            >
                              {currentBanner.text}
                            </p>
                          </div>
                        </>
                      );
                    })()}
                  </li>
                )}
              </Fragment>
            );
          })}
        </ul>
      ) : (
        <p className="text-center py-8 text-gray-500">No products available.</p>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default Products;
