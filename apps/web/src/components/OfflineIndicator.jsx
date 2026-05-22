
import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export default function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(() => {
    if (typeof navigator === 'undefined') return false;
    return !navigator.onLine;
  });

  const [showOnlineBanner, setShowOnlineBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setShowOnlineBanner(true);
      toast.success('Conexão restabelecida.');

      const timer = setTimeout(() => {
        setShowOnlineBanner(false);
      }, 2500);

      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowOnlineBanner(false);
      toast.error('Você está offline. Algumas funções podem não estar disponíveis.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed left-4 right-4 top-4 z-[9999] mx-auto flex max-w-xl items-center justify-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 shadow-xl"
        >
          <WifiOff className="h-5 w-5 flex-shrink-0" />
          <span>Sem conexão com a internet. Algumas funções podem não funcionar.</span>
        </motion.div>
      )}

      {!isOffline && showOnlineBanner && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed left-4 right-4 top-4 z-[9999] mx-auto flex max-w-xl items-center justify-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 shadow-xl"
        >
          <Wifi className="h-5 w-5 flex-shrink-0" />
          <span>Conexão restabelecida.</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}