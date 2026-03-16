import { ArrowRight, LogIn, Server, Monitor, Trash2, Shield, Zap, Globe, ChevronRight, Terminal, Cpu, Lock, Cloud, Code } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import stepImage1 from "../assets/step1.png";
import stepImage2 from "../assets/step2.png";
import stepImage3 from "../assets/step3.png";
import stepImage4 from "../assets/step4.png";
/* ─── Scroll-reveal hook ─── */
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

/* ─── Animated counter ─── */
// function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
//   const [value, setValue] = useState(0);
//   const ref = useRef<HTMLSpanElement>(null);
//   useEffect(() => {
//     const obs = new IntersectionObserver(([e]) => {
//       if (e.isIntersecting) {
//         let start = 0;
//         const duration = 1500;
//         const step = (ts: number) => {
//           if (!start) start = ts;
//           const progress = Math.min((ts - start) / duration, 1);
//           setValue(Math.floor(progress * end));
//           if (progress < 1) requestAnimationFrame(step);
//         };
//         requestAnimationFrame(step);
//         obs.disconnect();
//       }
//     }, { threshold: 0.3 });
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, [end]);
//   return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
// }

/* ─── Data ─── */
const steps = [
  { number: '01', title: 'Create your account', description: 'Sign up in seconds with just your email. Your account gives you a personal dashboard to manage all your sandbox environments.', icon: LogIn, image: stepImage1 },
  { number: '02', title: 'Spin up containers', description: 'Create up to 3 isolated containers on demand. Each runs a full Ubuntu desktop with Chromium, VS Code, and a terminal — ready in seconds.', icon: Server, image: stepImage2 },
  { number: '03', title: 'Work in your browser', description: 'Access a full graphical desktop through your browser via noVNC. Install packages, write code, run servers — all without touching your local machine.', icon: Monitor, image: stepImage3 },
  { number: '04', title: 'Manage & clean up', description: 'Start, stop, or permanently delete containers with a single click. Resources are freed instantly and everything stays under your control.', icon: Trash2, image: stepImage4 },
];

const stats = [
  { label: 'Containers Deployed', value: 2500, suffix: '+' },
  { label: 'Uptime Guarantee', value: 99, suffix: '.9%' },
  { label: 'Boot Time', value: 8, suffix: 's' },
  { label: 'Active Users', value: 500, suffix: '+' },
];

const techStack = [
  { name: 'Docker', icon: Cloud },
  { name: 'Ubuntu', icon: Terminal },
  { name: 'noVNC', icon: Monitor },
  { name: 'Node.js', icon: Code },
  { name: 'React', icon: Globe },
  { name: 'MySQL', icon: Cpu },
];

