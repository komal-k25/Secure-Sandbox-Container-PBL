import { ArrowRight, LogIn, Server, Monitor, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const steps = [
    {
        number: '01',
        title: 'Login to your account',
        description:
            'Sign in with your credentials to access the SSEM dashboard. Your account gives you full control over your sandbox environments.',
        icon: LogIn,
    },
    {
        number: '02',
        title: 'Create up to 3 Virtual Machines',
        description:
            'Spin up isolated containers on demand. Each VM runs in its own secure sandbox, giving you a clean development environment every time.',
        icon: Server,
    },
    {
        number: '03',
        title: 'Interact and store files permanently in your VMs',
        description:
            'Use the built-in terminal to interact with your containers directly from the browser. All your files and data persist across sessions.',
        icon: Monitor,
    },
    {
        number: '04',
        title: 'Delete and stop VMs when finished',
        description:
            'Clean up resources with a single click. Stop or permanently delete containers you no longer need — everything is under your control.',
        icon: Trash2,
    },
];

function LazyStep({ step, index }: { step: typeof steps[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const isEven = index % 2 === 0;

    return (
        <div
            ref={ref}
            className={`flex flex-col gap-8 lg:gap-16 items-center transition-all duration-700 ease-out ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } ${
                isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            {/* Text Block */}
            <div className="flex-1 w-full">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue shadow-lg shadow-blue-500/25">
                        <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-bold text-brand-blue dark:text-blue-400 tracking-widest uppercase">
                        Step {step.number}
                    </span>
                </div>
                <h3 className="text-2xl font-bold text-brand-dark dark:text-white sm:text-3xl">
                    {step.title}
                </h3>
                <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                    {step.description}
                </p>
            </div>

            {/* Image / Video Placeholder */}
            <div className="flex-1 w-full">
                <div className="relative aspect-video w-full rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 flex items-center justify-center transition-colors duration-200 group hover:border-brand-blue dark:hover:border-blue-400">
                    <div className="text-center">
                        <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center mb-3">
                            <Monitor className="h-6 w-6 text-gray-400 dark:text-slate-500" />
                        </div>
                        <p className="text-sm font-medium text-gray-400 dark:text-slate-500">
                            Image / Video Placeholder
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Home() {
    const navigate = useNavigate();

    const handleTryMe = () => {
        const hasToken = !!localStorage.getItem('token');
        if (hasToken) {
            navigate('/profile');
        } else {
            navigate('/login');
        }
    };

    const scrollToSteps = () => {
        document.getElementById('how-to-use')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-white dark:bg-slate-900 transition-colors duration-200">
            {/* Hero Section */}
            <div className="relative isolate pt-14">
                <div className="py-24 sm:py-32 lg:pb-40">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-brand-dark dark:text-white sm:text-6xl">
                                Deploy secure containers in seconds
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                Experience full isolation with our secure sandbox environment.
                                Spin up to 3 rapid development containers, complete with an interactive terminal and zero fuss.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <button
                                    onClick={handleTryMe}
                                    className="rounded-md bg-brand-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 flex items-center gap-2 transition-all"
                                >
                                    Try Me <ArrowRight className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={scrollToSteps}
                                    className="text-sm font-semibold leading-6 text-gray-900 dark:text-white group cursor-pointer"
                                >
                                    Learn more <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How to Use SSEM — Zigzag Section */}
            <div id="how-to-use" className="bg-gray-50 dark:bg-slate-800/50 py-24 sm:py-32 transition-colors duration-200">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-base font-semibold leading-7 text-brand-blue dark:text-blue-400">
                            Get Started
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-brand-dark dark:text-white sm:text-4xl">
                            How to Use SSEM
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Get up and running in four simple steps. No complex configuration needed.
                        </p>
                    </div>

                    <div className="space-y-16 lg:space-y-24">
                        {steps.map((step, index) => (
                            <LazyStep key={step.number} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}