import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from './Button';
import { CreditCard, Lock } from 'lucide-react';

interface CreditCardFormProps {
  amount: number;
  onSuccess: () => void;
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
}

export const CreditCardForm: React.FC<CreditCardFormProps> = ({ 
  amount, 
  onSuccess, 
  isProcessing, 
  setIsProcessing 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    // Em uma aplicação real, você faria uma chamada ao seu backend aqui
    // para criar um PaymentIntent e obter o client_secret.
    // Exemplo: const { clientSecret } = await fetch('/api/create-payment-intent')...

    // Simulando o tempo de processamento da rede
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Aqui usamos o Stripe para criar um método de pagamento
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)!,
    });

    if (stripeError) {
      setError(stripeError.message || 'Ocorreu um erro ao processar o cartão.');
      setIsProcessing(false);
    } else {
      console.log('[Pagamento Simulado] Sucesso!', paymentMethod);
      // Aqui você enviaria o paymentMethod.id para seu backend confirmar o pagamento
      onSuccess();
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: "#334155", // slate-700
        fontFamily: 'Inter, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#94a3b8" // slate-400
        }
      },
      invalid: {
        color: "#ef4444", // red-500
        iconColor: "#ef4444"
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 animate-fade-in-up">
      <div className="mb-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Dados do Cartão
        </label>
        <div className="p-3 bg-white border border-slate-300 rounded-lg focus-within:ring-2 focus-within:ring-camp-primary focus-within:border-transparent transition-all">
          <CardElement options={cardStyle} />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
          <div className="w-1 h-4 bg-red-500 rounded-full"></div>
          {error}
        </div>
      )}

      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-6">
        <Lock className="w-3 h-3" />
        Pagamento processado de forma segura pelo Stripe
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        size="lg"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? 'Processando...' : `Pagar R$ ${amount.toFixed(2).replace('.', ',')}`}
      </Button>
    </form>
  );
};