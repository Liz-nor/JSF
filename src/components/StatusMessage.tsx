import { Link } from '@tanstack/react-router';
import { AlertTriangle, Loader2 } from 'lucide-react';

type LoadingSpinnerProps = {
  label?: string;
};

export function LoadingSpinner({ label = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-3 py-16 text-gray-500"
    >
      <Loader2 className="w-8 h-8 animate-spin" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}

type ErrorMessageProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
  showHomeLink?: boolean;
};

export function ErrorMessage({
  title = 'Something went wrong',
  message,
  onRetry,
  showHomeLink = false,
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="max-w-md mx-auto my-12 flex flex-col items-center gap-3 text-center border border-red-200 bg-red-50 rounded-lg p-6 text-gray-800"
    >
      <AlertTriangle className="w-8 h-8 text-red-600" aria-hidden="true" />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600">{message}</p>
      <div className="flex gap-3 mt-2">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="bg-black text-white px-5 py-2 rounded-lg font-semibold transition hover:bg-gray-800 hover:cursor-pointer"
          >
            Try again
          </button>
        )}
        {showHomeLink && (
          <Link
            to="/"
            className="px-5 py-2 rounded-lg font-semibold border border-gray-300 text-gray-800 transition hover:bg-gray-100"
          >
            Back to products
          </Link>
        )}
      </div>
    </div>
  );
}
