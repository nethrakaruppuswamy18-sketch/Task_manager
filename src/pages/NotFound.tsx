import { Link } from 'react-router-dom';
import { Button } from '../components/Button.tsx';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-6xl font-black text-slate-200 dark:text-slate-800">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Page Not Found</h2>
        <p className="max-w-md text-slate-500 dark:text-slate-400">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
      </div>
      <Link to="/">
        <Button size="lg">Back to Home</Button>
      </Link>
    </div>
  );
}
