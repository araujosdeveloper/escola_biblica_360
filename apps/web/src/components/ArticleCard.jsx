
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

function ArticleCard({
  image,
  category,
  title,
  summary,
  date,
  readTime,
  path,
  index = 0,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
    >
      <Link to={path} className="flex h-full flex-col">
        {/* IMAGE */}
        <div className="relative h-56 overflow-hidden bg-muted">
          <img
            src={
              image ||
              'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1600&auto=format&fit=crop'
            }
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/10 to-transparent opacity-90" />

          {/* Category */}
          {category && (
            <div className="absolute left-4 top-4">
              <Badge className="border border-white/20 bg-white/90 text-primary shadow-sm backdrop-blur-md hover:bg-white">
                {category}
              </Badge>
            </div>
          )}

          {/* Meta */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/90">
              {date && (
                <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{date}</span>
                </div>
              )}

              {readTime && (
                <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{readTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-3 line-clamp-2 font-['Poppins'] text-xl font-bold leading-snug text-card-foreground transition-colors duration-200 group-hover:text-accent">
            {title}
          </h3>

          {summary && (
            <p className="mb-6 line-clamp-3 flex-1 text-sm leading-7 text-muted-foreground">
              {summary}
            </p>
          )}

          {/* FOOTER */}
          <div className="mt-auto flex items-center justify-between border-t border-border/70 pt-5">
            <span className="text-sm font-semibold text-primary transition-colors duration-200 group-hover:text-accent">
              Ler estudo
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-300 group-hover:translate-x-1 group-hover:bg-accent group-hover:text-accent-foreground">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default ArticleCard;