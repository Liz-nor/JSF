import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { RootRoute, Route } from '@tanstack/react-router';
import App from './App';
import ContactPage from './pages/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import NotFoundPage from './pages/NotFoundPage';
import { ErrorMessage } from './components/StatusMessage';

const rootRoute = new RootRoute({
  component: App,
  // Fallback if a page crashes while rendering
  errorComponent: ({ reset }) => (
    <ErrorMessage
      message="An unexpected error occurred on this page."
      onRetry={reset}
      showHomeLink
    />
  ),
});

const contactRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const productDetailRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/product/$productId',
  component: ProductDetailPage,
});

const cartRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartPage,
});

const checkoutSuccessRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/checkoutSuccess',
  component: CheckoutSuccessPage,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  contactRoute,
  productDetailRoute,
  cartRoute,
  checkoutSuccessRoute,
  new Route({
    getParentRoute: () => rootRoute,
    path: '*',
    component: NotFoundPage,
  }),
]);
