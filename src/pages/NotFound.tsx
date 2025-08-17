import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center space-y-4 py-24">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-neutral-600 dark:text-neutral-400">Page not found.</p>
      <Link to="/" className="text-sm bg-primary-600 text-white px-3 py-2 rounded hover:bg-primary-500">Back Home</Link>
    </div>
  );
}
