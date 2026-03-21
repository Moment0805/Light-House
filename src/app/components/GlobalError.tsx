import { useRouteError, isRouteErrorResponse, Link } from 'react-router';
import { Button } from './ui/button';
import { AlertTriangle } from 'lucide-react';

export function GlobalError() {
  const error = useRouteError();
  console.error("Global routing error caught: ", error);

  let errorMessage = "An unexpected error occurred. Please try again.";
  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = "We encountered a technical issue while displaying this page. Our team has been notified.";
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
          Oops! Something went wrong
        </h1>
        <p className="text-slate-500 mb-6 bg-slate-50 p-3 rounded-lg text-sm border border-slate-100 truncate">
          {errorMessage}
        </p>
        <div className="flex flex-col gap-3">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white rounded-full h-12"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
          <Link to="/">
            <Button variant="outline" className="w-full rounded-full h-12 border-slate-200">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
