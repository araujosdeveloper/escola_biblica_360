import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
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
      className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border/70 bg-white shadow-lg shadow-[#0f2f45]/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/45 hover:shadow-2xl hover:shadow-[#0f2f45]/12"
    >
      <Link to={path} className="flex h-full flex-col">
        <div className="relative h-58 min-h-56 overflow-hidden bg-[#08131f]">
          <img
            src={
              image ||
              'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1600&auto=format&fit=crop'
            }
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#050b12]/92 via-[#0f2f45]/28 to-transparent" />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.18),transparent_34%)]" />

          {category && (
            <div className="absolute left-4 top-4">
              <Badge className="rounded-full border border-[#d4af37]/40 bg-[#07131f]/75 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f6d66b] shadow-lg backdrop-blur-md hover:bg-[#07131f]/80">
                {category}
              </Badge>
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/90">
              {date && (
                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                  <Calendar className="h-3.5 w-3.5 text-[#f6d66b]" />
                  <span>{date}</span>
                </div>
              )}

              {readTime && (
                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                  <Clock className="h-3.5 w-3.5 text-[#f6d66b]" />
                  <span>{readTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 h-px w-16 bg-gradient-to-r from-[#d4af37] to-transparent" />

          <h3 className="mb-3 line-clamp-2 font-['Poppins'] text-xl font-extrabold leading-snug text-[#0f2f45] transition-colors duration-200 group-hover:text-[#b38d22]">
            {title}
          </h3>

          {summary && (
            <p className="mb-6 line-clamp-3 flex-1 text-sm leading-7 text-muted-foreground">
              {summary}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between border-t border-border/70 pt-5">
            <span className="text-sm font-extrabold text-[#0f2f45] transition-colors duration-200 group-hover:text-[#b38d22]">
              Ler estudo
            </span>

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#b38d22] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#d4af37] group-hover:text-[#07131f]">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default ArticleCard;