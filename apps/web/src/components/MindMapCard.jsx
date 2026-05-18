
import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

function MindMapCard({ image, title, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border"
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold transition-all duration-200 active:scale-[0.98]">
            <Download className="w-4 h-4 mr-2" />
            Baixar
          </Button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-card-foreground font-['Poppins'] text-center">{title}</h3>
      </div>
    </motion.div>
  );
}

export default MindMapCard;
