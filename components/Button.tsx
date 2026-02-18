import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-camp-primary hover:opacity-90 text-white shadow-lg shadow-purple-500/30 focus:ring-purple-500 border border-transparent",
    secondary: "bg-camp-secondary hover:brightness-110 text-camp-dark shadow-lg shadow-lime-400/30 focus:ring-lime-400 border border-transparent",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white/10 focus:ring-white",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-400",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};