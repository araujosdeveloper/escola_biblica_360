
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

function CategoryCard({ icon: Icon, title, description, path, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="h-full"
    >
      <Link to={path} className="group block h-full">
        <div className="relative h-full overflow-hidden rounded-3xl border border-border/70 bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-105">
                <Icon className="h-7 w-7" />
              </div>

              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 group-hover:bg-accent/10 group-hover:text-accent group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>

            <h3 className="mb-3 font-['Poppins'] text-xl font-bold leading-snug text-card-foreground transition-colors duration-200 group-hover:text-accent">
              {title}
            </h3>

            <p className="mb-6 flex-1 text-sm leading-7 text-muted-foreground">
              {description || 'Explore conteúdos, estudos e materiais relacionados a esta área.'}
            </p>

            <div className="mt-auto border-t border-border/70 pt-5">
              <span className="text-sm font-semibold text-primary transition-colors duration-200 group-hover:text-accent">
                Explorar categoria
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default CategoryCard;