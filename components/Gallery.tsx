import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../constants';
import { Maximize2, X } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="galeria" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-camp-primary uppercase tracking-wider mb-2">Nosso Espaço</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-camp-dark">Rancho Amor Infinito</h3>
          <p className="text-slate-500 mt-4">Um pedaço do céu na terra preparado para nós.</p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {GALLERY_IMAGES.map((img) => (
            <div 
              key={img.id} 
              className="relative group overflow-hidden rounded-xl break-inside-avoid cursor-pointer"
              onClick={() => setSelectedImage(img.url)}
            >
              <img 
                src={img.url} 
                alt={img.alt} 
                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Maximize2 className="text-white w-8 h-8 drop-shadow-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full">
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Zoom" 
            className="max-w-full max-h-[90vh] rounded shadow-2xl"
          />
        </div>
      )}
    </section>
  );
};