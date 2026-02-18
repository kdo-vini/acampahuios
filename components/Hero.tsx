import React from 'react';
import { Button } from './Button';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { CAMP_DATE, CAMP_LOCATION_NAME } from '../constants';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/gallery/6.jpeg"
          alt="Acampamento background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-camp-dark/70 via-camp-dark/50 to-camp-dark/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 bg-camp-primary/20 border border-camp-primary/30 rounded-full text-white text-sm font-bold mb-4 animate-fade-in uppercase">
            Inscrições Abertas 2026
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-white mb-6 leading-tight drop-shadow-xl uppercase">
            4° ACAMPA HUIOS<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-camp-primary to-camp-secondary animate-pulse-slow">
              CONTRACULTURA
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-2xl mx-auto font-light italic">
            "Diferente por essência, não por aparência."
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 text-slate-300">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Calendar className="w-5 h-5 text-camp-primary" />
              <span>{CAMP_DATE}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <MapPin className="w-5 h-5 text-camp-primary" />
              <span>{CAMP_LOCATION_NAME}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth' })}>
              Quero Participar
            </Button>
            <Button variant="outline" size="lg" className="group" onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}>
              Saiba Mais
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-camp-light to-transparent z-10"></div>
    </section>
  );
};