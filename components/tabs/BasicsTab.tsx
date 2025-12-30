
import React, { useState } from 'react';
import { Laptop, Cloud, Database, HelpCircle } from 'lucide-react';

const ROLES = [
  {
    id: 'client',
    title: 'The Client',
    icon: <Laptop className="w-12 h-12 text-blue-400" />,
    role: 'Requester',
    description: 'The endpoint where users interact with the system. It initiates the communication by sending requests.',
    examples: ['Web Browser', 'Mobile App', 'Smart TV', 'CLI Tool']
  },
  {
    id: 'network',
    title: 'The Network',
    icon: <Cloud className="w-12 h-12 text-cyan-400" />,
    role: 'Mediator',
    description: 'The medium through which messages are transported using protocols like HTTP, TCP/IP, or WebSockets.',
    examples: ['Internet', 'LAN', '5G / Wi-Fi', 'Fiber Optics']
  },
  {
    id: 'server',
    title: 'The Server',
    icon: <Database className="w-12 h-12 text-teal-400" />,
    role: 'Provider',
    description: 'A powerful central machine that listens for requests, processes logic, manages data, and sends back responses.',
    examples: ['Web Server', 'API Gateway', 'Database Server', 'Auth Server']
  }
];

const BasicsTab: React.FC = () => {
  const [activeRole, setActiveRole] = useState<string | null>(null);

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold text-white">Understanding the Core</h2>
        <p className="text-slate-400 text-lg">
          The Client-Server model is a distributed application structure that partitions tasks or workloads between the providers of a resource or service (servers) and service requesters (clients).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-1/3 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-blue-500/20 via-cyan-500/40 to-teal-500/20 -z-10" />
        
        {ROLES.map((role) => (
          <div 
            key={role.id}
            onMouseEnter={() => setActiveRole(role.id)}
            onMouseLeave={() => setActiveRole(null)}
            className={`
              relative group cursor-pointer transition-all duration-300
              p-8 rounded-2xl border-2 flex flex-col items-center text-center
              ${activeRole === role.id 
                ? 'bg-slate-800/80 border-cyan-500 shadow-2xl shadow-cyan-500/10 -translate-y-2' 
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }
            `}
          >
            <div className={`
              p-4 rounded-xl mb-4 transition-all duration-300
              ${activeRole === role.id ? 'bg-cyan-500/20 scale-110' : 'bg-slate-800'}
            `}>
              {role.icon}
            </div>
            
            <h3 className="text-xl font-bold text-slate-100 mb-1">{role.title}</h3>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-500 mb-4">{role.role}</span>
            
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              {role.description}
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-auto">
              {role.examples.map(ex => (
                <span key={ex} className="px-2 py-1 rounded-md bg-slate-950 text-[10px] text-slate-500 font-medium">
                  {ex}
                </span>
              ))}
            </div>

            {/* Hover Tooltip/Modal Indicator */}
            <div className="absolute top-4 right-4 text-slate-600 group-hover:text-cyan-500 transition-colors">
              <HelpCircle className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-cyan-950/20 border border-cyan-900/50 p-6 rounded-2xl flex items-start gap-4">
        <div className="bg-cyan-500/20 p-2 rounded-lg mt-1">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h4 className="font-semibold text-cyan-300 mb-1">Key Insight</h4>
          <p className="text-sm text-cyan-200/70 leading-relaxed">
            Unlike Peer-to-Peer (P2P), where nodes are equal, the Client-Server model creates a hierarchy. 
            One server typically serves many clients, allowing for centralized security, data management, and updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasicsTab;
