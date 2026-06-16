import { Link } from 'react-router-dom';

/**
 * Friendly 404 page for unknown routes.
 */
const NotFound = () => {
  return (
    <div
      className="page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '1rem',
      }}
    >
      <i
        className="fa-solid fa-compass"
        style={{ fontSize: '3.5rem', color: 'var(--color-primary)' }}
      />
      <h1 style={{ fontSize: '2.5rem' }}>Page not found</h1>
      <p style={{ color: 'var(--color-text-muted)', maxWidth: '420px' }}>
        The page you’re looking for doesn’t exist or may have moved. Let’s get you
        back to a calm place.
      </p>
      <Link to="/" className="btn btn-primary">
        <i className="fa-solid fa-house" /> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
