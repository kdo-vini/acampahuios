import React from 'react';

interface ToggleProps {
    id: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
}

export const Toggle: React.FC<ToggleProps> = ({ id, name, checked, onChange, label }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-slate-900/30 border border-slate-700/50 rounded-2xl transition-all duration-300 hover:border-slate-600">
            <label htmlFor={id} className="text-slate-300 cursor-pointer select-none font-medium">
                {label}
            </label>
            <div className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    id={id}
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className="sr-only peer"
                />
                <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-camp-primary"></div>
                <span className="ml-3 text-xs font-bold uppercase tracking-wider text-slate-500 min-w-[2.5rem]">
                    {checked ? (
                        <span className="text-camp-primary animate-fade-in ">Sim</span>
                    ) : (
                        <span className="animate-fade-in">Não</span>
                    )}
                </span>
            </div>
        </div>
    );
};
