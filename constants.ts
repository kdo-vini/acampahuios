import { SponsorOption, GalleryImage, FaqItem } from './types';

export const CAMP_NAME = "4° Acampamento HUIOS 2026 - CONTRACULTURA";
export const CAMP_DATE = "18 a 21 de Abril de 2026";
export const CAMP_LOCATION_NAME = "Rancho Amor Infinito";
export const CAMP_LOCATION_LINK = "https://www.google.com/maps/place/Rancho+infinite+love/@-21.5488232,-49.6568453,16z/data=!4m6!3m5!1s0x94be6d0c418d9a7b:0x34f828990e5c10a0!8m2!3d-21.5488232!4d-49.6568453!16s%2Fg%2F11gbkyxjtg";
export const REGISTRATION_FEE = 250.00;

// PIX Configuration
export const PIX_KEY = "24a79c6a-6e67-4e92-ae44-45dbd43961c3";
export const PIX_MERCHANT_NAME = "VINICIUS GARCIA NASCIMENTO";
export const PIX_MERCHANT_CITY = "SAO PAULO";

// Google Sheets Integration
export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx5nWdH6ou6bYG5iIC3BOzvhHgRVKHmdMi4iu33wWLC-PwZuajpbiyNdX4OPE_glDIR/exec";

// Links de Pagamento (InfinitePay)
export const REGISTRATION_PAYMENT_LINK = "https://link.infinitepay.io/technesistemas/VC1DLTAtUg-3eM55I626T-250,00";

export const SPONSOR_OPTIONS: SponsorOption[] = [
  {
    id: 'partial',
    title: 'Apoio Parcial',
    amount: 50.00,
    description: 'Ajude a custear a alimentação de um jovem por um dia.',
    paymentLink: 'https://pay.infinitepay.io/technesistemas/VC1D-7IiiqcTV5x-50,00',
  },
  {
    id: 'half',
    title: 'Meia Bolsa',
    amount: 125.00,
    description: 'Cubra 50% do valor da inscrição.',
    popular: true,
    paymentLink: 'https://pay.infinitepay.io/technesistemas/VC1D-oIkOn7Q5J-125,00',
  },
  {
    id: 'full',
    title: 'Bolsa Completa',
    amount: 250.00,
    description: 'Adote um jovem integralmente! Transforme uma vida.',
    paymentLink: 'https://link.infinitepay.io/technesistemas/VC1DLTAtUg-3eM55I626T-250,00',
  },
];

export const SPECIFIC_DONATIONS: SponsorOption[] = [
  { id: 'transporte', title: 'Transporte para o evento', amount: 500.00, description: 'Ajude a custear o ônibus que levará os jovens até o Rancho.' },
  { id: 'refrigerante', title: 'Fardos de refrigerante', amount: 300.00, description: 'Contribua com as bebidas para as refeições e festas.' },
  { id: 'aluguel', title: 'Ajudar no aluguel do espaço', amount: 300.00, description: 'Ajude a pagar a locação do Rancho Amor Infinito.' },
  { id: 'carnes-1', title: 'Alimentação (carnes) dia 01', amount: 300.00, description: 'Contribua com as carnes para as refeições do primeiro dia.' },
  { id: 'carnes-2', title: 'Alimentação (carnes) dia 02', amount: 300.00, description: 'Contribua com as carnes para as refeições do segundo dia.' },
  { id: 'carnes-3', title: 'Alimentação (carnes) dia 03', amount: 300.00, description: 'Contribua com as carnes para as refeições do terceiro dia.' },
  { id: 'festas', title: 'Festas do acampamento', amount: 500.00, description: 'Ajude a custear as festas e programações.' },
  { id: 'decoracao', title: 'Decoração do evento', amount: 600.00, description: 'Contribua com os itens de decoração dos ambientes.' },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: '1', url: '/gallery/1.jpeg', alt: 'Momentos de louvor' },
  { id: '2', url: '/gallery/2.jpeg', alt: 'Atividades ao ar livre' },
  { id: '3', url: '/gallery/3.jpeg', alt: 'Fogueira à noite' },
  { id: '4', url: '/gallery/4.jpeg', alt: 'Refeitório e comunhão' },
  { id: '5', url: '/gallery/5.jpeg', alt: 'Dinâmicas em grupo' },
  { id: '6', url: '/gallery/6.jpeg', alt: 'Rancho Amor Infinito - Vista aérea' },
  { id: '7', url: '/gallery/7.jpeg', alt: 'Conexão e Espiritualidade' },
];

export const FAQS: FaqItem[] = [
  {
    question: "O que devo levar?",
    answer: "É necessário levar: Roupa de cama (lençol, travesseiro, cobertores, etc.), itens de higiene pessoal (sabonete, shampoo, escova de dente, etc.), roupas confortáveis para atividades físicas, Bíblia e caderno para anotações."
  },
  {
    question: "Como chegar ao Rancho?",
    answer: "O Rancho Amor Infinito fica localizado próximo à rodovia principal. Teremos um ônibus saindo da igreja às 19h na sexta-feira."
  },
  {
    question: "Qual a idade mínima?",
    answer: "O acampamento é voltado para jovens a partir de 13 anos."
  }
];