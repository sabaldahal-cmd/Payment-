export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  balance: number;
  biometricEnabled: boolean;
}

export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  title: string;
  timestamp: number;
  recipient?: string;
  sender?: string;
}

export interface BillService {
  id: string;
  name: string;
  icon: string;
  category: 'Utility' | 'Top-up' | 'Internet' | 'Government' | 'Entertainment';
}
