import { useRouteError, isRouteErrorResponse } from 'react-router';
import { Button } from './ui/button';
import { NorthStarLogo } from './NorthStarLogo';

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md text-center space-y-6">
        <NorthStarLogo className="size-8 mx-auto" />
        
        <div className="space-y-2">
          {isRouteErrorResponse(error) ? (
            <>
              <h1 className="text-4xl font-bold text-gray-900">
                {error.status}
              </h1>
              <p className="text-xl text-gray-600">
                {error.statusText || 'An error occurred'}
              </p>
              {error.data?.message && (
                <p className="text-gray-500">{error.data.message}</p>
              )}
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-gray-900">
                Oops!
              </h1>
              <p className="text-xl text-gray-600">
                Something went wrong
              </p>
              {error instanceof Error && (
                <p className="text-gray-500">{error.message}</p>
              )}
            </>
          )}
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => window.location.href = '/'}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Go to Home
          </Button>
          <Button
            onClick={() => window.location.href = '/login'}
            variant="outline"
            className="w-full"
          >
            Go to Login
          </Button>
        </div>

        <p className="text-sm text-gray-500">
          If the problem persists, please contact our support team.
        </p>
      </div>
    </div>
  );
}
