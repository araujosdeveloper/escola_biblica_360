
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  EDITOR: 'editor',
  MODERADOR: 'moderador'
};

export const PERMISSIONS = {
  POSTS_CREATE: 'posts.create',
  POSTS_READ: 'posts.read',
  POSTS_UPDATE: 'posts.update',
  POSTS_DELETE: 'posts.delete',
  
  CATEGORIES_ALL: 'categories.*',
  DOWNLOADS_ALL: 'downloads.*',
  MEDIA_ALL: 'media.*',
  
  USERS_ALL: 'users.*',
  SETTINGS_ALL: 'settings.*',
  AUDIT_READ: 'audit.read',
  
  MESSAGES_READ: 'messages.read',
  MESSAGES_MANAGE: 'messages.manage',
  NEWSLETTER_MANAGE: 'newsletter.manage'
};

const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: ['*'],
  [ROLES.ADMIN]: [
    PERMISSIONS.POSTS_CREATE, PERMISSIONS.POSTS_READ, PERMISSIONS.POSTS_UPDATE, PERMISSIONS.POSTS_DELETE,
    PERMISSIONS.CATEGORIES_ALL, PERMISSIONS.DOWNLOADS_ALL, PERMISSIONS.MEDIA_ALL,
    PERMISSIONS.USERS_ALL, PERMISSIONS.SETTINGS_ALL, PERMISSIONS.AUDIT_READ, 
    PERMISSIONS.MESSAGES_READ, PERMISSIONS.MESSAGES_MANAGE, PERMISSIONS.NEWSLETTER_MANAGE
  ],
  [ROLES.EDITOR]: [
    PERMISSIONS.POSTS_CREATE, PERMISSIONS.POSTS_READ, PERMISSIONS.POSTS_UPDATE,
    PERMISSIONS.CATEGORIES_ALL, PERMISSIONS.DOWNLOADS_ALL, PERMISSIONS.MEDIA_ALL,
    PERMISSIONS.MESSAGES_READ, PERMISSIONS.NEWSLETTER_MANAGE
  ],
  [ROLES.MODERADOR]: [
    PERMISSIONS.POSTS_READ, PERMISSIONS.MESSAGES_READ, PERMISSIONS.MESSAGES_MANAGE
  ]
};

export const hasPermission = (role, permission) => {
  if (!role) return false;
  const rolePerms = ROLE_PERMISSIONS[role] || [];
  if (rolePerms.includes('*')) return true;
  
  return rolePerms.some(p => {
    if (p === permission) return true;
    if (p.endsWith('.*')) {
      const prefix = p.replace('.*', '');
      return permission.startsWith(prefix);
    }
    return false;
  });
};
