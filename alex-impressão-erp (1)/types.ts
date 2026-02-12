
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  companyName?: string;
  cnpj?: string; // Fiscal ID
  address?: string;
  logo?: string; // Base64 image string
}

export interface Client {
  id: string;
  createdAt: string;
  balance: number; // Positive = Credit, Negative = Debt
  
  // 1. Personal Data
  name: string; // *
  socialName?: string;
  document: string; // CPF *
  rg?: string;
  rgIssuer?: string;
  rgState?: string;
  rgDate?: string;
  birthDate: string; // *
  gender?: string;
  maritalStatus?: string;
  nationality?: string;
  naturalness?: string;
  fatherName?: string;
  motherName?: string;
  photo?: string; // Base64

  // 2. Contact
  phone: string; // *
  phoneSecondary?: string;
  whatsapp?: string;
  email: string; // *
  emailSecondary?: string;
  website?: string;

  // 3. Residential Address
  cep: string; // *
  address: string; // *
  number: string; // *
  complement?: string;
  neighborhood: string; // *
  city: string; // *
  state: string; // *
  country?: string;
  residenceType?: string;

  // 4. Commercial (Optional)
  companyName?: string;
  companyCnpj?: string;
  jobTitle?: string;
  commercialPhone?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  sku: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
  category: string;
  paymentMethod: string;
  clientId?: string; // Optional link to client
}

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  isCompleted: boolean;
  color?: string;
}

export type ViewState = 
  | 'dashboard' 
  | 'clients' 
  | 'customer_accounts'
  | 'products' 
  | 'pos' 
  | 'cash' 
  | 'expenses' 
  | 'notes' 
  | 'reports' 
  | 'users' 
  | 'settings'
  | 'profile';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  read: boolean;
}