import { Shield, Lock, Server, KeyRound } from 'lucide-react';

export default function Security() {
  const securityFeatures = [
    {
      name: 'Process Isolation',
      description:
        'Every container runs in its own isolated process space using kernel-level control groups and namespaces. No container can access, interfere with, or observe processes in another sandbox.',
      icon: Lock,
    },
    {
      name: 'Network Segmentation',
      description:
        'Each sandbox receives dynamically allocated ports with strict traffic isolation. External traffic is bound to designated endpoints, and internal container traffic never leaks to the host network.',
      icon: Shield,
    },
    {
      name: 'Encrypted Storage',
      description:
        'All persistent data is protected with industry-standard encryption. Storage volumes are isolated per-user and per-container, ensuring no other tenant can access your files or databases.',
      icon: Server,
    },
    {
      name: 'Access Control',
      description:
        'Token-based authentication verifies every request with session-level security. Role-based permissions restrict actions to authorized users, and all significant operations are logged for audit.',
      icon: KeyRound,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 py-24 sm:py-32 min-h-screen transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-blue dark:text-blue-400">Security First</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Enterprise-grade isolation
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Security is not an afterthought at SSEM — it is the foundation of everything we build.
            Every container runs in a fully protected environment distinct from the host system and every other user on the platform.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {securityFeatures.map((feature) => (
              <div
                key={feature.name}
                className="group rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-slate-750 hover:border-brand-blue/30 dark:hover:border-blue-400/30 hover:shadow-lg hover:shadow-brand-blue/5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-blue mb-5">
                  <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}