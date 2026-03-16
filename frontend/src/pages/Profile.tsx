import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, LogOut, Plus, TerminalSquare, Server, Zap,
  CalendarDays, AlertCircle, X,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useVMs } from '../hooks/useVMs';
import VMCard from '../components/VMCard';
import CreateVMModal from '../components/CreateVMModal';

/* ─── Helper: get user initial ─── */
function getInitial(username: string | null, email: string | null): string {
  if (username) return username.charAt(0).toUpperCase();
  if (email) return email.charAt(0).toUpperCase();
  return 'U';
}

export default function Profile() {
  const navigate = useNavigate();
  const { token, userEmail, username, logout } = useAuth();

  const {
    vms,
    isLoading: vmsLoading,
    actionLoading,
    error,
    canCreate,
    createVM,
    startVM,
    stopVM,
    deleteVM,
    clearError,
  } = useVMs();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  if (!token) return null;

  const handleCreateVM = async (name: string) => {
    await createVM(name);
    setIsModalOpen(false);
  };

  const runningCount = vms.filter((vm) => vm.status === 'running').length;

  const displayName = username || userEmail?.split('@')[0] || 'User';

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50/80 dark:bg-slate-950 transition-colors duration-300">

      {/* ━━━ Gradient Hero Header ━━━ */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 mesh-gradient dark:hidden opacity-90" />
        <div className="absolute inset-0 hidden dark:block mesh-gradient-dark" />

        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-indigo-400/15 blur-2xl animate-float" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

            {/* User identity */}
            <div className="flex items-center gap-4 sm:gap-5 animate-fade-in-up">
              {/* Avatar */}
              <div className="relative">
                <div className="flex h-16 w-16 sm:h-[72px] sm:w-[72px] items-center justify-center rounded-2xl
                  bg-white/20 dark:bg-white/10 glass text-white text-2xl sm:text-3xl font-bold
                  ring-2 ring-white/30 dark:ring-white/15 shadow-xl shadow-black/10">
                  {getInitial(username, userEmail)}
                </div>
                <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-[3px] border-white dark:border-slate-900 shadow" />
              </div>

              <div>
                <p className="text-white/70 dark:text-white/50 text-sm font-medium">Welcome back,</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{displayName}</h1>
                <p className="text-white/60 dark:text-white/40 text-sm mt-0.5">{userEmail || 'user@example.com'}</p>
              </div>
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-3 animate-fade-in-up stagger-2">
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={!canCreate || vmsLoading}
                className="inline-flex items-center gap-2 rounded-xl bg-white/15 dark:bg-white/10 glass px-4 py-2.5 text-sm font-semibold text-white
                  ring-1 ring-white/20 dark:ring-white/10
                  hover:bg-white/25 dark:hover:bg-white/15 hover:ring-white/30
                  disabled:opacity-40 disabled:cursor-not-allowed
                  transition-all duration-200 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                New VM
              </button>
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 dark:bg-white/5 glass px-4 py-2.5 text-sm font-medium text-white/80
                  ring-1 ring-white/15 dark:ring-white/10
                  hover:bg-red-500/20 hover:text-white hover:ring-red-400/30
                  transition-all duration-200 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━ Stats Bar ━━━ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up stagger-2">

          {/* Active VMs */}
          <div className="group rounded-2xl bg-white dark:bg-slate-800/80 glass border border-gray-100 dark:border-slate-700/50 p-5 shadow-lg shadow-gray-200/50 dark:shadow-black/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Active VMs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">
                  {runningCount}
                  <span className="text-sm font-medium text-gray-400 dark:text-gray-500 ml-1">/ {vms.length}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Available Slots */}
          <div className="group rounded-2xl bg-white dark:bg-slate-800/80 glass border border-gray-100 dark:border-slate-700/50 p-5 shadow-lg shadow-gray-200/50 dark:shadow-black/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-indigo-600 shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                <Server className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Available Slots</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">
                  {3 - vms.length}
                  <span className="text-sm font-medium text-gray-400 dark:text-gray-500 ml-1">remaining</span>
                </p>
              </div>
            </div>
          </div>

          {/* Member Since */}
          <div className="group rounded-2xl bg-white dark:bg-slate-800/80 glass border border-gray-100 dark:border-slate-700/50 p-5 shadow-lg shadow-gray-200/50 dark:shadow-black/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                <CalendarDays className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Member Since</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">
                  2026
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ━━━ Main Content ━━━ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Error Banner */}
        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 dark:bg-red-900/20 glass border border-red-200/50 dark:border-red-800/30 p-4 flex justify-between items-center animate-slide-down">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/40">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-sm font-medium text-red-800 dark:text-red-300">{error}</p>
            </div>
            <button
              onClick={clearError}
              className="rounded-lg p-1.5 text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Section header */}
        <div className="flex items-center justify-between mb-6 animate-fade-in-up">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Sandboxes</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage your isolated development environments</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Capacity pills */}
            <div className="hidden sm:flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-2.5 w-8 rounded-full transition-all duration-500 ${
                    i < vms.length
                      ? i < runningCount
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-400 shadow-sm shadow-emerald-400/30'
                        : 'bg-gradient-to-r from-brand-blue to-indigo-500 shadow-sm shadow-blue-400/30'
                      : 'bg-gray-200 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>

            {vms.length > 0 && (
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={!canCreate || vmsLoading}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-blue to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white
                  shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5
                  disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg
                  transition-all duration-200 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                New VM
              </button>
            )}
          </div>
        </div>

        {/* VM Grid / Empty State / Loading */}
        {vmsLoading && vms.length === 0 ? (
          /* Loading skeleton */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-gray-200/60 dark:border-slate-700/40 bg-white/60 dark:bg-slate-800/40 p-6 animate-pulse">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-11 w-11 rounded-xl bg-gray-200 dark:bg-slate-700" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-28 rounded bg-gray-200 dark:bg-slate-700" />
                    <div className="h-3 w-16 rounded bg-gray-100 dark:bg-slate-700/70" />
                  </div>
                </div>
                <div className="h-3 w-24 rounded bg-gray-100 dark:bg-slate-700/70 mb-5" />
                <div className="border-t border-gray-100 dark:border-slate-700/50 pt-4 flex gap-2">
                  <div className="h-10 flex-1 rounded-xl bg-gray-100 dark:bg-slate-700/70" />
                  <div className="h-10 flex-1 rounded-xl bg-gray-100 dark:bg-slate-700/70" />
                  <div className="h-10 w-10 rounded-xl bg-gray-100 dark:bg-slate-700/70" />
                </div>
              </div>
            ))}
          </div>
        ) : vms.length === 0 ? (
          /* Premium empty state */
          <div className="animate-fade-in-up rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/30 glass p-12 sm:p-16 text-center group hover:border-brand-blue/40 dark:hover:border-blue-400/30 transition-all duration-500">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-indigo-500/10 dark:from-blue-500/15 dark:to-indigo-500/15 mb-6 animate-float">
              <TerminalSquare className="h-10 w-10 text-brand-blue dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No sandboxes yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed mb-8">
              Create your first isolated container environment. You can spin up to 3 sandboxes with full desktop access via your browser.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={vmsLoading}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-indigo-600 px-6 py-3 text-sm font-semibold text-white
                shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1
                transition-all duration-300 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Create Your First Sandbox
            </button>
          </div>
        ) : (
          /* VM Card grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vms.map((vm, index) => (
              <VMCard
                key={vm.id}
                vm={vm}
                actionLoading={actionLoading}
                onStart={startVM}
                onStop={stopVM}
                onDelete={deleteVM}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create VM Modal */}
      <CreateVMModal
        isOpen={isModalOpen}
        isLoading={vmsLoading && actionLoading === null}
        canCreate={canCreate}
        currentCount={vms.length}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateVM}
      />
    </div>
  );
}
