import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ThemeSection } from './components/ThemeSection';
import { About } from './components/About';
import { Registration } from './components/Registration';
import { Adopt } from './components/Adopt';
import { SpecificDonations } from './components/SpecificDonations';
import { Gallery } from './components/Gallery';
import { Location } from './components/Location';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Assistant } from './components/Assistant';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#334155', color: '#fff', borderRadius: '12px' } }} />
      <Header />
      <main className="flex-grow">
        <Hero />
        <ThemeSection />
        <About />
        <Registration />
        <Adopt />
        <SpecificDonations />
        <Gallery />
        <Location />
        <FAQ />
      </main>
      <Footer />
      <Assistant />
    </div>
  );
}

export default App;