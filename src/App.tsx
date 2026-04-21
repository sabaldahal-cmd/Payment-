import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  Wallet, 
  History, 
  CreditCard, 
  User, 
  Plus, 
  Send, 
  Scan, 
  MoreHorizontal,
  Fingerprint,
  Bell,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';
import { cn } from './lib/utils';
import { MOCK_TRANSACTIONS, BILL_SERVICES } from './constants';
import { Transaction } from './types';

// Components
const Navbar = ({ onLogout, userName }: { onLogout: () => void; userName: string }) => (
  <header className="fixed top-0 left-0 right-0 h-24 bg-brand-surface/40 backdrop-blur-2xl z-40 px-6 flex items-center justify-between border-b border-white/5">
    <div className="flex items-center gap-4">
      <div className="relative group">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
          M
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-400 rounded-full border-2 border-brand-surface"></div>
      </div>
      <div>
        <p className="text-[9px] text-slate-500 font-black tracking-widest uppercase mb-0.5 opacity-60">Welcome back,</p>
        <p className="text-base font-black text-slate-100 tracking-tight">{userName}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 relative transition-all active:scale-90 flex items-center justify-center">
        <Bell size={22} className="text-slate-200" />
        <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-brand-surface"></span>
      </button>
      <button onClick={onLogout} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all active:scale-90 flex items-center justify-center">
        <User size={22} className="text-slate-200" />
      </button>
    </div>
  </header>
);

const BottomNav = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) => (
  <nav className="fixed bottom-8 left-6 right-6 h-20 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] z-40 px-8 flex items-center justify-between shadow-2xl overflow-hidden">
    {[
      { id: 'home', icon: Wallet, label: 'Wallet' },
      { id: 'history', icon: History, label: 'History' },
      { id: 'scan', icon: Scan, isCenter: true },
      { id: 'payments', icon: CreditCard, label: 'Bills' },
      { id: 'more', icon: MoreHorizontal, label: 'More' }
    ].map((item) => (
      <button
        key={item.id}
        onClick={() => onTabChange(item.id)}
        className={cn(
          "relative flex flex-col items-center gap-1.5 transition-all duration-300 py-2",
          item.isCenter ? "-mt-16 bg-indigo-600 p-4 rounded-3xl text-white shadow-2xl shadow-indigo-600/40 hover:scale-110 active:scale-95" : "text-slate-500 hover:text-slate-300",
          item.id === activeTab && !item.isCenter && "text-indigo-400"
        )}
      >
        <item.icon size={item.isCenter ? 32 : 24} strokeWidth={item.id === activeTab || item.isCenter ? 2.5 : 2} />
        {!item.isCenter && <span className="text-[9px] font-black uppercase tracking-[0.2em]">{item.label}</span>}
        {item.id === activeTab && !item.isCenter && (
          <motion.div layoutId="nav-indicator" className="absolute -bottom-2 w-1 h-1 bg-indigo-400 rounded-full" />
        )}
      </button>
    ))}
  </nav>
);

