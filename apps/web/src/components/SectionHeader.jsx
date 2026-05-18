
import React from 'react';

function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground m-0 leading-tight">
          {title}
        </h2>
      </div>
      <p className="text-lg text-muted-foreground max-w-3xl">
        {description}
      </p>
      <div className="h-px w-full bg-gradient-to-r from-border to-transparent mt-6"></div>
    </div>
  );
}

export default SectionHeader;
