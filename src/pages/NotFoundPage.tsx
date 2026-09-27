import { Link } from '@tanstack/react-router';

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Side Ikke Funnet</h1>
      <p>Beklager, vi fant ikke siden du lette etter.</p>
      <Link to="/">Tilbake til Hjemmesiden</Link>
    </div>
  );
}

export default NotFoundPage;
