import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Menu, X, ExternalLink } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const LandingNavigation: React.FC = () => {
  const { isAuthenticated, signInWithGoogle } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { name: 'Sandbox', href: '/sandbox', primary: true },
    { name: 'Learn', href: '/roadmap', badge: 'Roadmap' },
    { name: 'Pricing', href: '/pricing', badge: 'Free Alpha' },
    { name: 'Changelog', href: '/changelog' },
    { name: 'Docs', href: '/docs' }
  ];

  const handleNavClick = async (href: string, isPrimary?: boolean) => {
    if (isPrimary && href === '/sandbox') {
      // Sandbox doesn't require auth
      window.location.href = href;
      return;
    }
    
    if (href.startsWith('/')) {
      window.location.href = href;
    }
    
    setIsMobileMenuOpen(false);
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-semibold text-slate-900">NEI-VS</span>
            <div className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-medium ml-2">
              Alpha
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <motion.button
                key={link.name}
                onClick={() => handleNavClick(link.href, link.primary)}
                className={`relative text-slate-700 hover:text-blue-600 transition-colors font-medium ${
                  link.primary ? 'text-blue-600' : ''
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="absolute -top-2 -right-2 bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full text-xs font-medium">
                    {link.badge}
                  </span>
                )}
                {link.primary && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                    layoutId="activeTab"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Auth & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <a
                href="/dashboard"
                className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
              >
                Dashboard
              </a>
            ) : (
              <button
                onClick={handleSignIn}
                className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
              >
                Sign In
              </button>
            )}
            
            <motion.a
              href="/sandbox"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Try Sandbox</span>
              <ExternalLink className="h-4 w-4" />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-slate-200 py-4 space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href, link.primary)}
                className="flex items-center justify-between w-full text-left px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <span className={link.primary ? 'font-semibold' : ''}>{link.name}</span>
                {link.badge && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
            
            <div className="px-4 pt-4 border-t border-slate-200 space-y-2">
              {!isAuthenticated && (
                <button
                  onClick={handleSignIn}
                  className="w-full text-left py-2 text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </button>
              )}
              <a
                href="/sandbox"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold text-center transition-colors"
              >
                Try Sandbox
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default LandingNavigation;