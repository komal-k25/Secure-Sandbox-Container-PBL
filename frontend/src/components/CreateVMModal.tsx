import { useState } from 'react';
import { X, Plus, Loader2, Server } from 'lucide-react';

interface CreateVMModalProps {
  isOpen: boolean;
  isLoading: boolean;
  canCreate: boolean;
  currentCount: number;
  onClose: () => void;
  onCreate: (name: string) => void;
}

export default function CreateVMModal({ isOpen, isLoading, canCreate, currentCount, onClose, onCreate }: CreateVMModalProps) {
  const [name, setName] = useState('');
  const [validationError, setValidationError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setValidationError('VM name is required.');
      return;
    }
    if (trimmed.length < 2) {
      setValidationError('VM name must be at least 2 characters.');
      return;
    }
    if (trimmed.length > 30) {
      setValidationError('VM name must be 30 characters or fewer.');
      return;
    }
    if (!canCreate) {
      setValidationError('Maximum limit of 3 VMs reached.');
      return;
    }

    setValidationError('');
    onCreate(trimmed);
    setName('');
  };

  const handleClose = () => {
    if (!isLoading) {
      setName('');
      setValidationError('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm animate-fade-in-up"
        style={{ animationDuration: '0.2s' }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="animate-scale-in relative w-full max-w-md rounded-2xl bg-white/95 dark:bg-slate-800/95 glass shadow-2xl border border-gray-200/50 dark:border-slate-700/50 overflow-hidden">
        {/* Gradient header bar */}
        <div className="h-1.5 bg-gradient-to-r from-brand-blue via-indigo-500 to-purple-500 animate-shimmer" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-indigo-600 shadow-lg shadow-blue-500/25">
              <Server className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Create New VM</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Spin up a new sandbox environment</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="rounded-lg p-2 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Slot gauge */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Capacity</span>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{currentCount} / 3 used</span>
          </div>
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-all duration-500 ${
                  i < currentCount
                    ? 'bg-gradient-to-r from-brand-blue to-indigo-500 shadow-sm shadow-blue-500/20'
                    : 'bg-gray-100 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4">
          <div className="mb-5">
            <label htmlFor="vm-name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              VM Name
            </label>
            <input
              type="text"
              id="vm-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (validationError) setValidationError('');
              }}
              placeholder="e.g. dev-server, test-env"
              disabled={isLoading}
              autoFocus
              className="w-full rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50/50 dark:bg-slate-700/50 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-brand-blue/40 dark:focus:ring-blue-400/40 focus:border-brand-blue dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-700
                transition-all duration-200 disabled:opacity-50"
            />
            {validationError && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1 animate-slide-down">
                <span className="h-1 w-1 rounded-full bg-red-500 inline-block" />
                {validationError}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300
                hover:bg-gray-50 dark:hover:bg-slate-600 hover:-translate-y-0.5
                transition-all duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !canCreate}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl
                bg-gradient-to-r from-brand-blue to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white
                shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
                transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating…
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Create VM
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
