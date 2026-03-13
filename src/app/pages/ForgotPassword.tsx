import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      toast.success('Password reset link sent!');
    } catch (error) {
      toast.error('Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-amber-50 via-background to-orange-50">
      <Card className="w-full max-w-md p-8 shadow-2xl border-border rounded-[2.5rem] bg-card/95 backdrop-blur-sm">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg ring-1 ring-border">
            <img src="/logo.jpeg" alt="Light House Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        {!isSubmitted ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Forgot Password?</h1>
              <p className="text-slate-500">
                Enter your email and we'll send you a reset link
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1.5 bg-input-background"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending link...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Check your email</h2>
            <p className="text-slate-500 mb-8">
              We've sent a password reset link to <span className="font-semibold text-slate-900">{email}</span>.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsSubmitted(false)}
            >
              Didn't receive it? Try again
            </Button>
          </div>
        )}

        <div className="mt-8 text-center border-t border-border pt-6">
          <Link to="/login" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Link>
        </div>
      </Card>
    </div>
  );
}
