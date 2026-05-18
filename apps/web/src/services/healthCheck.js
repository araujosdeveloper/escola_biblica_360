
import { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseProductionClient.js';

export function useHealthCheck() {
  const [status, setStatus] = useState('Verificando...');
  const [latency, setLatency] = useState(0);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkHealth = async () => {
      if (!isMounted) return;
      setIsChecking(true);
      const start = performance.now();
      
      try {
        await pb.health.check({ $autoCancel: false, timeout: 30000 });
        const end = performance.now();
        const duration = Math.round(end - start);
        
        if (isMounted) {
          setLatency(duration);
          if (duration > 2000) {
            setStatus('Conexão instável');
          } else {
            setStatus('Online');
          }
        }
      } catch (error) {
        if (isMounted) {
          setStatus('Offline');
          setLatency(0);
        }
      } finally {
        if (isMounted) setIsChecking(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { status, latency, isChecking };
}
