import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { login } from '../../lib/auth';
import { Building2, AlertCircle } from 'lucide-react';

export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = login(email, password);
      
      if (user) {
        navigate('/dashboard/main');
      } else {
        setError('Invalid credentials. Try: admin@acmecorp.com / password');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <div className="size-12 rounded-xl bg-blue-600 flex items-center justify-center">
            <Building2 className="size-7 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">Analytics Platform</CardTitle>
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
              placeholder="admin@acmecorp.com"
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

          <div className="text-sm text-muted-foreground">
            <p className="mb-2">Demo accounts:</p>
            <ul className="space-y-1 text-xs">
              <li>• Admin: admin@acmecorp.com</li>
              <li>• Analyst: analyst@acmecorp.com</li>
              <li>• Viewer: viewer@acmecorp.com</li>
              <li className="mt-1">Password: <span className="font-mono">password</span></li>
            </ul>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-2">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password?
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
