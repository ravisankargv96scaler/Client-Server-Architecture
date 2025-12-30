
import React, { useState, useEffect } from 'react';
import { Send, Monitor, Server, Mail, CheckCircle2, Loader2 } from 'lucide-react';

type CycleState = 'idle' | 'request' | 'processing' | 'response' | 'rendered';

const LifecycleTab: React.FC = () => {
  const [cycle, setCycle] = useState<CycleState>('idle');
  const [progress, setProgress] = useState(0);

  const startSimulation = () => {
    if (cycle !== 'idle' && cycle !== 'rendered') return;
    
    setCycle('request');
    setProgress(0);
  };

  useEffect(() => {
    // Fixed: Use ReturnType<typeof setTimeout> instead of NodeJS.Timeout to avoid namespace errors in browser environments
    let timeout: ReturnType<typeof setTimeout>;

    if (cycle === 'request') {
      timeout = setTimeout(() => {
        setCycle('processing');
      }, 1500);
    } else if (cycle === 'processing') {
      timeout = setTimeout(() => {
        setCycle('response');
      }, 2000);
    } else if (cycle === 'response') {
      timeout = setTimeout(() => {
        setCycle('rendered');
      }, 1500);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [cycle]);

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold text-white">The Request-Response Cycle</h2>
        <p className="text-slate-400">
          The heartbeat of the internet. Watch how a simple click turns into visible data on your screen.
        </p>
      </div>

      <div className="relative bg-slate-900/60 rounded-3xl p-10 border border-slate-800 overflow-hidden">
        {/* The Track */}
        <div className="flex items-center justify-between relative z-10">
          {/* Client Side */}
          <div className="flex flex-col items-center gap-4 w-1/4">
            <div className={`
              p-6 rounded-2xl transition-all duration-500
              ${cycle === 'rendered' ? 'bg-green-500/20 border-green-500 shadow-green-500/20' : 'bg-slate-800 border-slate-700'}
              border-2
            `}>
              <Monitor className={`w-12 h-12 ${cycle === 'rendered' ? 'text-green-400' : 'text-slate-300'}`} />
            </div>
            <div className="text-center">
              <span className="font-bold text-slate-200 block">User Client</span>
              <span className="text-xs text-slate-500">Browser / App</span>
            </div>
          </div>

          {/* Path Line */}
          <div className="flex-1 h-1 bg-slate-800 relative mx-4">
            {/* Moving Packet - Request */}
            {cycle === 'request' && (
              <div className="absolute top-1/2 -translate-y-1/2 left-0 animate-[moveRight_1.5s_linear_infinite] flex flex-col items-center">
                <Mail className="w-6 h-6 text-cyan-400 mb-1" />
                <span className="text-[10px] font-bold text-cyan-500">GET /data</span>
              </div>
            )}
            
            {/* Moving Packet - Response */}
            {cycle === 'response' && (
              <div className="absolute top-1/2 -translate-y-1/2 right-0 animate-[moveLeft_1.5s_linear_infinite] flex flex-col items-center">
                <Mail className="w-6 h-6 text-green-400 mb-1" />
                <span className="text-[10px] font-bold text-green-500">200 OK</span>
              </div>
            )}
          </div>

          {/* Server Side */}
          <div className="flex flex-col items-center gap-4 w-1/4">
            <div className={`
              p-6 rounded-2xl transition-all duration-500
              ${cycle === 'processing' ? 'bg-cyan-500/20 border-cyan-500 animate-pulse' : 'bg-slate-800 border-slate-700'}
              border-2
            `}>
              {cycle === 'processing' ? (
                <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
              ) : (
                // Fixed: Removed redundant cycle === 'processing' check since this branch is only reached when cycle is not 'processing'
                <Server className="w-12 h-12 text-slate-300" />
              )}
            </div>
            <div className="text-center">
              <span className="font-bold text-slate-200 block">Backend Server</span>
              <span className="text-xs text-slate-500">API / Logic</span>
            </div>
          </div>
        </div>

        {/* Status Overlay */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-950/50 border border-slate-800 text-center min-h-[100px] flex flex-col justify-center">
          <p className="text-lg font-medium text-slate-300">
            {cycle === 'idle' && "Ready to simulate. Click the button to start."}
            {cycle === 'request' && "Sending HTTP Request over the network..."}
            {cycle === 'processing' && "Server is processing request, checking DB, and preparing JSON payload..."}
            {cycle === 'response' && "Sending JSON response back to the client..."}
            {cycle === 'rendered' && "Response received! Client is rendering the data to the UI."}
          </p>
          {cycle === 'rendered' && (
            <div className="mt-4 animate-bounce flex items-center justify-center gap-2 text-green-400 font-bold">
              <CheckCircle2 className="w-5 h-5" />
              <span>Data successfully loaded!</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={startSimulation}
          disabled={cycle !== 'idle' && cycle !== 'rendered'}
          className={`
            flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all
            ${cycle === 'idle' || cycle === 'rendered'
              ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-xl shadow-cyan-500/20 active:scale-95'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }
          `}
        >
          <Send className="w-5 h-5" />
          Send HTTP Request
        </button>
      </div>

      <style>{`
        @keyframes moveRight {
          from { left: 0%; opacity: 1; }
          to { left: 100%; opacity: 1; }
        }
        @keyframes moveLeft {
          from { right: 0%; opacity: 1; }
          to { right: 100%; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LifecycleTab;
