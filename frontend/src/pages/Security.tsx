import { Shield, Lock, Server, KeyRound, CheckCircle, Eye, Fingerprint, FileCode, ArrowRight, Cpu } from 'lucide-react';
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

const securityFeatures = [
  { name: 'Process Isolation', description: 'Every container runs in its own isolated process space using kernel-level control groups and namespaces. No container can access another sandbox.', icon: Lock, color: 'from-blue-500 to-indigo-600' },
  { name: 'Network Segmentation', description: 'Each sandbox receives dynamically allocated ports with strict traffic isolation. Internal container traffic never leaks to the host network.', icon: Shield, color: 'from-emerald-500 to-teal-600' },
  { name: 'Encrypted Storage', description: 'All persistent data is protected with industry-standard encryption. Storage volumes are isolated per-user and per-container.', icon: Server, color: 'from-purple-500 to-pink-600' },
  { name: 'Access Control', description: 'Token-based authentication verifies every request. Role-based permissions restrict actions to authorized users with session-level security.', icon: KeyRound, color: 'from-amber-500 to-orange-600' },
];

const architectureLayers = [
  { layer: 'Application Layer', items: ['React Dashboard', 'REST API', 'JWT Auth'], icon: FileCode, color: 'bg-blue-500' },
  { layer: 'Orchestration Layer', items: ['Docker Compose', 'Port Allocator', 'YAML Generator'], icon: Server, color: 'bg-indigo-500' },
  { layer: 'Isolation Layer', items: ['cgroups', 'namespaces', 'seccomp'], icon: Lock, color: 'bg-purple-500' },
  { layer: 'Hardware Layer', items: ['Host Kernel', 'Storage Volumes', 'Network Bridge'], icon: Cpu, color: 'bg-pink-500' },
];



const practices = [
  { title: 'Password Hashing', description: 'bcrypt with 10 salt rounds — industry standard.', icon: Fingerprint },
  { title: 'JWT Tokens', description: '1-hour expiry with cryptographic signing.', icon: KeyRound },
  { title: 'Input Validation', description: 'All user inputs sanitized and validated server-side.', icon: CheckCircle },
  { title: 'SQL Injection Protection', description: 'Parameterized queries via mysql2/promise.', icon: Shield },
  { title: 'CORS Configuration', description: 'Cross-origin requests restricted by policy.', icon: Eye },
  { title: 'Non-Root Containers', description: 'Sandboxes run as UID 1000 — never as root.', icon: Lock },
];

export default function Security() {
  const featuresReveal = useReveal();
  const archReveal = useReveal();
  const practicesReveal = useReveal();
  const ctaReveal = useReveal();

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors duration-200">

      {/* ━━━ Hero ━━━ */}
      <div className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent dark:from-purple-500/10" />
        <div className="absolute top-20 -left-40 h-80 w-80 rounded-full bg-purple-500/8 dark:bg-purple-500/5 blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 -right-32 h-64 w-64 rounded-full bg-blue-500/8 dark:bg-blue-500/5 blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full bg-purple-500/10 dark:bg-purple-500/20 px-4 py-1.5 mb-6 ring-1 ring-purple-500/20">
              <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Security First</span>
            </div>
            <h1 className="animate-fade-in-up stagger-1 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Enterprise-grade
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"> isolation </span>
              by design
            </h1>
            <p className="animate-fade-in-up stagger-2 mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Security isn't an afterthought — it's the foundation. Every container runs in a fully protected environment, walled off from the host system and every other user.
            </p>
          </div>
        </div>
      </div>

      {/* ━━━ Security Feature Cards ━━━ */}
      <div ref={featuresReveal.ref} className="pb-24 sm:pb-32">
        <div className={`mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-700 ${featuresReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {securityFeatures.map((feature, i) => (
              <div key={feature.name}
                className="card-glow group rounded-2xl border border-gray-200/80 dark:border-slate-700/50 bg-white dark:bg-slate-800/60 p-8"
                style={{ transitionDelay: `${i * 80}ms` }}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.name}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━ Architecture Layers ━━━ */}
      <div ref={archReveal.ref} className="py-24 sm:py-32 bg-gray-50/80 dark:bg-slate-800/30 transition-colors">
        <div className={`mx-auto max-w-4xl px-6 lg:px-8 transition-all duration-700 ${archReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <h2 className="text-base font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Architecture</h2>
            <p className="mt-2 text-3xl font-bold text-brand-dark dark:text-white sm:text-4xl">Defense in Depth</p>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">Multiple independent layers of security ensure that a breach in one layer cannot compromise the system.</p>
          </div>

          <div className="space-y-4">
            {architectureLayers.map((layer, i) => (
              <div key={layer.layer}
                className="group rounded-2xl border border-gray-200/80 dark:border-slate-700/50 bg-white dark:bg-slate-800/60 p-6 hover:shadow-lg transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${layer.color} shadow-md flex-shrink-0`}>
                    <layer.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">{layer.layer}</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {layer.items.map((item) => (
                        <span key={item} className="inline-flex items-center rounded-lg bg-gray-100 dark:bg-slate-700/70 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {i < architectureLayers.length - 1 && (
                  <div className="flex justify-center mt-4 -mb-8 relative z-10">
                    <div className="h-6 w-px bg-gray-200 dark:bg-slate-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━ Security Practices ━━━ */}
      <div ref={practicesReveal.ref} className="py-24 sm:py-32 bg-white dark:bg-slate-900 transition-colors">
        <div className={`mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-700 ${practicesReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <h2 className="text-base font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Implementation</h2>
            <p className="mt-2 text-3xl font-bold text-brand-dark dark:text-white sm:text-4xl">Security Best Practices</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {practices.map((p, i) => (
              <div key={p.title}
                className="group flex items-start gap-4 rounded-2xl border border-gray-200/80 dark:border-slate-700/50 bg-white dark:bg-slate-800/60 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 dark:bg-purple-400/10 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <p.icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{p.title}</h4>
                  <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-400">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━ CTA ━━━ */}
      <div ref={ctaReveal.ref} className="py-20 sm:py-24 bg-gray-50/80 dark:bg-slate-800/30 transition-colors">
        <div className={`mx-auto max-w-4xl px-6 lg:px-8 text-center transition-all duration-700 ${ctaReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 animate-shimmer" style={{ backgroundSize: '200% 200%' }} />
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative px-8 py-16 sm:px-16 sm:py-20">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Security you can trust</h3>
              <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
                Every layer of SSEM is built with security in mind. Start building in a protected environment today.
              </p>
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-purple-600 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started Securely
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}