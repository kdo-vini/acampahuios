import React, { useState } from 'react';
import QRCode from 'qrcode';
import { SPECIFIC_DONATIONS, PIX_MERCHANT_NAME } from '../constants';
import { Button } from './Button';
import { Heart, CheckCircle2, X, Copy, Check, AlertCircle, QrCode, CreditCard, Gift } from 'lucide-react';
import { generatePixPayload } from '../services/pixService';
import toast from 'react-hot-toast';
import { SponsorOption } from '../types';

export const SpecificDonations: React.FC = () => {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [activePaymentLink, setActivePaymentLink] = useState<string | undefined>(undefined);
    const [showModal, setShowModal] = useState(false);
    const [paymentStep, setPaymentStep] = useState<'method-choice' | 'form' | 'processing' | 'success'>('method-choice');
    const [customAmounts, setCustomAmounts] = useState<Record<string, string>>({});

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    // State for PIX
    const [pixPayload, setPixPayload] = useState<string>('');
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const handleCustomAmountChange = (id: string, value: string) => {
        setCustomAmounts(prev => ({ ...prev, [id]: value }));
    };

    const handleDonate = (option: SponsorOption) => {
        let amountToDonate = option.amount;
        if (option.isCustomAmount) {
            const val = parseFloat(customAmounts[option.id]);
            if (!val || val <= 0) {
                toast.error("Por favor, insira um valor válido para a oferta.");
                return;
            }
            amountToDonate = val;
        }

        setSelectedAmount(amountToDonate);
        setActivePaymentLink(option.paymentLink);
        setPaymentStep('method-choice');
        setShowModal(true);
        setCopied(false);
        // Reset form
        setName('');
        setEmail('');
        setIsAnonymous(false);
    };

    const handleAnonymousChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsAnonymous(checked);
        if (checked) {
            setName('Anônimo');
        } else {
            setName('');
        }
    };

    const handlePixPayment = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!selectedAmount) return;

        setPaymentStep('processing');

        try {
            // 1. Generate PIX String
            const payload = generatePixPayload(selectedAmount);
            setPixPayload(payload);

            // 2. Generate QR Code Image
            const url = await QRCode.toDataURL(payload, {
                width: 300,
                margin: 2,
                color: {
                    dark: '#0f172a',
                    light: '#ffffff',
                },
            });
            setQrCodeUrl(url);

            // 3. Simulate short network delay for effect
            setTimeout(() => {
                setPaymentStep('success');
            }, 1000);

        } catch (err) {
            console.error("Erro ao gerar PIX", err);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(pixPayload).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <section id="doacoes-especificas" className="py-24 bg-slate-900 relative overflow-hidden border-t border-slate-800">
            {/* Background patterns */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-camp-primary rounded-full blur-3xl -translate-y-1/2"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                        <Gift className="w-8 h-8 text-camp-secondary animate-bounce" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display text-white mb-6">Doações Específicas</h2>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Cada detalhe do acampamento é pensado com carinho. Escolha uma área específica para abençoar e nos ajude a proporcionar uma experiência inesquecível!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {SPECIFIC_DONATIONS.map((option) => (
                        <div
                            key={option.id}
                            className={`relative bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border ${option.popular ? 'border-camp-secondary ring-2 ring-camp-secondary/50' : 'border-slate-700'} hover:bg-slate-800 transition-all duration-300 flex flex-col`}
                        >
                            {option.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-camp-primary to-camp-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    Mais Escolhido
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-white mb-2 leading-tight">{option.title}</h3>
                            {option.isCustomAmount ? (
                                <div className="flex items-baseline mb-4 mt-1">
                                    <span className="text-sm text-slate-400 mr-2">R$</span>
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="0,00"
                                        value={customAmounts[option.id] || ''}
                                        onChange={(e) => handleCustomAmountChange(option.id, e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-lg py-1 px-3 text-white focus:ring-2 focus:ring-camp-primary outline-none font-bold text-2xl h-10"
                                    />
                                </div>
                            ) : (
                                <div className="flex items-baseline mb-4">
                                    <span className="text-sm text-slate-400 mr-1">R$</span>
                                    <span className="text-3xl font-bold text-white">{option.amount.toFixed(2).replace('.', ',')}</span>
                                </div>
                            )}
                            <p className="text-sm text-slate-400 mb-6 flex-grow">{option.description}</p>
                            <Button
                                variant={option.popular ? 'secondary' : 'outline'}
                                className="w-full text-sm py-2"
                                onClick={() => handleDonate(option)}
                            >
                                Doar Agora
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>

                    <div className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in-up">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {paymentStep === 'method-choice' && (
                            <div className="p-8">
                                <div className="flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mx-auto mb-6">
                                    <Gift className="w-8 h-8 text-camp-secondary" />
                                </div>
                                <h3 className="text-2xl font-bold text-center text-slate-800 mb-2">Escolha como doar</h3>
                                <p className="text-center text-slate-500 mb-8">
                                    Você está doando <strong className="text-slate-800">R$ {selectedAmount?.toFixed(2).replace('.', ',')}</strong>. Qual método prefere usar?
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setPaymentStep('form')}
                                        className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-200 rounded-2xl hover:border-camp-secondary hover:bg-white transition-all group"
                                    >
                                        <QrCode className="w-8 h-8 text-camp-secondary mb-3 group-hover:scale-110 transition-transform" />
                                        <span className="text-slate-800 font-bold">PIX</span>
                                        <span className="text-xs text-slate-500 mt-1">Imediato</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            if (activePaymentLink) {
                                                window.open(activePaymentLink, '_blank');
                                                setShowModal(false);
                                            } else {
                                                toast('Valores livres são apenas via PIX por enquanto. Caso precise passar cartão, nos mande um "Oi" que enviamos um link ou levamos a maquininha!', {
                                                    icon: '💳',
                                                    duration: 6000,
                                                    style: { maxWidth: '400px' }
                                                });
                                            }
                                        }}
                                        className={`flex flex-col items-center justify-center p-6 border rounded-2xl transition-all group ${activePaymentLink ? 'bg-slate-50 border-slate-200 hover:border-camp-primary hover:bg-white' : 'bg-slate-50 border-slate-100 cursor-pointer hover:border-slate-300'}`}
                                    >
                                        <CreditCard className={`w-8 h-8 mb-3 group-hover:scale-110 transition-transform ${activePaymentLink ? 'text-camp-primary' : 'text-slate-400'}`} />
                                        <span className="text-slate-800 font-bold">Cartão</span>
                                        <span className="text-xs text-slate-500 mt-1">{activePaymentLink ? 'InfinitePay' : 'Pix ou Falar C/ Liderança'}</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {paymentStep === 'form' && (
                            <div className="p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <button onClick={() => setPaymentStep('method-choice')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                                        <X className="w-5 h-5 rotate-90" /> {/* Using rotate as back arrow hack or just back */}
                                    </button>
                                    <h3 className="text-xl font-bold text-slate-800">Detalhes do PIX</h3>
                                </div>

                                <p className="text-slate-500 mb-6">
                                    Preencha seus dados (opcional) para gerarmos seu código PIX.
                                </p>

                                <div className="space-y-4">
                                    {/* User Details */}
                                    <div className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                                        <input
                                            id="anonymous-check"
                                            type="checkbox"
                                            checked={isAnonymous}
                                            onChange={handleAnonymousChange}
                                            className="w-4 h-4 text-camp-secondary border-slate-300 rounded focus:ring-camp-secondary cursor-pointer"
                                        />
                                        <label htmlFor="anonymous-check" className="ml-2 text-sm text-slate-700 cursor-pointer select-none font-medium">
                                            Quero doar como anônimo
                                        </label>
                                    </div>

                                    {!isAnonymous && (
                                        <div className="grid grid-cols-1 gap-4 animate-fade-in">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">Seu Nome</label>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full border-slate-300 rounded-lg shadow-sm focus:border-camp-secondary focus:ring-camp-secondary p-3 border"
                                                    placeholder="João da Silva"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                                    Email <span className="text-slate-400 font-normal text-xs">(Opcional)</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full border-slate-300 rounded-lg shadow-sm focus:border-camp-secondary focus:ring-camp-secondary p-3 border"
                                                    placeholder="joao@exemplo.com"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <Button type="button" onClick={handlePixPayment} className="w-full mt-6" size="lg" variant="secondary">
                                        Gerar código PIX
                                    </Button>
                                </div>
                            </div>
                        )}

                        {paymentStep === 'processing' && (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 border-4 border-camp-secondary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                                <h3 className="text-xl font-semibold text-slate-800">Gerando PIX...</h3>
                                <p className="text-slate-500 mt-2">Aguarde um momento</p>
                            </div>
                        )}

                        {paymentStep === 'success' && (
                            <div className="p-8 text-center bg-slate-50">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-1">
                                    PIX Gerado!
                                </h3>
                                <p className="text-sm text-slate-500 mb-6">
                                    Escaneie o QR Code ou copie o código abaixo.
                                </p>

                                <div className="flex justify-center mb-6">
                                    {qrCodeUrl && (
                                        <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-200">
                                            <img src={qrCodeUrl} alt="QR Code PIX" className="w-48 h-48" />
                                        </div>
                                    )}
                                </div>

                                <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3 text-left">
                                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-yellow-800">
                                        <p className="font-bold">Atenção ao realizar o PIX</p>
                                        <p className="text-yellow-700 mt-1">
                                            O beneficiário aparecerá como <strong className="font-bold">{PIX_MERCHANT_NAME}</strong>.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative mb-6">
                                    <div className="bg-white border border-slate-300 rounded-lg p-3 pr-12 text-left">
                                        <p className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">Copia e Cola</p>
                                        <p className="text-xs text-slate-600 font-mono break-all line-clamp-2">
                                            {pixPayload}
                                        </p>
                                    </div>
                                    <button
                                        onClick={copyToClipboard}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-md text-slate-500 transition-colors"
                                        title="Copiar código"
                                    >
                                        {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                                    </button>
                                </div>

                                <p className="text-xs text-slate-400 mb-6">
                                    Após o pagamento, envie o comprovante para a liderança.
                                </p>

                                <Button onClick={() => setShowModal(false)} className="w-full" variant="outline">
                                    Fechar
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};
