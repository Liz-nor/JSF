import { Link } from '@tanstack/react-router';

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page not found</h1>
      <p>Sorry, we couldn't find the page you were looking for.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default NotFoundPage;
