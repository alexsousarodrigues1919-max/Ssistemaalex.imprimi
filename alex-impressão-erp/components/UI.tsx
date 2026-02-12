import React, { ReactNode, useEffect } from 'react';
import { Loader2, X, CheckCircle, AlertTriangle, Info, Bell, Zap } from 'lucide-react';

// --- Loader ---
export const LoadingScreen = () => (
  <div className="fixed inset-0 bg-slate-900 z-[100] flex flex-col items-center justify-center text-white">
    <div className="relative flex flex-col items-center">
      {/* Animated Background Glow */}
      <div className="absolute -inset-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      
      {/* Logo/Icon Container */}
      <div className="relative bg-slate-800/80 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl flex flex-col items-center max-w-sm w-full mx-4">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-50 animate-ping"></div>
          <div className="relative bg-slate-900 p-4 rounded-full border border-slate-700">
             <Zap className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-2">
          Alex_impresão
        </h1>
        
        <div className="flex items-center gap-3 mt-4">
          <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
          <p className="text-slate-400 text-sm font-medium">Carregando Sistema...</p>
        </div>

        {/* Loading Bar */}
        <div className="w-full h-1 bg-slate-700 rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-blue-500 animate-[loading_1.5s_ease-in-out_infinite] w-1/2 rounded-full"></div>
        </div>
      </div>
    </div>
    <style>{`
      @keyframes loading {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(50%); }
        100% { transform: translateX(200%); }
      }
    `}</style>
  </div>
);

// --- Card ---
export const Card = ({ children, className = '' }: { children?: ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-slate-200 p-6 ${className}`}>
    {children}
  </div>
);

// --- Button ---
export interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = ({ variant = 'primary', size = 'md', className = '', isLoading, children, disabled, ...props }: ButtonProps) => {
  const baseStyle = "rounded-md font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    secondary: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
    ghost: "text-slate-600 hover:bg-slate-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} disabled={isLoading || disabled} {...props}>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};

// --- Input ---
export interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className = '', ...props }: InputProps) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
    <input
      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-slate-900 placeholder:text-slate-400 ${error ? 'border-red-500' : 'border-slate-300'} ${className}`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// --- Modal ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {children}
        </div>
        {footer && <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
};

// --- Badge ---
interface BadgeProps {
  children?: ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow';
  className?: string;
}

export const Badge = ({ children, color = 'blue', className = '' }: BadgeProps) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]} ${className}`}>
      {children}
    </span>
  );
};

// --- Toast Notification ---
interface ToastProps {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  onClose: (id: string) => void;
}

const Toast = ({ id, title, message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000); // Auto close after 5s
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const icons = {
    info: <Info className="w-5 h-5 text-blue-500" />,
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-orange-500" />,
  };

  const borders = {
    info: 'border-l-4 border-l-blue-500',
    success: 'border-l-4 border-l-green-500',
    warning: 'border-l-4 border-l-orange-500',
  };

  return (
    <div className={`bg-white shadow-lg rounded-md p-4 mb-3 flex items-start gap-3 w-80 animate-in slide-in-from-right-full duration-300 border border-slate-100 ${borders[type]}`}>
      <div className="mt-0.5">{icons[type]}</div>
      <div className="flex-1">
        <h4 className="font-semibold text-slate-800 text-sm">{title}</h4>
        <p className="text-slate-600 text-xs mt-1">{message}</p>
      </div>
      <button onClick={() => onClose(id)} className="text-slate-400 hover:text-slate-600">
        <X size={14} />
      </button>
    </div>
  );
};

export const ToastContainer = ({ toasts, removeToast }: { toasts: any[], removeToast: (id: string) => void }) => {
  return (
    <div className="fixed top-4 right-4 z-[60] flex flex-col items-end">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </div>
  );
};