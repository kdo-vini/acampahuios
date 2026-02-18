import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Registration } from './components/Registration';
import { Adopt } from './components/Adopt';
import { Gallery } from './components/Gallery';
import { Location } from './components/Location';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Assistant } from './components/Assistant';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Registration />
        <Adopt />
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