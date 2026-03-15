import { Mail, Phone, Clock, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-white dark:bg-slate-900 py-24 sm:py-32 min-h-screen transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark dark:text-white sm:text-4xl">
            Contact Support
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Need help with your containers? Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-gray-50 dark:bg-slate-800 p-8 sm:p-10 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-brand-blue dark:text-blue-400" />
                Send us a message
              </h3>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="query"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Query
                  </label>
                  <textarea
                    id="query"
                    name="query"
                    rows={5}
                    placeholder="Describe your issue or question..."
                    className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue dark:focus:ring-blue-400 focus:border-transparent transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
                >
                  Submit Query
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-gray-50 dark:bg-slate-800 p-8 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 dark:bg-blue-400/10">
                    <Phone className="h-5 w-5 text-brand-blue dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Phone</p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">+91 123 456 7890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 dark:bg-blue-400/10">
                    <Mail className="h-5 w-5 text-brand-blue dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                    <a
                      href="mailto:support@ssem-sandbox.com"
                      className="mt-1 text-sm text-brand-blue dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      support@ssem-sandbox.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 dark:bg-blue-400/10">
                    <Clock className="h-5 w-5 text-brand-blue dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Availability</p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Our engineering team is available 24/7 to assist with sandbox-related issues.
                    </p>
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