import { Link } from 'react-router-dom';
import { Mail, Linkedin, Twitter, Github, ExternalLink } from 'lucide-react';

const footerLinks = {
  platform: [
    { label: 'Articles', href: '/articles' },
    { label: 'Events', href: '/events' },
    { label: 'Podcasts', href: '/podcasts' },
    { label: 'Contributors', href: '/contributors' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Publishing Guidelines', href: '/guidelines' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Content Disclaimer', href: '/disclaimer' },
  ]
};

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/novabio-consultancy/', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: 'novabioconsultancy@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-novabio-deep-teal text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                <span className="text-novabio-deep-teal font-bold">N</span>
              </div>
              <span className="font-serif font-bold text-xl">NovaBio</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              An open platform for sharing insights and research in biotechnology, MedTech, and digital health.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-novabio-amber transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-white/40 mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-white/70 hover:text-novabio-coral transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-white/40 mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-white/70 hover:text-novabio-coral transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-white/40 mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-white/70 hover:text-novabio-coral transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <h4 className="font-medium text-sm uppercase tracking-wider text-white/40 mb-4">
              Stay Updated
            </h4>
            <p className="text-white/60 text-sm mb-4">
              Get the latest articles and insights delivered to your inbox.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-novabio-coral transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-novabio-amber hover:bg-novabio-coral text-white text-sm font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} NovaBio Exchange. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-white/40">
              <span>Powered by</span>
              <a 
                href="https://novabio.consultancy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-novabio-coral transition-colors"
              >
                NovaBio Consultancy
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
