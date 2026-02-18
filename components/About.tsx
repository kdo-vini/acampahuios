import React from 'react';
import { Shield, UserCheck, Zap, Heart } from 'lucide-react';

const ConfrontoIcon = Zap;

const features = [
  {
    icon: Shield,
    title: "Desconstrução",
    description: "Identificar as mentiras sutis que o sistema inseriu em nossa rotina e desconstruir padrões do mundo."
  },
  {
    icon: UserCheck,
    title: "Identidade HUIOS",
    description: "Assumir a maturidade de filhos que conhecem a voz do Pai e vivem sua verdadeira essência."
  },
  {
    icon: ConfrontoIcon,
    title: "Confronto de Valores",
    description: "Amor vs. Interesse | Verdade vs. Conveniência | Eternidade vs. Momento."
  },
  {
    icon: Heart,
    title: "Metanoia",
    description: "Uma mudança de mente profunda que nos leva a manifestar o Reino em todo lugar."
  }
];

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-camp-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-camp-primary uppercase tracking-wider mb-2">Tema 2026</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-camp-dark mb-8">CONTRACULTURA</h3>

          <div className="max-w-3xl mx-auto text-left space-y-6 text-slate-600 text-lg leading-relaxed">
            <p className="font-semibold text-camp-dark text-xl text-center italic mb-8">
              "Diferente por essência, não por aparência."
            </p>
            <p>
              Vivemos em uma era de moldes. O Sistema dita o que devemos sentir, como devemos consumir e quem devemos ser para sermos aceitos. Ele foca na superfície, no "feed" e na aprovação momentânea. Mas, para os filhos de Deus, o chamado é outro.
            </p>
            <p>
              No <strong>4° ACAMPA HUIOS 2026</strong>, vamos mergulhar no confronto mais antigo da humanidade: a resistência do Reino contra a cultura do mundo. Ser contracultura não é sobre usar roupas diferentes ou seguir tendências alternativas; é sobre ter uma mente renovada que não se dobra aos padrões deste século.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <h4 className="text-2xl font-bold text-camp-dark mb-10 text-center">O que nos espera?</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 border border-slate-100 flex flex-col h-full"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-camp-primary">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h4>
                <p className="text-slate-500 leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 p-8 md:p-12 bg-camp-dark rounded-[2.5rem] text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-camp-primary/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <p className="text-xl md:text-2xl font-light mb-0">
              Este não é apenas um acampamento. Viveremos dias incríveis para quem decidiu que não vai apenas "sobreviver" à cultura, mas sim <strong>manifestar o Reino de Deus</strong> nela.
            </p>
            <p className="mt-6 text-camp-primary font-bold text-xl uppercase tracking-widest">
              Prepare-se para ser transformado de dentro para fora.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};