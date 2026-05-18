
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

function CategoryCard({ icon: Icon, title, description, path, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={path}>
        <div className="group bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border h-full flex flex-col">
          <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
            <Icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
          </div>
          <h3 className="text-xl font-semibold text-card-foreground mb-2 font-['Poppins']">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">{description}</p>
          <div className="flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all duration-300">
            <span>Explorar</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default CategoryCard;
