
import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export default function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      toast.success('Conexão restabelecida!');
    };
    
    const handleOffline = () => {
      setIsOffline(true);
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
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-destructive text-destructive-foreground p-2 flex items-center justify-center gap-2 text-sm font-medium shadow-md"
        >
          <WifiOff className="w-4 h-4" />
          <span>Sem conexão com a internet. Trabalhando em modo offline.</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
