import { Play, Square, Trash2, Loader2, Monitor, ExternalLink, Clock } from 'lucide-react';
import type { VM } from '../hooks/useVMs';

interface VMCardProps {
  vm: VM;
  actionLoading: number | null;
  onStart: (id: number) => void;
  onStop: (id: number) => void;
  onDelete: (id: number) => void;
  index?: number;
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export default function VMCard({ vm, actionLoading, onStart, onStop, onDelete, index = 0 }: VMCardProps) {
  const isActing = actionLoading === vm.id;
  const isRunning = vm.status === 'running';

  return (
    <div
      className={`animate-fade-in-up stagger-${Math.min(index + 1, 3)} group relative overflow-hidden rounded-2xl border transition-all duration-500 p-6
        bg-white/80 dark:bg-slate-800/60 glass
        ${isRunning
          ? 'border-emerald-200/60 dark:border-emerald-800/40 shadow-lg shadow-emerald-500/[0.07]'
          : 'border-gray-200/80 dark:border-slate-700/60'
        }
        hover:shadow-xl hover:-translate-y-1 hover:border-brand-blue/30 dark:hover:border-blue-400/30`}
    >
      {/* Top accent bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] transition-all duration-500 ${
          isRunning
            ? 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400'
            : 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700'
        }`}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3.5">
          <div className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 ${
            isRunning
              ? 'bg-gradient-to-br from-emerald-500/15 to-teal-500/15 text-emerald-500 dark:from-emerald-500/20 dark:to-teal-500/20'
              : 'bg-gradient-to-br from-brand-blue/10 to-indigo-500/10 text-brand-blue dark:text-blue-400 dark:from-blue-500/15 dark:to-indigo-500/15'
          } group-hover:scale-110`}>
            <Monitor className="h-5 w-5" />
            {isRunning && (
              <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800 animate-pulse" />
            )}
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white leading-tight">{vm.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-slate-700/70 px-2 py-0.5 text-[11px] font-mono font-medium text-gray-600 dark:text-gray-300">
                :{vm.port}
              </span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
            isRunning
              ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20 dark:ring-emerald-400/25'
              : 'bg-gray-50 dark:bg-slate-700/80 text-gray-500 dark:text-gray-400 ring-1 ring-gray-200 dark:ring-slate-600'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${
            isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400 dark:bg-gray-500'
          }`} />
          {isRunning ? 'Running' : 'Stopped'}
        </span>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 mb-5">
        <Clock className="h-3 w-3" />
        <span>Created {timeAgo(vm.created_at)}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-gray-100/80 dark:border-slate-700/50">

        {/* Visit Button */}
        <a
          href={isRunning ? vm.vnc_link : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200
            ${isRunning
              ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-200/80 dark:ring-emerald-500/25 hover:shadow-md hover:shadow-emerald-500/10 hover:-translate-y-0.5 cursor-pointer'
              : 'bg-gray-50 dark:bg-slate-800/50 text-gray-400 dark:text-gray-600 ring-1 ring-gray-200 dark:ring-slate-700 cursor-not-allowed opacity-50'
            }`}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open Desktop
        </a>

        {/* Start/Stop Toggle */}
        {isRunning ? (
          <button
            onClick={() => onStop(vm.id)}
            disabled={isActing}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-semibold
              bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20
              text-amber-700 dark:text-amber-400
              ring-1 ring-amber-200/80 dark:ring-amber-500/25
              hover:shadow-md hover:shadow-amber-500/10 hover:-translate-y-0.5
              disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none
              transition-all duration-200 cursor-pointer"
          >
            {isActing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Square className="h-3.5 w-3.5" />}
            Stop
          </button>
        ) : (
          <button
            onClick={() => onStart(vm.id)}
            disabled={isActing}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-semibold
              bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20
              text-brand-blue dark:text-blue-400
              ring-1 ring-blue-200/80 dark:ring-blue-500/25
              hover:shadow-md hover:shadow-blue-500/10 hover:-translate-y-0.5
              disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none
              transition-all duration-200 cursor-pointer"
          >
            {isActing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
            Start
          </button>
        )}

        {/* Delete Button */}
        <button
          onClick={() => onDelete(vm.id)}
          disabled={isActing}
          className="inline-flex items-center justify-center rounded-xl p-2.5 text-xs font-semibold
            bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20
            text-red-600 dark:text-red-400
            ring-1 ring-red-200/80 dark:ring-red-500/25
            hover:shadow-md hover:shadow-red-500/10 hover:-translate-y-0.5
            disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none
            transition-all duration-200 cursor-pointer"
        >
          {isActing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}