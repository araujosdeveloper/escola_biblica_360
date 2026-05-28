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
        <div className="relative h-full overflow-hidden rounded-[28px] border border-border/70 bg-white p-7 shadow-lg shadow-[#0f2f45]/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/45 hover:shadow-2xl hover:shadow-[#0f2f45]/12">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.16),transparent_34%),linear-gradient(135deg,rgba(15,47,69,0.05),transparent_55%)]" />

          <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[#d4af37]/10 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:bg-[#d4af37]/16" />

          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-7 flex items-center justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#b38d22] shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-[#d4af37] group-hover:text-[#07131f]">
                <Icon className="h-8 w-8" />
              </div>

              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-[#0f2f45]/5 text-[#0f2f45] transition-all duration-300 group-hover:translate-x-1 group-hover:border-[#d4af37]/40 group-hover:bg-[#d4af37]/10 group-hover:text-[#b38d22]">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>

            <div className="mb-4 h-px w-16 bg-gradient-to-r from-[#d4af37] to-transparent" />

            <h3 className="mb-3 font-['Poppins'] text-xl font-extrabold leading-snug text-[#0f2f45] transition-colors duration-200 group-hover:text-[#b38d22]">
              {title}
            </h3>

            <p className="mb-7 flex-1 text-sm leading-7 text-muted-foreground">
              {description || 'Explore conteúdos, estudos e materiais relacionados a esta área.'}
            </p>

            <div className="mt-auto border-t border-border/70 pt-5">
              <span className="inline-flex items-center gap-2 text-sm font-extrabold text-[#0f2f45] transition-colors duration-200 group-hover:text-[#b38d22]">
                Explorar categoria
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default CategoryCard;