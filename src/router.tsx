import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { RootRoute, Route, Router } from '@tanstack/react-router';
import App from './App';
import ContactPage from './pages/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';

const rootRoute = new RootRoute({
  component: App,
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
]);

export const router = new Router({
  routeTree,
});
