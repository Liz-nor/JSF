import { useEffect, useState } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import type { Product } from '../api/products';
import { fetchProduct, fetchProducts } from '../api/products';
import { useCartStore } from '../store/CartStore';

function ProductDetailPage() {
  const { productId } = useParams({ strict: false });
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!productId) return;

    const loadProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        setProduct(await fetchProduct(productId));
      } catch (err) {
        if (err instanceof Error) {
          setError(`Im sorry, there was an error: ${err.message}`);
        }
        console.error('Failed to fetch product:', err);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProduct();
  }, [productId]);

  useEffect(() => {
    if (!justAdded) return;
    const timer = setTimeout(() => setJustAdded(false), 2000);
    return () => clearTimeout(timer);
  }, [justAdded]);

  useEffect(() => {
    if (!product) return;

    const getSimilarProducts = async () => {
      const products = await fetchProducts();

      const similar = products.filter(
        (item: Product) =>
          item.id !== product.id &&
          item.tags.some((tag) => product.tags.includes(tag)),
      );

      setSimilarProducts(similar);
    };

    getSimilarProducts();
  }, [product]);

  if (isLoading) {
    return <p className="text-center py-8 text-gray-500">Loading product...</p>;
  }

  if (error) {
    return <p className="text-center py-8 text-red-600">{error}</p>;
  }

  if (!product) {
    return <p className="text-center py-8 text-gray-500">Product not found.</p>;
  }

  const hasDiscount = product.discountedPrice < product.price;
  const discountPercent = Math.round(
    ((product.price - product.discountedPrice) / product.price) * 100,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-10 text-gray-800">
      <Link
        to="/"
        className="self-start text-sm text-gray-600 hover:text-black transition"
      >
        &larr; Back to products
      </Link>

      <article className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative rounded-lg overflow-hidden border shadow-sm bg-white">
          {hasDiscount && (
            <p className="absolute top-0 right-2 z-10 bg-green-600 text-white text-sm font-bold px-3 py-1 [clip-path:polygon(0_0,90%_0,100%_50%,90%_100%,0_100%,10%_50%)] shadow-md">
              -{discountPercent}%
            </p>
          )}
          <img
            className="w-full aspect-[3/4] object-cover"
            src={product.image.url}
            alt={product.image.alt || product.title}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-left text-3xl md:text-4xl">{product.title}</h2>
          <p className="text-sm text-yellow-600">
            {'★'.repeat(Math.round(product.rating))}
            {'☆'.repeat(5 - Math.round(product.rating))}
            <span className="ml-2 text-gray-500">
              {product.rating} / 5 ({product.reviews.length} reviews)
            </span>
          </p>

          {hasDiscount ? (
            <div className="flex items-baseline gap-3">
              <span className="text-red-500 font-semibold text-2xl">
                kr {product.discountedPrice.toFixed(2)},-
              </span>
              <span className="text-gray-500 line-through">
                kr {product.price.toFixed(2)},-
              </span>
            </div>
          ) : (
            <span className="font-semibold text-2xl">
              kr {product.price.toFixed(2)},-
            </span>
          )}

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <button
            type="button"
            aria-label="Add to cart"
            className={`mt-2 w-full sm:w-auto sm:self-start text-white px-8 py-3 rounded-lg font-semibold transition hover:cursor-pointer ${justAdded ? 'bg-green-600' : 'bg-black hover:bg-gray-800'}`}
            onClick={() => {
              addItem({
                id: product.id,
                title: product.title,
                price: product.discountedPrice,
                image: product.image,
              });
              setJustAdded(true);
            }}
          >
            {justAdded ? 'Added to cart ✓' : 'Add to Cart'}
          </button>
          <span className="sr-only" aria-live="polite">
            {justAdded ? `${product.title} added to cart` : ''}
          </span>
        </div>
      </article>

      <section className="flex flex-col gap-4">
        <h2 className="text-left">Reviews</h2>
        {product.reviews.length > 0 ? (
          <ul className="flex flex-col gap-3 m-0">
            {product.reviews.map((review) => (
              <li
                key={review.id}
                className="block m-0 border rounded-lg bg-white p-4 shadow-sm"
              >
                <p className="text-sm text-yellow-600 mb-1">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </p>
                <p className="text-gray-700">{review.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </section>

      {similarProducts.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-left">Maybe You Also Like</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 m-0">
            {similarProducts.map((item) => (
              <li
                key={item.id}
                className="block m-0 border rounded-lg bg-white shadow-sm overflow-hidden transition hover:shadow-md"
              >
                <Link
                  to="/product/$productId"
                  params={{ productId: item.id }}
                  className="flex flex-col h-full m-0"
                >
                  <img
                    className="aspect-[3/4] w-full object-cover"
                    src={item.image.url}
                    alt={item.image.alt || item.title}
                  />
                  <div className="p-2 flex flex-col gap-1">
                    <h3 className="font-bold text-sm line-clamp-1">
                      {item.title}
                    </h3>
                    {item.discountedPrice < item.price ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-red-500 font-semibold">
                          kr {item.discountedPrice.toFixed(2)},-
                        </span>
                        <span className="text-gray-500 line-through text-xs">
                          kr {item.price.toFixed(2)},-
                        </span>
                      </div>
                    ) : (
                      <span className="font-semibold">
                        kr {item.price.toFixed(2)},-
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default ProductDetailPage;