/* ─── Step card ─── */
function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const { ref, visible } = useReveal();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-8 lg:gap-16 items-center
        ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}
        transition-all duration-700 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Text */}
      <div className="flex-1 w-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-indigo-600 shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <step.icon className="h-6 w-6 text-white" />
          </div>
          <span className="text-sm font-bold text-brand-blue dark:text-blue-400 tracking-widest uppercase">
            Step {step.number}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-brand-dark dark:text-white sm:text-3xl">{step.title}</h3>
        <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">{step.description}</p>
      </div>

      {/* Visual */}
      <div className="flex-1 w-full">
        <div className={`relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-800 border border-gray-200/60 dark:border-slate-700/50 shadow-lg group hover:shadow-xl transition-all duration-500`}>
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Inner shadow overlay for premium feel */}
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] pointer-events-none rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function Home() {
  const navigate = useNavigate();

  const handleTryMe = () => {
    navigate(localStorage.getItem('token') ? '/profile' : '/login');
  };

  const scrollToSteps = () => {
    document.getElementById('how-to-use')?.scrollIntoView({ behavior: 'smooth' });
  };

  const statsReveal = useReveal();
  const techReveal = useReveal();
  const ctaReveal = useReveal();

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors duration-200">

      {/* ━━━ HERO ━━━ */}
      <div className="relative isolate overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 mesh-gradient dark:hidden opacity-[0.06]" />
        <div className="absolute inset-0 hidden dark:block bg-gradient-to-b from-brand-blue/5 via-transparent to-transparent" />

        {/* Decorative blobs */}
        <div className="absolute top-20 -left-32 h-80 w-80 rounded-full bg-brand-blue/10 dark:bg-brand-blue/5 blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 -right-32 h-96 w-96 rounded-full bg-indigo-500/10 dark:bg-purple-500/5 blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(0,105,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,105,255,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">

              {/* Badge */}
              <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 px-4 py-1.5 mb-8 ring-1 ring-brand-blue/20 dark:ring-brand-blue/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
                </span>
                <span className="text-sm font-semibold text-brand-blue dark:text-blue-400">Use vms in seconds!</span>
              </div>

              {/* Headline */}
              <h1 className="animate-fade-in-up stagger-1 text-4xl font-extrabold tracking-tight text-brand-dark dark:text-white sm:text-6xl lg:text-7xl leading-[1.1]">
                Deploy secure
                <span className="gradient-text"> containers </span>
                in seconds
              </h1>

              <p className="animate-fade-in-up stagger-2 mt-6 text-lg sm:text-xl leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Spin up to 3 isolated Ubuntu desktops with a full graphical interface, terminal, and development tools — all accessible through your browser.
              </p>

              {/* CTA buttons */}
              <div className="animate-fade-in-up stagger-3 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleTryMe}
                  className="group w-full sm:w-auto rounded-xl bg-gradient-to-r from-brand-blue to-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-blue-500/25
                    hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-0.5
                    flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={scrollToSteps}
                  className="group w-full sm:w-auto rounded-xl bg-white/80 dark:bg-slate-800/80 glass px-8 py-3.5 text-base font-semibold text-brand-dark dark:text-white
                    ring-1 ring-gray-200 dark:ring-slate-700 shadow-lg
                    hover:shadow-xl hover:-translate-y-0.5
                    flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                >
                  See How It Works
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Trust badges */}
              <div className="animate-fade-in-up stagger-4 mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 dark:text-gray-500">
                <div className="flex items-center gap-1.5"><Shield className="h-4 w-4" /> End-to-end isolation</div>
                <div className="flex items-center gap-1.5"><Zap className="h-4 w-4" /> less boot time</div>
                <div className="flex items-center gap-1.5"><Lock className="h-4 w-4" /> JWT secured</div>
              </div>
            </div>

            {/* Hero visual — terminal mockup */}
            <div className="animate-fade-in-up stagger-5 mt-16 sm:mt-20 mx-auto max-w-4xl">
              <div className="rounded-2xl bg-gray-900 dark:bg-slate-800 shadow-2xl shadow-black/20 overflow-hidden ring-1 ring-white/10">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 dark:bg-slate-700/60 border-b border-gray-700/50">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs text-gray-400 font-mono ml-2">ssem-sandbox ~ terminal</span>
                </div>
                {/* Terminal content */}
                <div className="p-6 font-mono text-sm leading-7 text-gray-300 overflow-hidden">
                  <div><span className="text-emerald-400">rahil@ssem</span><span className="text-gray-500">:</span><span className="text-blue-400">~</span><span className="text-gray-500">$</span> ssem create --name dev-server</div>
                  <div className="text-gray-500">⠋ Pulling sandbox image...</div>
                  <div className="text-gray-500">⠙ Allocating port 6283...</div>
                  <div className="text-emerald-400">✓ Container ssem-vm-u1-n0 started</div>
                  <div className="text-emerald-400">✓ noVNC desktop ready at <span className="text-blue-400 underline">http://localhost:6283</span></div>
                  <div className="mt-2"><span className="text-emerald-400">rahil@ssem</span><span className="text-gray-500">:</span><span className="text-blue-400">~</span><span className="text-gray-500">$</span> <span className="animate-pulse">▊</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━ STATS ━━━ */}
      {/* <div ref={statsReveal.ref} className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-indigo-600 to-purple-600 dark:from-brand-blue/90 dark:via-indigo-700 dark:to-purple-700" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        <div className={`relative max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-700 ${statsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                  {statsReveal.visible && <AnimatedCounter end={stat.value} suffix={stat.suffix} />}
                </p>
                <p className="mt-2 text-sm sm:text-base font-medium text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* ━━━ HOW TO USE ━━━ */}
      <div id="how-to-use" className="bg-gray-50/80 dark:bg-slate-800/30 py-24 sm:py-32 transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-brand-blue dark:text-blue-400 uppercase tracking-wider">Get Started</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-brand-dark dark:text-white sm:text-4xl">
              How to Use SSEM
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Get up and running in four simple steps. No complex configuration needed.
            </p>
          </div>
          <div className="space-y-20 lg:space-y-28">
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* ━━━ TECH STACK ━━━ */}
      <div ref={techReveal.ref} className="py-20 sm:py-24 bg-white dark:bg-slate-900 transition-colors">
        <div className={`max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-700 ${techReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="text-base font-semibold text-brand-blue dark:text-blue-400 uppercase tracking-wider">Built With</h2>
            <p className="mt-2 text-3xl font-bold text-brand-dark dark:text-white sm:text-4xl">Powered by Modern Technology</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, i) => (
              <div key={tech.name}
                className="card-glow group flex flex-col items-center gap-3 rounded-2xl bg-gray-50 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700/50 p-6 text-center"
                style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue/10 to-indigo-500/10 dark:from-blue-500/15 dark:to-indigo-500/15 group-hover:from-brand-blue/20 group-hover:to-indigo-500/20 transition-colors">
                  <tech.icon className="h-6 w-6 text-brand-blue dark:text-blue-400" />
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━ BOTTOM CTA ━━━ */}
      <div ref={ctaReveal.ref} className="py-20 sm:py-24 bg-gray-50/80 dark:bg-slate-800/30 transition-colors">
        <div className={`max-w-4xl mx-auto px-6 lg:px-8 text-center transition-all duration-700 ${ctaReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 mesh-gradient opacity-90" />
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative px-8 py-16 sm:px-16 sm:py-20">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to start building?</h2>
              <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
                Create your free account and spin up your first sandbox in under 10 seconds. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="group w-full sm:w-auto rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-brand-blue shadow-xl
                    hover:shadow-2xl hover:-translate-y-0.5
                    flex items-center justify-center gap-2 transition-all duration-300"
                >
                  Create Free Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/features"
                  className="w-full sm:w-auto rounded-xl bg-white/15 glass px-8 py-3.5 text-base font-semibold text-white ring-1 ring-white/20
                    hover:bg-white/25 hover:ring-white/30
                    flex items-center justify-center gap-2 transition-all duration-300"
                >
                  Explore Features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}