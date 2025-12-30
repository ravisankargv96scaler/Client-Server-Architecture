
import React, { useState, useEffect, useRef } from 'react';
import { Users, Server, Zap, ShieldAlert, Activity } from 'lucide-react';

const ScalingTab: React.FC = () => {
  const [traffic, setTraffic] = useState<'low' | 'high'>('low');
  const [lb, setLb] = useState(false);
  const [caching, setCaching] = useState(false);
  const [load, setLoad] = useState(0);
  const [packets, setPackets] = useState<{ id: number; target: number; color: string; isViaLB: boolean }[]>([]);
  const packetIdRef = useRef(0);

  // Load logic
  useEffect(() => {
    let targetLoad = 0;
    if (traffic === 'low') targetLoad = 20;
    else {
      targetLoad = 95;
      if (lb) targetLoad -= 40;
      if (caching) targetLoad -= 30;
    }
    
    const interval = setInterval(() => {
      setLoad(prev => {
        if (prev < targetLoad) return Math.min(prev + 2, targetLoad);
        if (prev > targetLoad) return Math.max(prev - 2, targetLoad);
        return prev;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [traffic, lb, caching]);

  // Packet animation logic
  useEffect(() => {
    const intervalTime = traffic === 'low' ? 800 : 200;
    const interval = setInterval(() => {
      const newPacket = {
        id: packetIdRef.current++,
        target: lb ? (Math.random() > 0.5 ? 1 : 2) : 1,
        color: caching && Math.random() > 0.6 ? 'bg-green-400' : 'bg-cyan-400',
        isViaLB: lb
      };
      setPackets(prev => [...prev, newPacket].slice(-30));
      
      // Remove packet after animation completes
      setTimeout(() => {
        setPackets(prev => prev.filter(p => p.id !== newPacket.id));
      }, 2000);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [traffic, lb, caching]);

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold text-white">Handling the Load</h2>
        <p className="text-slate-400">
          Scaling is the ability of a system to handle growing amounts of work. Experiment with traffic spikes and infrastructure improvements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <h3 className="font-bold text-slate-100 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Traffic Simulator
            </h3>
            
            <button
              onClick={() => setTraffic(traffic === 'low' ? 'high' : 'low')}
              className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                traffic === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <Users className="w-4 h-4" />
              {traffic === 'high' ? 'High Traffic (Spike!)' : 'Normal Traffic'}
            </button>

            <button
              onClick={() => setLb(!lb)}
              className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                lb ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              {lb ? 'Load Balancer Active' : 'Add Load Balancer'}
            </button>

            <button
              onClick={() => setCaching(!caching)}
              className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                caching ? 'bg-green-500 text-slate-950' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <Zap className="w-4 h-4" />
              {caching ? 'Caching Enabled' : 'Enable Caching'}
            </button>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Server CPU Load</h3>
            <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden mb-2">
              <div 
                className={`h-full transition-all duration-300 ${load > 80 ? 'bg-red-500' : load > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${load}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-bold">
              <span className={load > 80 ? 'text-red-400' : 'text-slate-500'}>{load}% Load</span>
              <span className="text-slate-500">{load > 85 ? 'System Failing!' : load > 50 ? 'Stressed' : 'Healthy'}</span>
            </div>
          </div>
        </div>

        {/* Animation Area */}
        <div className="lg:col-span-2 relative h-[400px] bg-slate-950/50 rounded-3xl border border-slate-800 overflow-hidden p-8">
          <div className="flex h-full items-center justify-between px-4">
            {/* User Group */}
            <div className="flex flex-col items-center gap-4 z-20">
              <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl shadow-blue-500/5">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Users</span>
            </div>

            {/* Load Balancer */}
            <div className={`transition-all duration-700 flex flex-col items-center gap-4 z-20 ${lb ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
              <div className="p-5 bg-cyan-950/40 border-2 border-cyan-500 shadow-2xl shadow-cyan-500/20 rounded-full animate-pulse">
                <ShieldAlert className="w-10 h-10 text-cyan-400" />
              </div>
              <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Load Balancer</span>
            </div>

            {/* Servers */}
            <div className="flex flex-col gap-12 z-20 min-w-[120px]">
              <div className={`p-4 bg-slate-800 border-2 rounded-2xl transition-all duration-300 flex flex-col items-center gap-2 ${load > 85 && !lb ? 'border-red-500 animate-shake shadow-lg shadow-red-500/20' : 'border-slate-700'}`}>
                <Server className={`w-8 h-8 ${load > 85 && !lb ? 'text-red-500' : 'text-slate-300'}`} />
                <span className="text-[10px] font-bold text-slate-500">Server A</span>
              </div>
              {lb && (
                <div className="p-4 bg-slate-800 border-2 border-slate-700 rounded-2xl transition-all duration-300 flex flex-col items-center gap-2 animate-in slide-in-from-right-8">
                  <Server className="w-8 h-8 text-slate-300" />
                  <span className="text-[10px] font-bold text-slate-500">Server B</span>
                </div>
              )}
            </div>

            {/* Animated Packets */}
            {packets.map(p => (
              <div
                key={p.id}
                className={`absolute w-3 h-3 rounded-full blur-[1px] ${p.color} z-10 
                  ${p.isViaLB ? 'animate-flow-lb' : 'animate-flow-direct'}
                `}
                style={{
                  '--target-top': lb ? (p.target === 1 ? '35%' : '65%') : '50%',
                } as React.CSSProperties}
              />
            ))}
          </div>

          {/* Cache Overlay */}
          {caching && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-green-500/20 border border-green-500/50 rounded-full text-[10px] font-black uppercase tracking-widest text-green-400 flex items-center gap-2 animate-pulse z-30">
              <Zap className="w-3 h-3" />
              Caching Layer Active
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes flow-direct {
          0% { left: 10%; top: 50%; opacity: 0; transform: scale(0.5); }
          10% { opacity: 1; transform: scale(1); }
          90% { opacity: 1; }
          100% { left: 85%; top: 50%; opacity: 0; transform: scale(0.8); }
        }

        @keyframes flow-lb {
          0% { left: 10%; top: 50%; opacity: 0; transform: scale(0.5); }
          5% { opacity: 1; transform: scale(1); }
          /* Hit Load Balancer */
          45% { left: 48%; top: 50%; transform: scale(1.2); }
          55% { left: 52%; top: 50%; transform: scale(1); }
          /* Diverge to Target Server */
          100% { left: 85%; top: var(--target-top); opacity: 0; transform: scale(0.8); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }

        .animate-flow-direct {
          animation: flow-direct 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-flow-lb {
          animation: flow-lb 2s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
        }

        .animate-shake {
          animation: shake 0.1s linear infinite;
        }

        .perspective { perspective: 1000px; }
      `}</style>
    </div>
  );
};

export default ScalingTab;
