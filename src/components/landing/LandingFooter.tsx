import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Github, Twitter, Mail } from 'lucide-react';

const LandingFooter: React.FC = () => {
  const footerLinks = {
    product: [
      { name: 'Sandbox', href: '/sandbox' },
      { name: 'Roadmap', href: '/roadmap' },
      { name: 'Changelog', href: '/changelog' },
      { name: 'Pricing', href: '/pricing' }
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/docs/api' },
      { name: 'Examples', href: '/examples' },
      { name: 'Status', href: '/status' }
    ],
    legal: [
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
      { name: 'Contact', href: '/contact' }
    ]
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/neivs-ai' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/neivs_ai' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@neivs.ai' }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Section */}
          <motion.div
            className="col-span-2 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-semibold">NEI-VS</span>
              <div className="bg-orange-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                Alpha
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Learn AI by doing—visually. Open source, privacy-first, and built for curious minds.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="text-slate-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="font-semibold text-white capitalize">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-sm text-slate-400">
            © 2025 NEI-VS. Building in public for AI education.
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-slate-400 text-xs">What's real today:</span>
            <div className="flex items-center space-x-2">
              <div className="bg-green-600 px-2 py-1 rounded text-xs font-medium">
                Sandbox
              </div>
              <div className="bg-blue-600 px-2 py-1 rounded text-xs font-medium">
                Auth
              </div>
              <div className="bg-orange-600 px-2 py-1 rounded text-xs font-medium">
                Gemini API
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default LandingFooter;