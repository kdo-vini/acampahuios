import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { User, Calendar, FileText, CheckCircle2, AlertCircle, CreditCard, QrCode, Copy, Check } from 'lucide-react';
import { Toggle } from './Toggle';
import { generatePixPayload } from '../services/pixService';
import QRCode from 'qrcode';
// import { supabase } from '../services/supabase'; // We will add this later

import { GOOGLE_SCRIPT_URL, REGISTRATION_PAYMENT_LINK, PIX_KEY, PIX_MERCHANT_NAME, REGISTRATION_FEE } from '../constants';

export const Registration: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        cpf: '',
        birthDate: '',
        hasAllergy: false,
        allergyDetails: '',
        hasMedicine: false, // Renamed from Medicine to avoid confusion
        medicineDetails: '',
        observations: ''
    });
    const [age, setAge] = useState<number | null>(null);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadingMessage, setLoadingMessage] = useState('Processando...');

    const [showPix, setShowPix] = useState(false);
    const [pixQrCode, setPixQrCode] = useState('');
    const [pixPayload, setPixPayload] = useState('');
    const [copied, setCopied] = useState(false);

    const handlePixClick = async () => {
        const payload = generatePixPayload(REGISTRATION_FEE);
        const qrCode = await QRCode.toDataURL(payload);
        setPixPayload(payload);
        setPixQrCode(qrCode);
        setShowPix(true);
    };

    const copyPix = () => {
        navigator.clipboard.writeText(pixPayload);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Calculate age whenever birthDate changes
    useEffect(() => {
        if (formData.birthDate) {
            const birth = new Date(formData.birthDate);
            const today = new Date();
            let calculatedAge = today.getFullYear() - birth.getFullYear();
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                calculatedAge--;
            }
            setAge(calculatedAge);
        } else {
            setAge(null);
        }
    }, [formData.birthDate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (name === 'cpf') {
            let mask = value.replace(/\D/g, '');
            if (mask.length > 11) mask = mask.slice(0, 11);

            if (mask.length > 9) {
                mask = mask.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            } else if (mask.length > 6) {
                mask = mask.replace(/(\d{3})(\d{3})(\d{1,})/, "$1.$2.$3");
            } else if (mask.length > 3) {
                mask = mask.replace(/(\d{3})(\d{1,})/, "$1.$2");
            }
            setFormData(prev => ({ ...prev, [name]: mask }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!GOOGLE_SCRIPT_URL) {
            setErrorMessage('Erro de configuração: URL da planilha não definida.');
            setStatus('error');
            return;
        }

        setStatus('submitting');
        setErrorMessage('');
        setLoadingProgress(0);

        // Simulated progress steps for better UX
        const steps = [
            { p: 15, m: 'Validando informações...' },
            { p: 40, m: 'Conectando ao servidor...' },
            { p: 70, m: 'Salvando sua inscrição...' },
            { p: 90, m: 'Finalizando...' },
        ];

        let currentStep = 0;
        const progressInterval = setInterval(() => {
            if (currentStep < steps.length) {
                setLoadingProgress(steps[currentStep].p);
                setLoadingMessage(steps[currentStep].m);
                currentStep++;
            }
        }, 600);

        try {
            const dataToSubmit = {
                ...formData,
                age
            };

            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify(dataToSubmit)
            });

            clearInterval(progressInterval);
            setLoadingProgress(100);
            setLoadingMessage('Sucesso!');

            // Short delay to show 100% before transition
            setTimeout(() => {
                setStatus('success');
                setFormData({
                    fullName: '',
                    cpf: '',
                    birthDate: '',
                    hasAllergy: false,
                    allergyDetails: '',
                    hasMedicine: false,
                    medicineDetails: '',
                    observations: ''
                });
                setAge(null);
            }, 500);

        } catch (error) {
            clearInterval(progressInterval);
            console.error('Error submitting form:', error);
            setStatus('error');
            setErrorMessage('Ocorreu um erro ao realizar a inscrição. Tente novamente.');
        }
    };

    return (
        <section id="inscricao" className="py-24 bg-camp-dark relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-camp-primary via-camp-dark to-camp-dark"></div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-display text-white mb-4">Garanta sua Vaga</h2>
                    <p className="text-slate-400">Preencha o formulário abaixo para realizar sua inscrição no 4° Acampamento HUIOS 2026 - CONTRACULTURA.</p>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 border border-slate-700 shadow-xl">
                    {status === 'success' ? (
                        <div className="text-center animate-fade-in">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Inscrição Enviada!</h3>
                            <p className="text-slate-400 mb-8">Sua inscrição foi realizada com sucesso. Agora, escolha uma forma de pagamento para garantir sua vaga:</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                <button
                                    type="button"
                                    onClick={handlePixClick}
                                    className="flex flex-col items-center justify-center p-6 bg-slate-900/50 border border-slate-700 rounded-2xl hover:border-camp-primary hover:bg-slate-900 transition-all group"
                                >
                                    <QrCode className="w-8 h-8 text-camp-primary mb-3 group-hover:scale-110 transition-transform" />
                                    <span className="text-white font-bold">Pagar via PIX</span>
                                    <span className="text-xs text-slate-500 mt-1">Liberação imediata</span>
                                </button>

                                <a
                                    href={REGISTRATION_PAYMENT_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center justify-center p-6 bg-slate-900/50 border border-slate-700 rounded-2xl hover:border-camp-secondary hover:bg-slate-900 transition-all group"
                                >
                                    <CreditCard className="w-8 h-8 text-camp-secondary mb-3 group-hover:scale-110 transition-transform" />
                                    <span className="text-white font-bold">Cartão de Crédito</span>
                                    <span className="text-xs text-slate-500 mt-1">Link InfinitePay</span>
                                </a>
                            </div>

                            {showPix && (
                                <div className="mb-8 p-6 bg-white rounded-2xl animate-fade-in-up">
                                    <h4 className="text-slate-900 font-bold mb-4">Atenção ao realizar o PIX</h4>
                                    <div className="flex justify-center mb-4">
                                        <img src={pixQrCode} alt="PIX QR Code" className="w-48 h-48" />
                                    </div>
                                    <div className="bg-slate-100 p-3 rounded-xl mb-4 text-left">
                                        <p className="text-xs text-slate-400 mb-1 font-bold">Beneficiário:</p>
                                        <p className="text-sm text-slate-800 font-bold">{PIX_MERCHANT_NAME}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={copyPix}
                                        className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl hover:bg-black transition-colors"
                                    >
                                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                        {copied ? 'Copiado!' : 'Copiar Código PIX'}
                                    </button>
                                </div>
                            )}

                            <div className="pt-6 border-t border-slate-700">
                                <Button onClick={() => { setStatus('idle'); setShowPix(false); }} variant="outline">
                                    Fazer Outra Inscrição
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">
                                    Nome Completo
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-camp-primary focus:border-transparent outline-none transition-all"
                                        placeholder="Digite seu nome completo"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* CPF */}
                                <div>
                                    <label htmlFor="cpf" className="block text-sm font-medium text-slate-300 mb-2">
                                        CPF
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FileText className="w-5 h-5 text-slate-500" />
                                        </div>
                                        <input
                                            type="text"
                                            id="cpf"
                                            name="cpf"
                                            required
                                            value={formData.cpf}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-camp-primary focus:border-transparent outline-none transition-all"
                                            placeholder="000.000.000-00"
                                            maxLength={14}
                                        />
                                    </div>
                                </div>

                                {/* Birth Date */}
                                <div>
                                    <label htmlFor="birthDate" className="block text-sm font-medium text-slate-300 mb-2">
                                        Data de Nascimento
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Calendar className="w-5 h-5 text-slate-500" />
                                        </div>
                                        <input
                                            type="date"
                                            id="birthDate"
                                            name="birthDate"
                                            required
                                            value={formData.birthDate}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-camp-primary focus:border-transparent outline-none transition-all calendar-picker-indicator-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Age Display */}
                            {age !== null && (
                                <div className="p-4 rounded-xl border flex items-center gap-3 bg-camp-primary/10 border-camp-primary/30 text-camp-primary animate-fade-in">
                                    <AlertCircle className="w-5 h-5" />
                                    <div>
                                        <span className="font-bold text-lg">{age} anos</span>
                                    </div>
                                </div>
                            )}

                            {/* Health & Observations - NEW SECTION */}
                            <div className="space-y-4 pt-2 border-t border-slate-700">
                                <h3 className="text-lg font-medium text-white">Informações de Saúde & Observações</h3>

                                {/* Allergies */}
                                <div className="space-y-3">
                                    <Toggle
                                        id="hasAllergy"
                                        name="hasAllergy"
                                        checked={formData.hasAllergy}
                                        onChange={handleInputChange}
                                        label="Possui alguma restrição alimentar ou alergia?"
                                    />
                                    {formData.hasAllergy && (
                                        <div className="animate-fade-in">
                                            <input
                                                type="text"
                                                name="allergyDetails"
                                                value={formData.allergyDetails}
                                                onChange={handleInputChange}
                                                placeholder="Quais alergias ou restrições?"
                                                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-camp-primary focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Medicines */}
                                <div className="space-y-3">
                                    <Toggle
                                        id="hasMedicine"
                                        name="hasMedicine"
                                        checked={formData.hasMedicine}
                                        onChange={handleInputChange}
                                        label="Faz uso de remédio contínuo?"
                                    />
                                    {formData.hasMedicine && (
                                        <div className="animate-fade-in">
                                            <input
                                                type="text"
                                                name="medicineDetails"
                                                value={formData.medicineDetails}
                                                onChange={handleInputChange}
                                                placeholder="Qual remédio e horário?"
                                                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-camp-primary focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Observations */}
                                <div>
                                    <label htmlFor="observations" className="block text-sm font-medium text-slate-300 mb-2">
                                        Observações Extras
                                    </label>
                                    <textarea
                                        id="observations"
                                        name="observations"
                                        value={formData.observations}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-camp-primary focus:border-transparent outline-none transition-all resize-none"
                                        placeholder="Alguma outra informação importante que devamos saber?"
                                    />
                                </div>
                            </div>

                            {status === 'submitting' ? (
                                <div className="space-y-3 animate-fade-in">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-sm font-medium text-camp-primary">{loadingMessage}</span>
                                        <span className="text-sm font-bold text-white">{loadingProgress}%</span>
                                    </div>
                                    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden p-[2px]">
                                        <div
                                            className="bg-camp-primary h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                                            style={{ width: `${loadingProgress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-full"
                                    size="lg"
                                    disabled={status === 'submitting'}
                                >
                                    Confirmar Inscrição
                                </Button>
                            )}

                            {status === 'error' && (
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-center gap-3 animate-shake">
                                    <AlertCircle className="w-5 h-5" />
                                    <span>{errorMessage}</span>
                                </div>
                            )}
                        </form >
                    )}
                </div >
            </div >
        </section >
    );
};
