
import React, { useState } from 'react';
import { Globe, Mail, Landmark, Shield, Cpu, Lock, Activity } from 'lucide-react';

const EXAMPLES = [
  {
    id: 'web',
    title: 'Web Browsing',
    icon: <Globe className="w-10 h-10 text-blue-400" />,
    desc: 'The classic example. Your browser (client) requests HTML/CSS/JS from a server via HTTP.',
    protocol: 'HTTP / HTTPS',
    details: 'The server returns static assets or dynamic data that the browser then renders for the user.'
  },
  {
    id: 'email',
    title: 'Email Systems',
    icon: <Mail className="w-10 h-10 text-indigo-400" />,
    desc: 'Sending and receiving mail involves specialized servers handling transport and storage.',
    protocol: 'SMTP / IMAP / POP3',
    details: 'SMTP is used for sending, while IMAP/POP3 allows the client to fetch messages from the server storage.'
  },
  {
    id: 'banking',
    title: 'Digital Banking',
    icon: <Landmark className="w-10 h-10 text-teal-400" />,
    desc: 'High-security environments where transaction integrity and encryption are paramount.',
    protocol: 'Mutual TLS / RPC',
    details: 'Heavy focus on ACID compliance (Atomicity, Consistency, Isolation, Durability) at the server database level.'
  }
];

const ExamplesTab: React.FC = () => {
  const [selected, setSelected] = useState(EXAMPLES[0]);

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold text-white">Real-World Application</h2>
        <p className="text-slate-400">
          Client-Server architecture is everywhere. See how different domains implement the same basic pattern.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EXAMPLES.map((ex) => (
          <button
            key={ex.id}
            onClick={() => setSelected(ex)}
            className={`
              p-6 rounded-3xl border-2 text-left transition-all duration-300
              ${selected.id === ex.id 
                ? 'bg-slate-800 border-cyan-500 shadow-xl shadow-cyan-500/10' 
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }
            `}
          >
            <div className="mb-4">{ex.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{ex.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">{ex.desc}</p>
            <div className="inline-block px-3 py-1 rounded-full bg-slate-950 text-[10px] font-black text-cyan-400 uppercase tracking-widest border border-cyan-900/50">
              {ex.protocol}
            </div>
          </button>
        ))}
      </div>

      <div className="relative bg-slate-900/80 rounded-3xl border border-slate-800 p-8 md:p-12 overflow-hidden animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 space-y-6">
            <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
              {selected.icon}
              {selected.title} Flow
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed">
              {selected.details}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Shield className="w-5 h-5 text-cyan-500" />
                <span>Encrypted Transport Layer</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Cpu className="w-5 h-5 text-cyan-500" />
                <span>Distributed Logic Processing</span>
              </div>
              {selected.id === 'banking' && (
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <Lock className="w-5 h-5 text-red-500" />
                  <span>Two-Factor Authentication (MFA) Integration</span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/3 flex justify-center">
            {/* Contextual Visual */}
            <div className="relative w-48 h-48">
               <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
               <div className="relative bg-slate-800 border-2 border-slate-700 rounded-3xl w-full h-full flex items-center justify-center p-8">
                  {selected.id === 'web' && <Globe className="w-24 h-24 text-blue-400" />}
                  {selected.id === 'email' && <Mail className="w-24 h-24 text-indigo-400" />}
                  {selected.id === 'banking' && <Landmark className="w-24 h-24 text-teal-400" />}
               </div>
               
               {/* Orbits */}
               <div className="absolute -top-4 -right-4 bg-slate-950 border border-slate-700 p-2 rounded-xl shadow-lg">
                  <Lock className="w-6 h-6 text-green-500" />
               </div>
               <div className="absolute -bottom-4 -left-4 bg-slate-950 border border-slate-700 p-2 rounded-xl shadow-lg">
                  <Activity className="w-6 h-6 text-cyan-500" />
               </div>
            </div>
          </div>
        </div>
        
        {/* Background Graphic */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-0.5 bg-gradient-to-r from-transparent via-slate-800 to-transparent -rotate-12" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-0.5 bg-gradient-to-r from-transparent via-slate-800 to-transparent rotate-12" />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ExamplesTab;
