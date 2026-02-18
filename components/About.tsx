import React from 'react';
import { Flame, Music, Users, Coffee } from 'lucide-react';

const features = [
  {
    icon: Flame,
    title: "Espiritualidade",
    description: "Momentos profundos de oração, palavra e reencontro com Deus."
  },
  {
    icon: Music,
    title: "Louvor Intenso",
    description: "Bandas convidadas e muita música para celebrar a vida."
  },
  {
    icon: Users,
    title: "Novas Amizades",
    description: "Fortalecendo laços entre os jovens."
  },
  {
    icon: Coffee,
    title: "Lazer e Natureza",
    description: "Piscina, atividades e comida boa no Rancho Amor Infinito."
  }
];

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-20 bg-camp-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-camp-primary uppercase tracking-wider mb-2">Sobre o Evento</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-camp-dark mb-4">Uma Experiência Única</h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            O Acampamento HUIOS não é apenas um retiro, é um movimento de despertar. 
            Preparamos cada detalhe para que você tenha o melhor feriado do seu ano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 border border-slate-100"
            >
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6 text-camp-primary">
                <feature.icon className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h4>
              <p className="text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};