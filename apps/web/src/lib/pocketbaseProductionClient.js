
import PocketBase from 'pocketbase';

const POCKETBASE_URL =
  import.meta.env.VITE_POCKETBASE_URL ||
  'http://127.0.0.1:8090';

const pb = new PocketBase(POCKETBASE_URL);

/* =========================
   AUTO CANCEL
========================= */

pb.autoCancellation(false);

/* =========================
   AUTH STORE
========================= */

pb.authStore.onChange((token, model) => {
  if (import.meta.env.DEV) {
    console.log('PocketBase Auth Changed:', {
      authenticated: !!token,
      user: model?.email || null,
    });
  }
});

/* =========================
   GLOBAL BEFORE SEND
========================= */

pb.beforeSend = function (url, options) {
  return {
    url,
    options: {
      ...options,
      headers: {
        ...(options.headers || {}),
        Accept: 'application/json',
      },
    },
  };
};

/* =========================
   GLOBAL AFTER SEND
========================= */

pb.afterSend = function (response, data) {
  return data;
};

/* =========================
   HEALTH CHECK
========================= */

export async function checkPocketBaseConnection() {
  try {
    await pb.health.check();

    return {
      success: true,
    };
  } catch (error) {
    console.error('PocketBase Connection Error:', error);

    return {
      success: false,
      error,
    };
  }
}

export default pb;

export { pb };