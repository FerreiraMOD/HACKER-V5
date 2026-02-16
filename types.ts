
export enum Country {
  Mozambique = 'Mozambique',
  Angola = 'Angola'
}

export interface UserSession {
  isAuthenticated: boolean;
  email: string | null;
  country: Country | null;
}

export interface Prediction {
  time: string;
  multiplier: string;
  type: 'Azul' | 'Roxo' | 'Rosa';
  target?: string;
  protection?: string;
  risk?: string;
}

export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  duration: string;
  features: string[];
}

export const PAYMENT_PLANS: PaymentPlan[] = [
  { 
    id: '1day', 
    name: 'Bronze 1 Dia', 
    price: 100, 
    currency: 'MT', 
    duration: '24 Horas', 
    features: ['Acesso ao Suporte', 'Instruções Completas'] 
  },
  { 
    id: '2days', 
    name: 'Prata 2 Dias', 
    price: 200, 
    currency: 'MT', 
    duration: '48 Horas', 
    features: ['Suporte + Instruções', '+1 Conta Extra'] 
  },
  { 
    id: '3days', 
    name: 'Ouro 3 Dias', 
    price: 300, 
    currency: 'MT', 
    duration: '72 Horas', 
    features: ['Suporte + Instruções', '+2 Contas Extras'] 
  },
  { 
    id: '7days', 
    name: 'Platina 7 Dias', 
    price: 500, 
    currency: 'MT', 
    duration: '1 Semana', 
    features: ['Suporte + Instruções', '+3 Contas Extras', '+2 Dias Extras'] 
  },
  { 
    id: 'unlimited', 
    name: 'VIP Ilimitado', 
    price: 1000, 
    currency: 'MT', 
    duration: 'Vitalício', 
    features: ['Suporte VIP', 'Contas Extras', 'Futuras Atualizações'] 
  },
];

export const MOZAMBIQUE_HOUSES = [
  'Elephantbet', '888bets', 'Placard', 'Bantubet', 'Olabet', 
  'Betpawa', 'Txunabet', 'Megagame', 'PremierBet', 'Jogabets'
];

export const ANGOLA_HOUSES = [
  'Elephantbet', '888bets', 'Bantubet'
];
