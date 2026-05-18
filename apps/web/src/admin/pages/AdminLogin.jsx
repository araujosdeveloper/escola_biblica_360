
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { login, error: contextError } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    if (!email || !password) {
      setLocalError('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    
    try {
      await login(email, password);
      setSuccess(true);
      setEmail('');
      setPassword('');
      
      // Smooth transition before redirect
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (error) {
      // Error is handled by context and local catch
      setLoading(false);
    }
  };

  const displayError = localError || contextError;

  return (
    <div className="min-h-screen bg-admin-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-admin-dark rounded-2xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-10 h-10 text-admin-gold" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-admin-dark font-['Poppins']">
          Escola Bíblica 360
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Painel de Administração
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl sm:rounded-xl sm:px-10 border border-admin-border">
          
          {displayError && !success && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 transition-all">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 font-medium">{displayError}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 transition-all">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-600 font-medium">Login realizado com sucesso. Redirecionando...</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-900">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-gray-900 bg-white focus-visible:ring-2 focus-visible:ring-admin-gold focus-visible:border-transparent outline-none transition-all"
                placeholder="admin@escolabiblica360.com"
                disabled={loading || success}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-900">Senha</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-gray-900 bg-white focus-visible:ring-2 focus-visible:ring-admin-gold focus-visible:border-transparent outline-none transition-all"
                disabled={loading || success}
              />
            </div>

            <Button
              type="submit"
              disabled={loading || success}
              className="w-full bg-admin-dark hover:bg-admin-dark/90 text-white font-medium py-2.5 text-base transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar no Sistema'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
