
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

function ArticleCard({ image, category, title, summary, date, readTime, path, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border flex flex-col h-full"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={image || 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {category && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-accent text-accent-foreground font-semibold">{category}</Badge>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-card-foreground mb-3 font-['Poppins'] line-clamp-2 group-hover:text-accent transition-colors duration-200">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-grow">
          {summary}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date}</span>
          </div>
          {readTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{readTime}</span>
            </div>
          )}
        </div>
        <Link to={path} className="mt-auto">
          <Button variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all duration-200">
            Ler mais
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

export default ArticleCard;
