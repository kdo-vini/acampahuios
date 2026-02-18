import React from 'react';
import { Tent, Instagram, Facebook, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-camp-dark text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Tent className="w-6 h-6 text-camp-primary" />
              <span className="text-xl font-bold font-display text-white">HUIOS</span>
            </div>
            <p className="text-sm max-w-sm mb-6">
              O acampamento de jovens da nossa igreja. Um tempo separado para sermos impactados pelo amor de Cristo.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#sobre" className="hover:text-camp-primary transition-colors">Sobre</a></li>
              <li><a href="#galeria" className="hover:text-camp-primary transition-colors">Galeria</a></li>
              <li><a href="#adote" className="hover:text-camp-primary transition-colors">Adote um Jovem</a></li>
              <li><a href="#faq" className="hover:text-camp-primary transition-colors">Dúvidas Frequentes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li>(11) 99999-9999</li>
              <li>contato@huios.com</li>
              <li>Rua da Igreja, 123</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-xs">
          <p>&copy; 2026 Acampamento HUIOS. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};