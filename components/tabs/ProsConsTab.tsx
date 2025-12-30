
import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, ArrowUpRight, Network } from 'lucide-react';

const CARDS = [
  {
    title: 'Centralized Control',
    type: 'pro',
    icon: <ShieldCheck className="w-8 h-8 text-green-400" />,
    front: 'Why is it good for management?',
    back: 'Security, data integrity, and software updates are handled at the server. No need to update thousands of clients individually.',
  },
  {
    title: 'Single Point of Failure',
    type: 'con',
    icon: <AlertTriangle className="w-8 h-8 text-red-400" />,
    front: 'What happens if the server dies?',
    back: 'If the central server goes offline, all connected clients lose access to the service. This is why high-availability clusters are vital.',
  },
  {
    title: 'Horizontal Scalability',
    type: 'pro',
    icon: <ArrowUpRight className="w-8 h-8 text-cyan-400" />,
    front: 'How do we handle 1M users?',
    back: 'We can add more servers behind a load balancer to distribute the load, allowing the system to grow with demand.',
  },
  {
    title: 'Network Dependency',
    type: 'con',
    icon: <Network className="w-8 h-8 text-orange-400" />,
    front: 'Can it work offline?',
    back: 'The architecture heavily relies on network performance. High latency or congestion directly impacts the user experience.',
  },
];

const FlipCard: React.FC<{ card: typeof CARDS[0] }> = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group perspective h-64 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-slate-900 border-2 border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-4 hover:border-slate-700 transition-colors">
          <div className="p-3 bg-slate-800 rounded-2xl">
            {card.icon}
          </div>
          <h3 className="text-xl font-bold text-slate-100">{card.title}</h3>
          <p className="text-sm text-slate-500 italic">{card.front}</p>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mt-2">Click to Reveal</span>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-800 border-2 border-cyan-500/50 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
          <span className={`text-xs font-bold uppercase mb-4 ${card.type === 'pro' ? 'text-green-400' : 'text-red-400'}`}>
            {card.type === 'pro' ? 'The Advantage' : 'The Challenge'}
          </span>
          <p className="text-slate-200 leading-relaxed font-medium">
            {card.back}
          </p>
        </div>
      </div>
    </div>
  );
};

const ProsConsTab: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold text-white">Trade-offs & Realities</h2>
        <p className="text-slate-400">
          No architecture is perfect. System design is about making the right trade-offs for your specific use case.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CARDS.map((card, idx) => (
          <FlipCard key={idx} card={card} />
        ))}
      </div>

      <style>{`
        .perspective { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default ProsConsTab;
