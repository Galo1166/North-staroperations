import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { useAuth } from '../../lib/AuthContext';
import { AlertCircle, Home } from 'lucide-react';
import { NorthStarLogo } from '../NorthStarLogo';

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard/main');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid credentials. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <Link to="/" className="flex items-center justify-center mb-4 hover:opacity-80 transition-opacity">
          <NorthStarLogo className="h-14" />
        </Link>
        <CardTitle className="text-2xl text-center">North Star Operations</CardTitle>
        <CardDescription className="text-center">
          Sign in to access your operations dashboard
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@north-staroperations.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Sign in with your organization credentials
          </p>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password?
          </Button>
          <Link to="/" className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-blue-600 transition-colors">
            <Home className="size-4" />
            Back to Home
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
