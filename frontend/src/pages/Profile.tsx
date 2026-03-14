import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, TerminalSquare } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const navigate = useNavigate();
  const { token, userEmail, logout } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  if (!token) return null; // Prevent flicker

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-[calc(100vh-64px)] py-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight flex items-center gap-3">
              <User className="h-8 w-8 text-brand-blue" />
              Welcome back
            </h2>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <button
              onClick={logout}
              className="ml-3 inline-flex items-center rounded-md bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 flex gap-2 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="mt-8">
          <div className="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg border border-gray-100 dark:border-slate-700 transition-colors duration-200">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">User Profile</h3>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                <p>Logged in as: <span className="font-medium text-gray-900 dark:text-white">{userEmail || 'user@example.com'}</span></p>
              </div>
              
              <div className="mt-10">
                 <div className="flex items-center justify-between">
                   <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Your Sandbox Instances</h3>
                   <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/40 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-400/30">
                      0 / 3 Active
                   </span>
                 </div>
                 
                 {/* Placeholder for VM List */}
                 <div className="mt-4 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-lg p-12 text-center transition-colors">
                    <TerminalSquare className="mx-auto h-12 w-12 text-gray-400 dark:text-slate-500" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No instances running</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new sandbox container.</p>
                    <div className="mt-6">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-brand-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                      >
                        Create VM
                      </button>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
