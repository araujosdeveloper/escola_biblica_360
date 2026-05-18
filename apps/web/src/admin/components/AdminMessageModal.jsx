
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, Calendar, User } from 'lucide-react';

export default function AdminMessageModal({ isOpen, onClose, message }) {
  if (!message) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-admin-dark font-['Poppins'] border-b border-gray-100 pb-4">
            Detalhes da Mensagem
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Remetente</p>
                <p className="text-base text-gray-900 font-semibold">{message.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500 font-medium">E-mail</p>
                <a href={`mailto:${message.email}`} className="text-base text-admin-gold hover:underline">
                  {message.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Data de Envio</p>
                <p className="text-base text-gray-900">
                  {new Date(message.created).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
            <h4 className="text-sm text-gray-500 font-medium mb-1">Assunto</h4>
            <p className="text-lg font-semibold text-admin-dark mb-4">{message.subject}</p>
            
            <h4 className="text-sm text-gray-500 font-medium mb-1">Mensagem</h4>
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed text-base">
              {message.message}
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-gray-100 pt-4">
          <Button type="button" onClick={onClose} className="bg-admin-dark text-white hover:bg-admin-dark/90">
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
