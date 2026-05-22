
import pb from '@/lib/pocketbaseProductionClient.js';

const isDev = import.meta.env.DEV;

const safeStringify = (value) => {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return String(value);
  }
};

export const loggerService = {
  async log(level, message, context = {}) {
    try {
      if (!message) return;

      const userId = pb.authStore.model?.id || null;

      const payload = {
        level,
        message: String(message).slice(0, 500),
        context: safeStringify(context),
        user_id: userId,
      };

      if (isDev) {
        console[level === 'error' ? 'error' : 'log'](
          `[${level.toUpperCase()}]`,
          message,
          context
        );
      }

      await pb.collection('logs').create(payload, {
        $autoCancel: false,
      });
    } catch (error) {
      if (isDev) {
        console.error('LoggerService Error:', error);
      }
    }
  },

  info(message, context = {}) {
    return loggerService.log('info', message, context);
  },

  warn(message, context = {}) {
    return loggerService.log('warn', message, context);
  },

  error(message, errorObj = null, context = {}) {
    const errorContext = {
      ...context,
      errorMessage: errorObj?.message || null,
      stack: errorObj?.stack || null,
      pathname:
        typeof window !== 'undefined'
          ? window.location.pathname
          : null,
      userAgent:
        typeof navigator !== 'undefined'
          ? navigator.userAgent
          : null,
      timestamp: new Date().toISOString(),
    };

    return loggerService.log(
      'error',
      message,
      errorContext
    );
  },

  debug(message, context = {}) {
    if (!isDev) return;

    return loggerService.log('debug', message, context);
  },

  logAuth(action, userId = null) {
    return loggerService.info(`Auth Action: ${action}`, {
      action,
      userId,
    });
  },

  async logAudit(
    action,
    resourceType,
    resourceId,
    details = {}
  ) {
    try {
      const userId = pb.authStore.model?.id;

      if (!userId) return;

      await pb.collection('audit_logs').create(
        {
          action,
          user_id: userId,
          resource_type: resourceType,
          resource_id: resourceId,
          details: safeStringify(details),
          user_agent:
            typeof navigator !== 'undefined'
              ? navigator.userAgent
              : null,
          created_at: new Date().toISOString(),
        },
        {
          $autoCancel: false,
        }
      );
    } catch (error) {
      if (isDev) {
        console.error('Audit Log Error:', error);
      }
    }
  },
};