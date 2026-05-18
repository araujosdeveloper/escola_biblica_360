
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function EschatologyCard({ icon: Icon, title, description, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-border hover:border-accent"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
          <Icon className="w-6 h-6 text-secondary group-hover:text-secondary-foreground transition-colors duration-300" />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-card-foreground mb-2 font-['Poppins'] group-hover:text-accent transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{description}</p>
          <div className="flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all duration-300">
            <span>Saiba mais</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default EschatologyCard;
