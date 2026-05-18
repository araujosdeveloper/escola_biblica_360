
import React from 'react';
import { useAdminAuth } from '@/admin/context/AdminAuthContext.jsx';
import { AlertCircle } from 'lucide-react';

export default function PermissionGuard({ 
  children, 
  permission, 
  fallback = null, 
  showError = false 
}) {
  const { hasPermission, role } = useAdminAuth();

  const isAllowed = permission ? hasPermission(permission) : false;

  if (isAllowed) {
    return <>{children}</>;
  }

  if (showError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-red-600" />
        <div>
          <h4 className="text-sm font-semibold text-red-800">Acesso Negado</h4>
          <p className="text-xs text-red-600 mt-1">
            Seu nível de acesso ({role || 'Visitante'}) não permite visualizar este conteúdo.
          </p>
        </div>
      </div>
    );
  }

  return fallback ? <>{fallback}</> : null;
}
