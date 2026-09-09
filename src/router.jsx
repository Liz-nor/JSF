import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WelcomePage from './pages/WelcomePage';
import { RootRoute, Route, Router } from '@tanstack/react-router';
import App from './App.jsx';
import ContactPage from './pages/ContactPage.jsx';

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

const welcomeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/welcome',
  component: WelcomePage,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  welcomeRoute,
  contactRoute,
]);

export const router = new Router({
  routeTree,
});
