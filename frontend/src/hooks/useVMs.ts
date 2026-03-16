import { useState, useCallback, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface VM {
  id: number;
  name: string;
  status: 'running' | 'stopped';
  port: number;
  vnc_link: string;
  created_at: string;
}

interface UseVMsReturn {
  vms: VM[];
  isLoading: boolean;
  actionLoading: number | null;
  error: string | null;
  canCreate: boolean;
  fetchVMs: () => Promise<void>;
  createVM: (name: string) => Promise<void>;
  startVM: (id: number) => Promise<void>;
  stopVM: (id: number) => Promise<void>;
  deleteVM: (id: number) => Promise<void>;
  clearError: () => void;
}

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export function useVMs(): UseVMsReturn {
  const [vms, setVMs] = useState<VM[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);
  const canCreate = vms.length < 3;

  /**
   * Helper to handle response parsing safely.
   * Prevents "Unexpected token <" error by checking content-type.
   */
  const handleResponse = async (res: Response) => {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    }
    return { error: `Server returned ${res.status}: Not a JSON response` };
  };

  // ── 1. Fetch VMs ──
  const fetchVMs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/vms`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch VMs (Status: ${res.status})`);
      }

      const data = await handleResponse(res);

      const vmsData = data.vms || data;
      if (!Array.isArray(vmsData)) {
        throw new Error(data.error || "Invalid data format received");
      }

      const mapped: VM[] = vmsData.map((vm: any) => ({
        id: vm.id,
        name: vm.name,
        status: vm.status,
        port: vm.vnc_port,
        vnc_link: vm.vnc_link,
        created_at: vm.created_at,
      }));
      setVMs(mapped);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── 2. Create VM ──
  const createVM = useCallback(async (name: string) => {
    if (vms.length >= 3) {
      setError('Maximum limit of 3 VMs reached.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/vms`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ name }),
      });

      const data = await handleResponse(res);
      if (!res.ok) throw new Error(data.error || 'Failed to create VM');

      await fetchVMs();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [vms.length, fetchVMs]);

  // ── 3. Status Update ──
  const updateStatus = useCallback(async (id: number, newStatus: 'running' | 'stopped') => {
    setActionLoading(id);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/vms/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await handleResponse(res);
      if (!res.ok) throw new Error(data.error || `Failed to ${newStatus} VM`);

      await fetchVMs();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  }, [fetchVMs]);

  // ── 4. Delete VM ──
  const deleteVM = useCallback(async (id: number) => {
    if (!window.confirm("Are you sure? This will permanently delete the container.")) return;

    setActionLoading(id);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/vms/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      const data = await handleResponse(res);
      if (!res.ok) throw new Error(data.error || 'Failed to delete VM');

      await fetchVMs();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  }, [fetchVMs]);

  useEffect(() => {
    fetchVMs();
  }, [fetchVMs]);

  return {
    vms,
    isLoading,
    actionLoading,
    error,
    canCreate,
    fetchVMs,
    createVM,
    startVM: (id: number) => updateStatus(id, 'running'),
    stopVM: (id: number) => updateStatus(id, 'stopped'),
    deleteVM,
    clearError,
  };
}