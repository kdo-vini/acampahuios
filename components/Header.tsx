import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Inscrição', href: '#inscricao' },
    { name: 'Galeria', href: '#galeria' },
    { name: 'Local', href: '#local' },
    { name: 'Dúvidas', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen ? 'bg-camp-dark/95 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/gallery/Logo Huios.png"
              alt="HUIOS Logo"
              className="h-16 w-auto object-contain"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-camp-secondary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <Button
              size="sm"
              variant="outline"
              onClick={() => document.getElementById('adote')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Adote um Jovem
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-camp-dark border-t border-slate-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4">
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('adote')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Adote um Jovem
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};