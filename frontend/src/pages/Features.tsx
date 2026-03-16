import { Box, Cpu, Shuffle, Layers, Activity, CheckCircle, ArrowRight, Gauge, Code, Globe, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const features = [
  { name: 'Rapid Provisioning', description: 'Launch fully configured containers in moments. Our optimized, pre-built images boot into a clean, consistent state so you can start working immediately.', icon: Cpu },
  { name: 'Interactive Shell', description: 'Access a fully functional graphical desktop directly in your browser. Install packages, run scripts, compile code, and manage files — no SSH needed.', icon: Box },
  { name: 'Automated Port Mapping', description: 'Every container gets dedicated ports to prevent conflicts. Run web servers, databases, and APIs simultaneously while the platform handles networking.', icon: Shuffle },
  { name: 'Persistent Storage', description: 'Your files, databases, and project data persist across container restarts. Stop a container, return later, and find everything exactly as you left it.', icon: Layers },
  { name: 'Resource Monitoring', description: 'Track container health with real-time CPU, memory, and storage metrics built into the dashboard. Spot bottlenecks early and keep environments smooth.', icon: Activity },
  { name: 'One-Click Cleanup', description: 'Delete containers with a single click. Resources are freed instantly, compose files are removed, and database records are cleaned automatically.', icon: Zap },
];

const comparisons = [
  { feature: 'Boot time', ssem: '< 10 seconds', traditional: '2–5 minutes', better: true },
  { feature: 'Resource overhead', ssem: '~200 MB RAM', traditional: '2–4 GB RAM', better: true },
  { feature: 'Browser access', ssem: 'Built-in noVNC', traditional: 'Requires SSH / RDP client', better: true },
  { feature: 'Max instances', ssem: '3 per user', traditional: 'Hardware limited', better: false },
  { feature: 'Isolation level', ssem: 'Container (cgroups + namespaces)', traditional: 'Full hypervisor', better: false },
  { feature: 'Persistence', ssem: 'Volume mounts', traditional: 'Full disk image', better: false },
  { feature: 'Setup complexity', ssem: 'Zero config', traditional: 'ISO + drivers + config', better: true },
  { feature: 'Portability', ssem: 'Any browser', traditional: 'Platform-specific client', better: true },
];

const useCases = [
  { title: 'Students & Learners', description: 'Practice Linux, networking, and coding in a safe environment. Break things without consequences — just delete and recreate.', icon: Code, color: 'from-blue-500 to-indigo-600' },
  { title: 'Developers', description: 'Test deployments, experiment with packages, or run staging environments. Keep your local machine clean and unaffected.', icon: Globe, color: 'from-emerald-500 to-teal-600' },
  { title: 'Security Teams', description: 'Analyze suspicious software in fully isolated sandboxes. Each container is walled off at the kernel level.', icon: Shield, color: 'from-purple-500 to-pink-600' },
];

export default function Features() {
  const gridReveal = useReveal();
  const compareReveal = useReveal();
  const useCaseReveal = useReveal();
  const whyReveal = useReveal();

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors duration-200">

      {/* ━━━ Hero ━━━ */}
      <div className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 via-transparent to-transparent dark:from-brand-blue/10" />
        <div className="absolute top-10 -right-40 h-80 w-80 rounded-full bg-indigo-500/8 dark:bg-indigo-500/5 blur-3xl animate-float-slow" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 px-4 py-1.5 mb-6 ring-1 ring-brand-blue/20">
              <Gauge className="h-4 w-4 text-brand-blue" />
              <span className="text-sm font-semibold text-brand-blue dark:text-blue-400">Platform Features</span>
            </div>
            <h1 className="animate-fade-in-up stagger-1 text-3xl font-bold tracking-tight text-brand-dark dark:text-white sm:text-5xl">
              Everything you need for
              <span className="gradient-text"> sandbox development</span>
            </h1>
            <p className="animate-fade-in-up stagger-2 mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              SSEM provides a complete set of tools to develop, test, and experiment inside fully isolated container environments. No risk, no fuss, full functionality.
            </p>
          </div>
        </div>
      </div>

      {/* ━━━ Feature Grid ━━━ */}
      <div ref={gridReveal.ref} className="pb-24 sm:pb-32">
        <div className={`mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-700 ${gridReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid max-w-xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={feature.name}
                className="card-glow group rounded-2xl border border-gray-200/80 dark:border-slate-700/50 bg-white dark:bg-slate-800/60 p-8"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-indigo-600 shadow-lg shadow-blue-500/20 mb-5 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.name}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━ Comparison Table ━━━ */}
      <div ref={compareReveal.ref} className="py-24 sm:py-32 bg-gray-50/80 dark:bg-slate-800/30 transition-colors">
        <div className={`mx-auto max-w-5xl px-6 lg:px-8 transition-all duration-700 ${compareReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="text-base font-semibold text-brand-blue dark:text-blue-400 uppercase tracking-wider">Comparison</h2>
            <p className="mt-2 text-3xl font-bold text-brand-dark dark:text-white sm:text-4xl">SSEM vs Traditional VMs</p>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">See how container-based sandboxes compare to heavy virtual machines for development workflows.</p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/60 shadow-lg">
            {/* Table header */}
            <div className="grid grid-cols-3 bg-gray-50 dark:bg-slate-700/40 border-b border-gray-200 dark:border-slate-700/50">
              <div className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Feature</div>
              <div className="px-6 py-4 text-sm font-bold text-brand-blue dark:text-blue-400 text-center">SSEM</div>
              <div className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 text-center">Traditional VM</div>
            </div>
            {/* Table rows */}
            {comparisons.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 ${i < comparisons.length - 1 ? 'border-b border-gray-100 dark:border-slate-700/30' : ''} hover:bg-gray-50/50 dark:hover:bg-slate-700/20 transition-colors`}>
                <div className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{row.feature}</div>
                <div className="px-6 py-4 text-sm text-center flex items-center justify-center gap-1.5">
                  {row.better && <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />}
                  <span className={row.better ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}>{row.ssem}</span>
                </div>
                <div className="px-6 py-4 text-sm text-center flex items-center justify-center gap-1.5">
                  {!row.better && <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />}
                  <span className={!row.better ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}>{row.traditional}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━ Use Cases ━━━ */}
      <div ref={useCaseReveal.ref} className="py-24 sm:py-32 bg-white dark:bg-slate-900 transition-colors">
        <div className={`mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-700 ${useCaseReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-brand-blue dark:text-blue-400 uppercase tracking-wider">Who It's For</h2>
            <p className="mt-2 text-3xl font-bold text-brand-dark dark:text-white sm:text-4xl">Built for Every Developer</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((uc, i) => (
              <div key={uc.title} className="card-glow group rounded-2xl border border-gray-200/80 dark:border-slate-700/50 bg-white dark:bg-slate-800/60 p-8 text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${uc.color} shadow-xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <uc.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{uc.title}</h3>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━ Why Choose SSEM ━━━ */}
      <div ref={whyReveal.ref} className="py-24 sm:py-32 bg-gray-50/80 dark:bg-slate-800/30 transition-colors">
        <div className={`mx-auto max-w-4xl px-6 lg:px-8 transition-all duration-700 ${whyReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 mesh-gradient opacity-90" />
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Why Choose SSEM?</h3>
              <p className="text-lg leading-8 text-white/80 max-w-2xl mx-auto mb-8">
                SSEM combines containerized isolation with an intuitive browser interface. Whether you're a student experimenting with Linux, a developer testing deployments, or a team needing disposable environments — SSEM delivers secure, persistent sandboxes without the overhead.
              </p>
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-brand-blue shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Start for Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
