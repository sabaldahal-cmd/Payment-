import { LucideIcon } from 'lucide-react';
import { Transaction } from '@/src/types';

export const BILL_SERVICES = [
  { id: '1', name: 'NTC Top-up', icon: 'Phone', category: 'Top-up' },
  { id: '2', name: 'Ncell Top-up', icon: 'Smartphone', category: 'Top-up' },
  { id: '3', name: 'NEA Electricity', icon: 'Zap', category: 'Utility' },
  { id: '4', name: 'Khanepani', icon: 'Droplets', category: 'Utility' },
  { id: '5', name: 'Worldlink', icon: 'Wifi', category: 'Internet' },
  { id: '6', name: 'Vianet', icon: 'Globe', category: 'Internet' },
  { id: '7', name: 'Dishhome', icon: 'Tv', category: 'Entertainment' },
  { id: '8', name: 'Traffic Fine', icon: 'AlertTriangle', category: 'Government' },
] as const;

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    amount: 1450,
    type: 'EXPENSE',
    category: 'Internet',
    title: 'Worldlink Communications',
    timestamp: Date.now() - 3600000,
    recipient: 'Worldlink'
  },
  {
    id: 't2',
    amount: 15000,
    type: 'INCOME',
    category: 'Salary',
    title: 'Payroll Deposit',
    timestamp: Date.now() - 86400000,
    sender: 'TechSolutions Pvt Ltd'
  },
  {
    id: 't3',
    amount: 250,
    type: 'EXPENSE',
    category: 'Groceries',
    title: 'BhatBhateni Supermarket',
    timestamp: Date.now() - 172800000,
    recipient: 'BhatBhateni'
  },
  {
    id: 't4',
    amount: 1200,
    type: 'EXPENSE',
    category: 'Utilities',
    title: 'NEA Electricity Billing',
    timestamp: Date.now() - 300000000,
    recipient: 'NEA'
  },
  {
    id: 't5',
    amount: 500,
    type: 'EXPENSE',
    category: 'Entertainment',
    title: 'QFX Cinemas Ticket',
    timestamp: Date.now() - 400000000,
    recipient: 'QFX'
  },
  {
    id: 't6',
    amount: 3200,
    type: 'EXPENSE',
    category: 'Groceries',
    title: 'Fresh Mart Kathmandu',
    timestamp: Date.now() - 500000000,
    recipient: 'Fresh Mart'
  },
  {
    id: 't7',
    amount: 1500,
    type: 'EXPENSE',
    category: 'Utilities',
    title: 'Khanepani Water Bill',
    timestamp: Date.now() - 600000000,
    recipient: 'KUKL'
  },
  {
    id: 't8',
    amount: 800,
    type: 'EXPENSE',
    category: 'Entertainment',
    title: 'Netflix Subscription',
    timestamp: Date.now() - 700000000,
    recipient: 'Netflix'
  }
];
