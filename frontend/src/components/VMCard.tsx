import { Play, Square, Trash2, Loader2, Monitor, ExternalLink } from 'lucide-react';
import type { VM } from '../hooks/useVMs';

interface VMCardProps {
  vm: VM;
  actionLoading: number | null;
  onStart: (id: number) => void;
  onStop: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function VMCard({ vm, actionLoading, onStart, onStop, onDelete }: VMCardProps) {
  const isActing = actionLoading === vm.id;
  const isRunning = vm.status === 'running';

  return (
    <div className={`group rounded-2xl border transition-all duration-300 p-6 bg-white dark:bg-slate-800 
      ${isRunning
        ? 'border-emerald-200 dark:border-emerald-900/30 shadow-md shadow-emerald-500/5'
        : 'border-gray-200 dark:border-slate-700'
      } hover:shadow-lg hover:border-brand-blue/30 dark:hover:border-blue-400/30`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors
            ${isRunning ? 'bg-emerald-500/10 text-emerald-500' : 'bg-brand-blue/10 text-brand-blue dark:text-blue-400'}`}>
            <Monitor className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">{vm.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Port: <span className="font-mono font-medium text-gray-700 dark:text-gray-300">{vm.port}</span>
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${isRunning
            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 ring-1 ring-inset ring-emerald-600/20 dark:ring-emerald-400/30'
            : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-500/10 dark:ring-slate-600'
            }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400 dark:bg-gray-500'
              }`}
          />
          {isRunning ? 'Running' : 'Stopped'}
        </span>
      </div>

      {/* Meta */}
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
        Created {new Date(vm.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-slate-700">

        {/* Visit Button - Only enabled if running */}
        <a
          href={isRunning ? vm.vnc_link : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ring-1 ring-inset transition-all
            ${isRunning
              ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 ring-emerald-600/20 dark:ring-emerald-400/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 cursor-pointer'
              : 'bg-gray-50 dark:bg-slate-800/50 text-gray-400 dark:text-gray-600 ring-gray-200 dark:ring-slate-700 cursor-not-allowed opacity-60'
            }`}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Visit
        </a>

        {/* Start/Stop Toggle */}
        {isRunning ? (
          <button
            onClick={() => onStop(vm.id)}
            disabled={isActing}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 px-3 py-2 text-xs font-semibold text-amber-700 dark:text-amber-400 ring-1 ring-inset ring-amber-600/20 dark:ring-amber-400/30 hover:bg-amber-100 dark:hover:bg-amber-900/40 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {isActing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Square className="h-3.5 w-3.5" />}
            Stop
          </button>
        ) : (
          <button
            onClick={() => onStart(vm.id)}
            disabled={isActing}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-blue/10 dark:bg-blue-400/10 px-3 py-2 text-xs font-semibold text-brand-blue dark:text-blue-400 ring-1 ring-inset ring-brand-blue/20 dark:ring-blue-400/30 hover:bg-brand-blue/20 dark:hover:bg-blue-400/20 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {isActing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
            Start
          </button>
        )}

        {/* Delete Button */}
        <button
          onClick={() => onDelete(vm.id)}
          disabled={isActing}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 px-3 py-2 text-xs font-semibold text-red-700 dark:text-red-400 ring-1 ring-inset ring-red-600/20 dark:ring-red-400/30 hover:bg-red-100 dark:hover:bg-red-900/40 disabled:opacity-50 transition-colors cursor-pointer"
        >
          {isActing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}