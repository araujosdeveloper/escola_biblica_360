
import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs.jsx';

export default function TitleSection({ title, description, customBreadcrumbTitle, children }) {
  return (
    <section className="relative bg-primary py-12 md:py-16 overflow-hidden shadow-sm">
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen" 
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      ></div>
      <div className="container relative z-10">
        <Breadcrumbs customTitle={customBreadcrumbTitle || title} />
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-4 font-['Poppins']">
          {title}
        </h1>
        
        {description && (
          <p className="text-muted text-lg max-w-3xl leading-relaxed mb-6">
            {description}
          </p>
        )}
        
        {children}
      </div>
    </section>
  );
}
