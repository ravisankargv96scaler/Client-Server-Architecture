
import React, { useState } from 'react';
import { TierType } from '../../types';
import { Monitor, Server, Database, Globe, Shield, Zap } from 'lucide-react';

const TiersTab: React.FC = () => {
  const [activeTier, setActiveTier] = useState<TierType>('3-Tier');

  const tiers: { id: TierType; label: string; desc: string }[] = [
    { id: '1-Tier', label: '1-Tier', desc: 'Monolithic application where UI, logic, and data storage reside on a single machine.' },
    { id: '2-Tier', label: '2-Tier', desc: 'Separates the UI (Client) from the Database (Server). Common in legacy systems.' },
    { id: '3-Tier', label: '3-Tier', desc: 'Introduces a Middleware (App Server) to handle business logic separately from data and UI.' },
    { id: 'N-Tier', label: 'N-Tier', desc: 'Distributed architecture with extra layers like Load Balancers, Caching, and Microservices.' }
  ];

  const renderTierDiagram = () => {
    switch (activeTier) {
      case '1-Tier':
        return (
          <div className="flex items-center justify-center h-64">
            <div className="w-64 h-64 bg-slate-800 border-2 border-slate-700 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 group hover:border-cyan-500 transition-colors">
              <Monitor className="w-12 h-12 text-blue-400" />
              <div className="w-full h-1 bg-slate-700 rounded" />
              <Zap className="w-10 h-10 text-yellow-400" />
              <div className="w-full h-1 bg-slate-700 rounded" />
              <Database className="w-10 h-10 text-teal-400" />
              <span className="text-sm font-bold text-slate-400">Everything in One Box</span>
            </div>
          </div>
        );
      case '2-Tier':
        return (
          <div className="flex items-center justify-center gap-16 h-64">
            <div className="flex flex-col items-center gap-4">
              <div className="p-8 bg-slate-800 border-2 border-slate-700 rounded-2xl">
                <Monitor className="w-12 h-12 text-blue-400" />
              </div>
              <span className="font-bold text-slate-300">Client Tier</span>
            </div>
            <div className="h-0.5 w-16 bg-slate-700 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-slate-700" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="p-8 bg-slate-800 border-2 border-slate-700 rounded-2xl">
                <Database className="w-12 h-12 text-teal-400" />
              </div>
              <span className="font-bold text-slate-300">Data Tier</span>
            </div>
          </div>
        );
      case '3-Tier':
        return (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 h-auto md:h-64">
            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-slate-800 border-2 border-blue-500/30 rounded-2xl shadow-lg shadow-blue-500/5">
                <Monitor className="w-10 h-10 text-blue-400" />
              </div>
              <span className="text-xs font-bold text-slate-400">Presentation</span>
            </div>
            <div className="hidden md:block h-0.5 w-8 bg-slate-700" />
            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-slate-800 border-2 border-cyan-500/30 rounded-2xl shadow-lg shadow-cyan-500/5">
                <Server className="w-10 h-10 text-cyan-400" />
              </div>
              <span className="text-xs font-bold text-slate-400">Application</span>
            </div>
            <div className="hidden md:block h-0.5 w-8 bg-slate-700" />
            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-slate-800 border-2 border-teal-500/30 rounded-2xl shadow-lg shadow-teal-500/5">
                <Database className="w-10 h-10 text-teal-400" />
              </div>
              <span className="text-xs font-bold text-slate-400">Database</span>
            </div>
          </div>
        );
      case 'N-Tier':
        return (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center justify-center py-8">
             <div className="flex flex-col items-center gap-2">
              <div className="p-4 bg-slate-800 border border-slate-700 rounded-lg">
                <Monitor className="w-8 h-8 text-blue-400" />
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-500">Clients</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 bg-cyan-950/30 border border-cyan-500/50 rounded-lg">
                <Shield className="w-8 h-8 text-cyan-400" />
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-500">Proxy/LB</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 bg-slate-800 border border-slate-700 rounded-lg">
                <Zap className="w-8 h-8 text-yellow-400" />
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-500">Cache</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 bg-slate-800 border border-slate-700 rounded-lg">
                <Globe className="w-8 h-8 text-indigo-400" />
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-500">Apps</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 bg-slate-800 border border-slate-700 rounded-lg">
                <Database className="w-8 h-8 text-teal-400" />
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-500">Sharded DB</span>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold text-white">System Evolution</h2>
        <p className="text-slate-400">
          Systems grow in complexity to handle scale, security, and maintainability. Choose a tier to see its structure.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {tiers.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTier(t.id)}
            className={`
              px-6 py-2 rounded-full font-bold transition-all
              ${activeTier === t.id 
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }
            `}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-slate-950/50 border border-slate-800 rounded-3xl p-10 min-h-[300px] flex flex-col items-center justify-center transition-all duration-500">
        <div className="mb-8 w-full">
          {renderTierDiagram()}
        </div>
        
        <div className="text-center max-w-xl mx-auto">
          <p className="text-slate-300 leading-relaxed italic">
            "{tiers.find(t => t.id === activeTier)?.desc}"
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-800/50 border border-slate-800 rounded-2xl">
          <h4 className="font-bold text-slate-200 mb-2">Decoupling</h4>
          <p className="text-sm text-slate-400">
            Separating tiers allows teams to work on the UI independently of the Database logic, improving development velocity.
          </p>
        </div>
        <div className="p-6 bg-slate-800/50 border border-slate-800 rounded-2xl">
          <h4 className="font-bold text-slate-200 mb-2">Scalability</h4>
          <p className="text-sm text-slate-400">
            In a 3-tier system, you can scale the Application tier (add more servers) without needing to change the Database configuration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TiersTab;
