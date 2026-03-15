import { Box, Cpu, Shuffle, Layers, Activity } from 'lucide-react';

export default function Features() {
  const features = [
    {
      name: 'Rapid Provisioning',
      description:
        'Launch fully configured containers in moments. Our optimized, pre-built images boot into a clean, consistent state so you can start working immediately — no manual dependency setup required.',
      icon: Cpu,
    },
    {
      name: 'Interactive Shell',
      description:
        'Access a fully functional terminal directly in your browser. Install packages, run scripts, compile code, and manage files just as you would on a local machine — no SSH clients needed.',
      icon: Box,
    },
    {
      name: 'Automated Port Mapping',
      description:
        'Every container is automatically assigned dedicated ports to prevent conflicts. Run web servers, databases, and APIs simultaneously while the platform handles all networking transparently.',
      icon: Shuffle,
    },
    {
      name: 'Persistent Storage',
      description:
        'Your files, databases, and project data persist across container restarts and sessions. Stop a container, take a break, and return later to find everything exactly as you left it.',
      icon: Layers,
    },
    {
      name: 'Resource Monitoring',
      description:
        'Track container health with real-time CPU, memory, and storage metrics built into the dashboard. Spot performance bottlenecks early and keep your environments running smoothly.',
      icon: Activity,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 py-24 sm:py-32 min-h-screen transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-blue dark:text-blue-400">Deploy faster</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-brand-dark dark:text-white sm:text-4xl">
            Everything you need for sandbox development
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            SSEM provides a complete set of tools to develop, test, and experiment inside fully isolated container environments.
            No risk to your local machine, no complex setup, and no compromise on functionality.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-5xl">
          <div className="grid max-w-xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
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

        {/* Why Choose SSEM */}
        <div className="mx-auto mt-24 max-w-3xl text-center">
          <div className="rounded-2xl bg-gray-50 dark:bg-slate-800 p-10 transition-colors">
            <h3 className="text-2xl font-bold text-brand-dark dark:text-white">Why Choose SSEM?</h3>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              SSEM combines the power of containerized isolation with an intuitive, browser-based interface.
              Whether you are a student experimenting with Linux, a developer testing deployments, or a team
              needing disposable environments — SSEM gives you secure, persistent, and instantly available
              sandboxes without the overhead of traditional virtual machines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
