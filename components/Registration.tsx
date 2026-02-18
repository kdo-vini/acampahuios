import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { User, Calendar, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
// import { supabase } from '../services/supabase'; // We will add this later

import { GOOGLE_SCRIPT_URL } from '../constants';

export const Registration: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        cpf: '',
        birthDate: ''
    });
    const [age, setAge] = useState<number | null>(null);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Simple CPF Masking
        if (name === 'cpf') {
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

        try {
            const dataToSubmit = {
                ...formData,
                age
            };

            // Google Apps Script Web App URL
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Scripts
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSubmit)
            });

            // Since 'no-cors' doesn't return JSON, we assume success if no network error occurred
            setStatus('success');
            setFormData({ fullName: '', cpf: '', birthDate: '' });
            setAge(null);

        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            setErrorMessage('Ocorreu um erro ao realizar a inscrição. Tente novamente.');
        }
    };

    return (
        <section id="inscricao" className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-camp-primary via-slate-900 to-slate-900"></div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-display text-white mb-4">Garanta sua Vaga</h2>
                    <p className="text-slate-400">Preencha o formulário abaixo para realizar sua pré-inscrição no Acampamento HUIOS 2026.</p>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 border border-slate-700 shadow-xl">
                    {status === 'success' ? (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Inscrição Enviada!</h3>
                            <p className="text-slate-400 mb-8">Sua pré-inscrição foi realizada com sucesso. Entraremos em contato em breve.</p>
                            <Button onClick={() => setStatus('idle')} variant="outline">
                                Nova Inscrição
                            </Button>
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
                                <div className={`p-4 rounded-xl border flex items-center gap-3 ${age < 14
                                    ? 'bg-red-500/10 border-red-500/30 text-red-200'
                                    : 'bg-camp-primary/10 border-camp-primary/30 text-camp-primary'
                                    }`}>
                                    <AlertCircle className="w-5 h-5" />
                                    <div>
                                        <span className="font-bold text-lg">{age} anos</span>
                                        {age < 14 && <span className="text-sm ml-2 block sm:inline">- Idade mínima não alcançada (14 anos)</span>}
                                    </div>
                                </div>
                            )}

                            {/* Error Message */}
                            {status === 'error' && (
                                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-200 text-sm flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    {errorMessage}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full"
                                size="lg"
                                disabled={status === 'submitting' || (age !== null && age < 14)}
                            >
                                {status === 'submitting' ? 'Enviando...' : 'Confirmar Pré-Inscrição'}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};
