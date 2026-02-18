import { SponsorOption, GalleryImage, FaqItem } from './types';

export const CAMP_NAME = "Acampamento HUIOS 2026";
export const CAMP_DATE = "18 a 21 de Abril de 2026";
export const CAMP_LOCATION_NAME = "Rancho Amor Infinito";
export const CAMP_LOCATION_LINK = "https://www.google.com/maps/place/Rancho+infinite+love/@-21.5488232,-49.6568453,16z/data=!4m6!3m5!1s0x94be6d0c418d9a7b:0x34f828990e5c10a0!8m2!3d-21.5488232!4d-49.6568453!16s%2Fg%2F11gbkyxjtg";
export const REGISTRATION_FEE = 250.00;

// PIX Configuration
export const PIX_KEY = "24a79c6a-6e67-4e92-ae44-45dbd43961c3";
export const PIX_MERCHANT_NAME = "VINICIUS GARCIA NASCIMENTO";
export const PIX_MERCHANT_CITY = "SAO PAULO";

// Google Sheets Integration
// URL do script Google Apps Script
export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxUkaXnYxNqQFDiQUzqSjSTsj97Daf95mSF6qJibohCFx4IGdMKGXvuQq5QnX4UmC1W/exec ";

// Stripe Configuration (Use sua chave pública de teste aqui)
export const STRIPE_PUBLIC_KEY = "pk_test_TYooMQauvdEDq54NiTphI7jx";

export const SPONSOR_OPTIONS: SponsorOption[] = [
  {
    id: 'partial',
    title: 'Apoio Parcial',
    amount: 50.00,
    description: 'Ajude a custear a alimentação de um jovem por um dia.',
  },
  {
    id: 'half',
    title: 'Meia Bolsa',
    amount: 125.00,
    description: 'Cubra 50% do valor da inscrição.',
    popular: true,
  },
  {
    id: 'full',
    title: 'Bolsa Completa',
    amount: 250.00,
    description: 'Adote um jovem integralmente! Transforme uma vida.',
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: '1', url: 'https://picsum.photos/800/600?random=1', alt: 'Momentos de louvor' },
  { id: '2', url: 'https://picsum.photos/800/800?random=2', alt: 'Atividades ao ar livre' },
  { id: '3', url: 'https://picsum.photos/600/800?random=3', alt: 'Fogueira à noite' },
  { id: '4', url: 'https://picsum.photos/800/500?random=4', alt: 'Refeitório e comunhão' },
  { id: '5', url: 'https://picsum.photos/700/700?random=5', alt: 'Dinâmicas em grupo' },
  { id: '6', url: 'https://picsum.photos/800/600?random=6', alt: 'Rancho Amor Infinito - Vista aérea' },
];

export const FAQS: FaqItem[] = [
  {
    question: "O que devo levar?",
    answer: "Traga roupa de cama, itens de higiene pessoal, roupas confortáveis para atividades físicas, Bíblia e caderno para anotações."
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