import { Link } from 'react-router-dom';
import { Terminal, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

const navigation = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Security', href: '/security' },
    { name: 'Dashboard', href: '/profile' },
    { name: 'Pricing', href: '#' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'Tutorials', href: '#' },
    { name: 'Status Page', href: '#' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ],
};

const socials = [
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Email', icon: Mail, href: 'mailto:support@ssem-sandbox.com' },
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 transition-colors duration-200">

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">

          {/* Brand column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 text-brand-blue font-bold text-xl tracking-tight">
              <Terminal className="h-6 w-6" />
              <span>SSEM</span>
            </Link>
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-400 max-w-xs">
              Secure Sandbox Environment Manager — deploy isolated containers with full desktop access through your browser. Built for developers, students, and security teams.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400
                    hover:bg-brand-blue/10 dark:hover:bg-brand-blue/20 hover:text-brand-blue dark:hover:text-blue-400
                    transition-all duration-200"
                  aria-label={s.name}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 sm:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Product</h3>
              <ul className="mt-4 space-y-3">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-blue-400 transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-3">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-blue-400 transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-blue-400 transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-blue-400 transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Stay updated</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Get notified about new features and security updates.</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="flex w-full sm:w-auto gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full sm:w-64 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue dark:focus:border-blue-400
                  transition-all duration-200"
              />
              <button
                type="submit"
                className="rounded-lg bg-gradient-to-r from-brand-blue to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20
                  hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5
                  transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 dark:text-gray-500 flex items-center gap-1">
            &copy; 2026 SSEM. Made with <Heart className="h-3.5 w-3.5 text-red-500 inline" /> by the SSEM Team.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Secure Sandbox Environment Manager v1.0
          </p>
        </div>
      </div>
    </footer>
  );
}
