import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { Lock, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { api } from '../lib/api';
import { toast } from 'sonner';

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token || !email) {
      toast.error('Invalid or missing password reset token!');
      navigate('/login');
    }
  }, [token, email, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    if (password.length < 8) {
      return toast.error('Password must be at least 8 characters');
    }
    
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { email, token, newPassword: password });
      setSuccess(true);
      toast.success('Password reset successfully!');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid or expired token.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <Link to="/login" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to login
        </Link>
        <h2 className="text-center text-4xl font-extrabold text-slate-900 tracking-tight">
          Create new password
        </h2>
        <p className="mt-3 text-center text-slate-500 max-w-sm mx-auto">
          Your new password must be different from previously used passwords.
        </p>
      </motion.div>

      <motion.div 
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, type: 'spring' }}
      >
        <div className="bg-white py-10 px-6 sm:px-12 shadow-2xl shadow-slate-200/50 rounded-3xl border border-slate-100">
          {success ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="text-center py-4"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Password Reset!</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Your password has been successfully reset. Redirecting you to login...
              </p>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-6 border border-transparent rounded-xl shadow-lg shadow-primary/20 text-base font-bold text-white bg-primary hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="animate-spin w-5 h-5" />
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
