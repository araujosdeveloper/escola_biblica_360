
import React from 'react';
import { motion } from 'framer-motion';

function TeacherResourceCard({ icon: Icon, title, description, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-300 group"
    >
      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
        <Icon className="w-6 h-6 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
      </div>
      <h3 className="text-lg font-semibold text-card-foreground mb-2 font-['Poppins']">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default TeacherResourceCard;
