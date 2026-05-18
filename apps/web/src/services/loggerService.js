
import pb from '@/lib/pocketbaseProductionClient.js';

export const loggerService = {
  log: async (level, message, context = {}) => {
    try {
      const userId = pb.authStore.model?.id || null;
      await pb.collection('logs').create({
        level,
        message,
        context,
        user_id: userId
      }, { $autoCancel: false });
    } catch (error) {
      // Silent fail to prevent infinite loops during logging
    }
  },

  info: (message, context) => loggerService.log('info', message, context),
  warn: (message, context) => loggerService.log('warn', message, context),
  error: (message, errorObj, context = {}) => {
    const errorContext = {
      ...context,
      errorMessage: errorObj?.message,
      stack: errorObj?.stack,
      url: window.location.href
    };
    loggerService.log('error', message, errorContext);
  },
  debug: (message, context) => {
    if (import.meta.env.DEV) {
      loggerService.log('debug', message, context);
    }
  },

  logAuth: (action, userId) => {
    loggerService.info(`User ${action}`, { action, userId });
  },

  logAudit: async (action, resourceType, resourceId, details) => {
    try {
      const userId = pb.authStore.model?.id;
      if (!userId) return;

      await pb.collection('audit_logs').create({
        action,
        user_id: userId,
        resource_type: resourceType,
        resource_id: resourceId,
        details,
        ip_address: 'client-side',
        user_agent: navigator.userAgent
      }, { $autoCancel: false });
    } catch (e) {
      // Silent fail
    }
  }
};
