
import React from 'react';

export default function StepCard({ step, title, description, reference }) {
  return (
    <div className="relative pl-8 md:pl-12">
      <div className="absolute left-0 top-0 w-8 h-8 md:w-10 md:h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm md:text-base border-4 border-background -translate-x-1/2">
        {step}
      </div>
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h4 className="text-lg font-bold text-foreground mb-2 font-['Poppins']">{title}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>
        {reference && (
          <div className="bg-muted rounded-xl p-4 text-sm font-mono text-muted-foreground border border-border/50">
            {reference}
          </div>
        )}
      </div>
    </div>
  );
}
