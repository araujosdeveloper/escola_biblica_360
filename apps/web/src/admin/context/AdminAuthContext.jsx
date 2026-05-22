
import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseProductionClient.js';
import { hasPermission as checkPermission } from '@/utils/permissions.js';
import { loggerService } from '@/services/loggerService.js';

const AdminAuthContext = createContext();

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(pb.authStore.model);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((token, model) => {
      setCurrentAdmin(model);
    });
    
    const checkAuth = async () => {
      try {
        if (pb.authStore.isValid) {
          await pb.collection('admin_users').authRefresh({ $autoCancel: false });
          setCurrentAdmin(pb.authStore.model);
        } else {
          setCurrentAdmin(null);
        }
      } catch (err) {
        loggerService.error('Auth refresh failed:', err);
        pb.authStore.clear();
        setCurrentAdmin(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const authData = await pb.collection('admin_users').authWithPassword(email, password, {
        $autoCancel: false
      });
      
      const role = authData.record.role;
      if (!['super_admin', 'admin', 'editor', 'moderador'].includes(role)) {
        pb.authStore.clear();
        throw new Error('Acesso negado: Requer privilégios administrativos.');
      }

      await pb.collection('admin_users').update(authData.record.id, {
        last_login: new Date().toISOString(),
        login_count: (authData.record.login_count || 0) + 1
      }, { $autoCancel: false });
      
      loggerService.logAuth('login', authData.record.id);
      
      setCurrentAdmin(authData.record);
      return authData;
    } catch (err) {
      const errorMessage = err.status === 0 
        ? 'Erro ao conectar com o servidor' 
        : 'E-mail ou senha inválidos';
      setError(errorMessage);
      loggerService.warn(`Failed login attempt for ${email}`);
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    if (currentAdmin) {
      loggerService.logAuth('logout', currentAdmin.id);
    }
    pb.authStore.clear();
    setCurrentAdmin(null);
  };

  const isAuthenticated = pb.authStore.isValid;
  const role = currentAdmin?.role;
  const isAdmin = ['super_admin', 'admin', 'editor', 'moderador'].includes(role);
  
  const hasPermission = (permission) => {
    const allowed = checkPermission(role, permission);
    if (!allowed && permission) {
      loggerService.warn('Permission denied', { role, permission, userId: currentAdmin?.id });
    }
    return allowed;
  };

  return (
    <AdminAuthContext.Provider value={{
      currentAdmin,
      isAuthenticated,
      isAdmin,
      role,
      hasPermission,
      login,
      logout,
      isLoading,
      error
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
