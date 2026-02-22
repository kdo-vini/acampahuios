export interface SponsorOption {
  id: string;
  title: string;
  amount: number;
  description: string;
  popular?: boolean;
  paymentLink?: string;
  isCustomAmount?: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
