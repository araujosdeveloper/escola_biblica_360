
import { useAdminAuth } from '@/admin/context/AdminAuthContext.jsx';

export function usePermission(resource) {
  const { hasPermission } = useAdminAuth();

  return {
    canRead: hasPermission(`${resource}.read`) || hasPermission(`${resource}.*`),
    canCreate: hasPermission(`${resource}.create`) || hasPermission(`${resource}.*`),
    canUpdate: hasPermission(`${resource}.update`) || hasPermission(`${resource}.*`),
    canDelete: hasPermission(`${resource}.delete`) || hasPermission(`${resource}.*`),
    hasPermission
  };
}
