
import React from 'react';
import { FolderOpen } from 'lucide-react';

export function EmptyState({ icon: Icon = FolderOpen, title = 'Nenhum resultado encontrado', message = 'Não há itens para exibir no momento.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-card rounded-2xl border border-border shadow-sm">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-semibold text-card-foreground mb-2 font-['Poppins']">{title}</h3>
      <p className="text-muted-foreground max-w-md">{message}</p>
    </div>
  );
}