// Views
const WalletView = ({ balance }: { balance: number }) => (
  <div className="pt-28 pb-32 px-6 space-y-10">
    {/* Virtual Card Section */}
    <div className="relative h-64 perspective-1000 group">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        whileHover={{ rotateY: 5 }}
        className="w-full h-full bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white card-shadow relative overflow-hidden flex flex-col justify-between preserve-3d"
      >
        {/* Card Patterns */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[100px]"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-[60px]"></div>
        
        {/* Card Header */}
        <div className="flex justify-between items-start relative z-10">
          <div className="space-y-1">
            <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.3em]">Current Balance</p>
            <h2 className="text-4xl font-black tracking-tighter text-gradient leading-none">
              रु. {balance.toLocaleString()}
            </h2>
          </div>
          <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md border border-white/10">
            <Wallet size={24} strokeWidth={2.5} />
          </div>
        </div>

        {/* Card Details */}
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-6">
            <div className="space-y-0.5">
              <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Card Holder</p>
              <p className="text-xs font-black uppercase tracking-widest">Sabal Dahal</p>
            </div>
            <div className="h-6 w-[1px] bg-white/10"></div>
            <div className="space-y-0.5">
              <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Expires</p>
              <p className="text-xs font-black uppercase tracking-widest">09/28</p>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <p className="text-base font-mono tracking-[0.25em] text-white/90">•••• •••• •••• 4829</p>
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-rose-500/80 backdrop-blur-md"></div>
              <div className="w-8 h-8 rounded-full bg-amber-500/80 backdrop-blur-md"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Monthly Spending Summary */}
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <div>
          <h3 className="text-lg font-black text-slate-100 tracking-tight">Spending Summary</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Budget utilization this month</p>
        </div>
      </div>
      <div className="glass-panel p-6 flex items-center justify-between gap-6">
        <div className="flex-1 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-slate-500">Groceries</span>
              <span className="text-indigo-400">रु. 3,450 / 5,000</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '69%' }}
                className="h-full bg-indigo-500 rounded-full"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-slate-500">Utilities</span>
              <span className="text-emerald-400">रु. 2,700 / 3,000</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '90%' }}
                className="h-full bg-emerald-500 rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="w-20 h-20 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[{ value: 70 }, { value: 30 }]}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={35}
                startAngle={90}
                endAngle={450}
                stroke="none"
                dataKey="value"
              >
                <Cell fill="#6366f1" />
                <Cell fill="#ffffff05" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Quick Actions Grid */}
    <div className="grid grid-cols-4 gap-4 px-2">
      {[
        { icon: Send, label: 'Send', color: 'bg-blue-500' },
        { icon: Scan, label: 'Scan', color: 'bg-indigo-600' },
        { icon: Plus, label: 'Load', color: 'bg-emerald-600' },
        { icon: MoreHorizontal, label: 'More', color: 'bg-slate-700' }
      ].map((action, i) => (
        <motion.button
          key={i}
          whileTap={{ scale: 0.9 }}
          className="flex flex-col items-center gap-3"
        >
          <div className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all",
            action.color,
            "shadow-lg"
          )}>
            <action.icon size={24} strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{action.label}</span>
        </motion.button>
      ))}
    </div>

    {/* Recent Activity */}
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div>
          <h3 className="text-lg font-black text-slate-100 tracking-tight">Recent Activity</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Your last 3 transactions</p>
        </div>
        <button className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-indigo-400 text-[10px] font-black uppercase tracking-widest transition-colors border border-white/5">
          See All
        </button>
      </div>
      <div className="space-y-3">
        {MOCK_TRANSACTIONS.slice(0, 3).map((tx, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={tx.id} 
            className="group flex items-center justify-between p-5 glass-item"
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110",
                tx.type === 'INCOME' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
              )}>
                {tx.type === 'INCOME' ? <ArrowDownLeft size={24} strokeWidth={2.5} /> : <ArrowUpRight size={24} strokeWidth={2.5} />}
              </div>
              <div>
                <p className="font-black text-slate-100 text-sm tracking-tight">{tx.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] text-indigo-400 bg-indigo-400/10 px-1.5 py-0.5 rounded-md font-black uppercase tracking-widest">
                    {tx.category}
                  </span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Just now</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className={cn(
                "font-black text-base tracking-tighter",
                tx.type === 'INCOME' ? "text-emerald-400" : "text-white"
              )}>
                {tx.type === 'INCOME' ? '+' : '-'} रु. {tx.amount.toLocaleString()}
              </p>
              <div className="flex items-center justify-end gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest italic">Clearing</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const HistoryView = () => {
  const [filter, setFilter] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editingTx, setEditingTx] = useState<string | null>(null);
  const [localTransactions, setLocalTransactions] = useState(MOCK_TRANSACTIONS);
  
  const categories = useMemo(() => {
    const cats = new Set(localTransactions.map(tx => tx.category));
    return ['All', ...Array.from(cats)];
  }, [localTransactions]);

  const filtered = useMemo(() => {
    return localTransactions.filter(t => {
      const typeMatch = filter === 'ALL' || t.type === filter;
      const categoryMatch = categoryFilter === 'All' || t.category === categoryFilter;
      return typeMatch && categoryMatch;
    });
  }, [filter, categoryFilter, localTransactions]);

  const chartData = useMemo(() => {
    const expenseData: Record<string, number> = {};
    localTransactions.filter(t => t.type === 'EXPENSE').forEach(t => {
      expenseData[t.category] = (expenseData[t.category] || 0) + t.amount;
    });
    return Object.entries(expenseData).map(([name, value]) => ({ name, value }));
  }, [localTransactions]);

  const handleUpdateCategory = (txId: string, newCat: string) => {
    setLocalTransactions(prev => prev.map(tx => tx.id === txId ? { ...tx, category: newCat } : tx));
    setEditingTx(null);
  };

  const COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6'];

  return (
    <div className="pt-32 pb-32 px-6 space-y-10">
      <div className="flex flex-col gap-6 px-2">
        <div>
          <h2 className="text-4xl font-black text-slate-100 tracking-tighter">Financial Insights</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.25em] mt-1">Smart tracking and categorization</p>
        </div>

        {/* Spending Breakdown Chart */}
        <div className="glass-panel p-6 overflow-hidden">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-6 px-2">Spending by Category</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: -20, right: 20, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} 
                  width={80}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e1b4b', border: 'none', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold' }}
                  cursor={{ fill: '#ffffff05' }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={20}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none">
            {['ALL', 'INCOME', 'EXPENSE'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={cn(
                  "shrink-0 px-6 py-2.5 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all duration-300 border",
                  filter === f ? "bg-indigo-600 text-white border-indigo-500 shadow-xl" : "bg-white/5 text-slate-500 border-white/5"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={cn(
                  "shrink-0 px-5 py-2.5 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all duration-300 border",
                  categoryFilter === c ? "bg-white text-brand-surface border-white" : "bg-white/5 text-slate-500 border-white/5"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] px-2 flex justify-between items-center">
          Filtered Transactions
          <span className="text-white/40">{filtered.length} found</span>
        </h3>
        {filtered.length > 0 ? (
          filtered.map((tx, i) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={tx.id} 
              onClick={() => setEditingTx(tx.id === editingTx ? null : tx.id)}
              className={cn(
                "flex flex-col p-5 glass-item transition-all",
                editingTx === tx.id && "bg-white/10 ring-1 ring-white/20"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg",
                    tx.type === 'INCOME' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-white/5 text-slate-300 border border-white/10"
                  )}>
                    {tx.category === 'Groceries' ? <Scan size={32} /> : tx.type === 'INCOME' ? <ArrowDownLeft size={32} /> : <ArrowUpRight size={32} />}
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-black text-slate-100 text-base tracking-tight">{tx.title}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                      {new Date(tx.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                      <span className="text-indigo-400/80">{tx.category}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "font-black text-base tracking-tighter",
                    tx.type === 'INCOME' ? "text-emerald-400" : "text-white"
                  )}>
                    {tx.type === 'INCOME' ? '+' : '-'} रु. {tx.amount.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-end gap-1.5 mt-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest italic">Settled</span>
                  </div>
                </div>
              </div>

              {editingTx === tx.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="mt-6 pt-6 border-t border-white/5"
                >
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-3">Re-categorize Transaction</p>
                  <div className="flex flex-wrap gap-2">
                    {['Groceries', 'Utilities', 'Entertainment', 'Transport', 'Food', 'Others'].map(cat => (
                      <button
                        key={cat}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateCategory(tx.id, cat);
                        }}
                        className={cn(
                          "px-4 py-2 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all",
                          tx.category === cat ? "bg-indigo-600 text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))
        ) : (
          <div className="py-20 text-center animate-pulse">
            <Search className="mx-auto text-slate-700 mb-4" size={48} />
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">No transactions match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

const PaymentsView = () => (
  <div className="pt-32 pb-32 px-6 space-y-10">
    <div className="space-y-6 px-2">
      <div>
        <h2 className="text-4xl font-black text-slate-100 tracking-tighter">Payments</h2>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.25em] mt-1">Connected billing ecosystem</p>
      </div>
      <div className="relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Service, biller or account..." 
          className="w-full bg-white/5 border border-white/5 rounded-[2rem] py-6 pl-16 pr-8 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all font-bold outline-none text-slate-100 placeholder:text-slate-600"
        />
      </div>
    </div>

    <div className="glass-panel p-10">
      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-10 px-2 text-center">Utility & Digital Services</h3>
      <div className="grid grid-cols-4 gap-y-12">
        {BILL_SERVICES.map((service, idx) => {
          const colors = [
            'text-blue-400 bg-blue-400/10 border-blue-400/20',
            'text-orange-400 bg-orange-400/10 border-orange-400/20',
            'text-teal-400 bg-teal-400/10 border-teal-400/20',
            'text-purple-400 bg-purple-400/10 border-purple-400/20',
            'text-rose-400 bg-rose-400/10 border-rose-400/20',
            'text-amber-400 bg-amber-400/10 border-amber-400/20',
            'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
            'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
          ];
          
          return (
            <motion.button 
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              key={service.id} 
              className="flex flex-col items-center gap-4 transition-colors px-1"
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl border flex items-center justify-center p-4 transition-all shadow-xl",
                colors[idx % colors.length]
              )}>
                <MoreHorizontal size={32} />
              </div>
              <span className="text-[9px] font-black text-slate-400 text-center uppercase tracking-tight leading-tight opacity-70">
                {service.name.split(' ')[0]}<br/>{service.name.split(' ')[1] || ''}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>

    <div className="bg-indigo-600/10 border border-indigo-500/10 rounded-[2.5rem] p-8 flex items-start gap-5 shadow-2xl">
      <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-600/40 animate-pulse">
        <Bell size={24} />
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-black text-indigo-100 tracking-tight">Priority Biller Reminder</p>
        <p className="text-xs text-indigo-300/60 font-medium leading-relaxed">Your internet bill from Worldlink is due in 24 hours. Auto-pay is currently disabled.</p>
      </div>
      <ChevronRight size={24} className="text-indigo-500/30 shrink-0 self-center" />
    </div>
  </div>
);

const MoreView = ({ user, onLogout }: { user: any; onLogout: () => void }) => (
  <div className="pt-32 pb-32 px-6 space-y-10">
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="relative group">
        <div className="w-28 h-28 bg-indigo-600 rounded-[3rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl group-hover:scale-105 transition-transform cursor-pointer overflow-hidden border-4 border-white/5">
          {user.name.charAt(0)}
        </div>
        <button className="absolute -bottom-2 -right-2 bg-white text-brand-surface p-3 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all">
          <Plus size={20} className="stroke-[3px]" />
        </button>
      </div>
      <div>
        <h2 className="text-2xl font-black text-slate-100 tracking-tight">{user.name}</h2>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-1">Prime Member • Level 4</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {[
        { icon: User, label: 'Profile Settings', sub: 'Personal Info' },
        { icon: Fingerprint, label: 'Security', sub: 'PIN & Biometric' },
        { icon: Bell, label: 'Notifications', sub: 'Manage alerts' },
        { icon: CreditCard, label: 'Payment Methods', sub: 'Linked cards' }
      ].map((item, i) => (
        <button 
          key={i}
          className="flex flex-col items-center text-center p-6 glass-item hover:bg-white/10"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 mb-4 border border-white/5">
            <item.icon size={24} />
          </div>
          <span className="text-[11px] font-black text-slate-100 tracking-tight">{item.label}</span>
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">{item.sub}</span>
        </button>
      ))}
    </div>

    <div className="space-y-4">
      <button 
        onClick={onLogout}
        className="w-full py-5 rounded-[2rem] bg-rose-500/10 border border-rose-500/20 text-rose-500 font-black text-xs uppercase tracking-widest hover:bg-rose-500/20 transition-all flex items-center justify-center gap-3"
      >
        Sign out securely
      </button>
      <p className="text-center text-[9px] text-slate-700 font-black uppercase tracking-widest">Version 2.4.0 (Build 4122)</p>
    </div>
  </div>
);

const LoginView = ({ onLogin }: { onLogin: (biometric: boolean) => void }) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length >= 10 && password) {
      onLogin(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col p-8 items-center justify-between">
      <div className="w-full mt-16 text-center space-y-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-indigo-600 rounded-[2.25rem] mx-auto flex items-center justify-center text-white text-4xl font-black mb-6 shadow-[0_20px_50px_rgba(79,70,229,0.3)]"
        >
          M
        </motion.div>
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-100 tracking-tighter uppercase italic">Mero Paisa</h1>
          <p className="text-indigo-400 font-black uppercase tracking-[0.4em] text-[9px] opacity-80">Financial Independence</p>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-10 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] pl-4">Mobile Number</label>
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input 
                  type="tel"
                  placeholder="98XXXXXXXX"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all font-bold outline-none text-slate-100 placeholder:text-slate-700"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] pl-4">Password</label>
              <div className="relative group">
                <Fingerprint className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all font-bold outline-none text-slate-100 placeholder:text-slate-700"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Sign In Securely
          </button>
        </form>

        <div className="flex items-center gap-6">
          <div className="h-[1px] bg-white/5 flex-1"></div>
          <button 
            type="button"
            onClick={() => onLogin(true)}
            className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
          >
            <Fingerprint size={20} /> Biometric
          </button>
          <div className="h-[1px] bg-white/5 flex-1"></div>
        </div>
      </div>

      <div className="text-center space-y-4 pb-4">
        <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest border border-indigo-500/20 px-4 py-1.5 rounded-full inline-block">
          New User? Create Account
        </p>
        <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.25em]">
          ISO 27001 Certified • End-to-End Encryption
        </p>
      </div>
    </div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState({ name: 'Sabal Dahal', balance: 25480 });
  const [isBiometricPrompt, setIsBiometricPrompt] = useState(false);

  const handleLogin = (biometric: boolean) => {
    if (biometric) {
      setIsBiometricPrompt(true);
      // Simulate biometric verification
      setTimeout(() => {
        setIsBiometricPrompt(false);
        setIsLoggedIn(true);
      }, 1500);
    } else {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-600">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="z-50 relative"
          >
            <LoginView onLogin={handleLogin} />
            {isBiometricPrompt && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-3xl p-10 flex flex-col items-center gap-6 max-w-sm w-full text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 relative">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-blue-100"
                    />
                    <Fingerprint size={48} className="relative z-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Biometric Login</h3>
                    <p className="text-sm text-gray-500 mt-2 font-medium">Please place your finger on the sensor or use face recognition to continue.</p>
                  </div>
                  <button 
                    onClick={() => setIsBiometricPrompt(false)}
                    className="text-gray-400 font-bold text-sm uppercase tracking-widest hover:text-gray-600"
                  >
                    Cancel
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col"
          >
            <Navbar userName={user.name} onLogout={handleLogout} />
            
            <main className="flex-1 overflow-y-auto">
              {activeTab === 'home' && <WalletView balance={user.balance} />}
              {activeTab === 'history' && <HistoryView />}
              {activeTab === 'payments' && <PaymentsView />}
              {activeTab === 'more' && <MoreView user={user} onLogout={handleLogout} />}
              {activeTab === 'scan' && (
                <div className="pt-32 px-6 flex flex-col items-center justify-center min-h-[70vh] gap-10">
                  <div className="w-full aspect-square max-w-[280px] border-2 border-dashed border-indigo-500/40 rounded-[3rem] relative overflow-hidden flex items-center justify-center bg-white/5 backdrop-blur-3xl shadow-2xl">
                    <div className="absolute top-8 left-8 w-10 h-10 border-t-4 border-l-4 border-indigo-500 rounded-tl-2xl"></div>
                    <div className="absolute top-8 right-8 w-10 h-10 border-t-4 border-r-4 border-indigo-500 rounded-tr-2xl"></div>
                    <div className="absolute bottom-8 left-8 w-10 h-10 border-b-4 border-l-4 border-indigo-500 rounded-bl-2xl"></div>
                    <div className="absolute bottom-8 right-8 w-10 h-10 border-b-4 border-r-4 border-indigo-500 rounded-br-2xl"></div>
                    
                    <Scan size={80} className="text-indigo-500 opacity-20" />
                    
                    <motion.div 
                      animate={{ top: ['10%', '90%', '10%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-6 right-6 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_20px_rgba(129,140,248,0.8)] z-20"
                    />
                  </div>
                  <div className="text-center space-y-3 px-6">
                    <h3 className="text-2xl font-black text-slate-100 tracking-tight uppercase italic">Universal Scanner</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] leading-relaxed">
                      Supports Mero Paisa, FonePay, and all international QR standards.
                    </p>
                  </div>
                  <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/30 active:scale-95 transition-all">
                    Upload from Gallery
                  </button>
                </div>
              )}
            </main>

            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
