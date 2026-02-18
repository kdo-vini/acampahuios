import React from 'react';
import { CAMP_LOCATION_LINK, CAMP_LOCATION_NAME } from '../constants';
import { Button } from './Button';
import { MapPin, Navigation } from 'lucide-react';

export const Location: React.FC = () => {
  return (
    <section id="local" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-bold mb-6">
              <MapPin className="w-4 h-4" /> Localização
            </div>
            <h2 className="text-4xl font-bold text-camp-dark mb-6">{CAMP_LOCATION_NAME}</h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Nosso acampamento será realizado em um local privilegiado, cercado pela natureza,
              com estrutura completa de alojamentos, refeitório, piscina e salão de eventos.
              Um ambiente perfeito para se desconectar do mundo e se conectar com Deus.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-camp-primary flex-shrink-0">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Como chegar</h4>
                  <p className="text-slate-500 text-sm mt-1">
                    Acesso fácil pela rodovia. Utilize o Google Maps para traçar sua rota em tempo real.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a href={CAMP_LOCATION_LINK} target="_blank" rel="noopener noreferrer">
                <Button>
                  Abrir no Google Maps
                </Button>
              </a>
            </div>
          </div>

          <div className="h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.077278297743!2d-49.65909482394551!3d-21.54882319002272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94be6d0c418d9a7b%3A0x34f828990e5c10a0!2sRancho%20infinite%20love!5e0!3m2!1spt-BR!2sbr!4v1739841800000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title="Mapa do Rancho"
            ></iframe>

            {/* Overlay hint */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg text-xs font-semibold text-slate-600 pointer-events-none">
              Rancho Amor Infinito
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};