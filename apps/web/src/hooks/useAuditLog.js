
import { useCallback } from 'react';
import pb from '@/lib/pocketbaseProductionClient.js';

export function useAuditLog() {
  const logAction = useCallback(async ({ action, resourceType, resourceId, details }) => {
    try {
      if (!pb.authStore.isValid) return;

      const logData = {
        action,
        user_id: pb.authStore.model.id,
        resource_type: resourceType || '',
        resource_id: resourceId || '',
        details: details || {},
        user_agent: navigator.userAgent
      };

      await pb.collection('audit_logs').create(logData, { $autoCancel: false });
    } catch (error) {
    }
  }, []);

  return { logAction };
}
