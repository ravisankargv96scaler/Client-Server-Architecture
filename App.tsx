
import React, { useState } from 'react';
import { 
  BookOpen, 
  RefreshCcw, 
  Layers, 
  BarChart3, 
  CheckCircle2, 
  Globe,
  Layout
} from 'lucide-react';
import { TabType, TabConfig } from './types';
import BasicsTab from './components/tabs/BasicsTab';
import LifecycleTab from './components/tabs/LifecycleTab';
import TiersTab from './components/tabs/TiersTab';
import ScalingTab from './components/tabs/ScalingTab';
import ProsConsTab from './components/tabs/ProsConsTab';
import ExamplesTab from './components/tabs/ExamplesTab';

const TABS: TabConfig[] = [
  { id: TabType.BASICS, label: 'The Basics', icon: <BookOpen className="w-5 h-5" /> },
  { id: TabType.LIFECYCLE, label: 'Lifecycle', icon: <RefreshCcw className="w-5 h-5" /> },
  { id: TabType.TIERS, label: 'Tiers', icon: <Layers className="w-5 h-5" /> },
  { id: TabType.SCALING, label: 'Scaling', icon: <BarChart3 className="w-5 h-5" /> },
  { id: TabType.PROS_CONS, label: 'Pros & Cons', icon: <CheckCircle2 className="w-5 h-5" /> },
  { id: TabType.EXAMPLES, label: 'Examples', icon: <Globe className="w-5 h-5" /> },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.BASICS);

  const renderContent = () => {
    switch (activeTab) {
      case TabType.BASICS: return <BasicsTab />;
      case TabType.LIFECYCLE: return <LifecycleTab />;
      case TabType.TIERS: return <TiersTab />;
      case TabType.SCALING: return <ScalingTab />;
      case TabType.PROS_CONS: return <ProsConsTab />;
      case TabType.EXAMPLES: return <ExamplesTab />;
      default: return <BasicsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center p-4 md:p-8">
      {/* Header */}
      <header className="w-full max-w-6xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-cyan-500 p-2 rounded-lg shadow-lg shadow-cyan-500/20">
              <Layout className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-100">
              System Design <span className="text-cyan-400 font-extrabold">Explorer</span>
            </h1>
          </div>
          <p className="text-slate-400 text-sm">Interactive guide to Client-Server Architecture</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400">
            v1.0.0 Stable
          </div>
          <div className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-xs text-cyan-400">
            Education Mode
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="w-full max-w-6xl mb-8 overflow-x-auto">
        <div className="flex space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800/50 min-w-max">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${activeTab === tab.id 
                  ? 'bg-slate-800 text-cyan-400 shadow-sm border border-slate-700/50' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="w-full max-w-6xl flex-1 bg-slate-900/40 rounded-3xl border border-slate-800/50 backdrop-blur-sm p-6 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {renderContent()}
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
      </main>

      {/* Footer */}
      <footer className="mt-8 text-slate-500 text-xs flex gap-6 pb-8">
        <p>© 2024 System Design Academy</p>
        <p>Built with React & Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
