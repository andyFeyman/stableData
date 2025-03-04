import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center">
      <h1 className="text-9xl font-bold text-error mb-8">404</h1>
      <h2 className="text-3xl font-semibold text-base-content mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-base text-base-content mb-8">
        The page you're looking for might be removed or is temporarily unavailable.
      </p>
      <div className="flex justify-center gap-4">
         <Link to="/" className="btn btn-primary">
           Go Back Home
        </Link>
        <a href="/chainExplorers" className="btn btn-secondary">
          Explore Chains
        </a>
      </div>
    </div>
  );
}

export default NotFoundPage;
