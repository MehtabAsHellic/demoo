import React from 'react';
import { motion } from 'framer-motion';

const LandingIntegrations: React.FC = () => {
  const techStack = [
    { name: 'React', logo: '⚛️', description: 'UI Framework' },
    { name: 'Vite', logo: '⚡', description: 'Build Tool' },
    { name: 'Tailwind', logo: '🎨', description: 'Styling' },
    { name: 'Framer Motion', logo: '🎭', description: 'Animations' },
    { name: 'Gemini API', logo: '🤖', description: 'LLM Inference' },
    { name: 'Appwrite', logo: '🔐', description: 'Auth & Backend' }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Built with modern tools
          </h3>
          <p className="text-slate-600">
            Open source technologies powering the NEI-VS experience
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="bg-white rounded-xl p-4 text-center border border-slate-200 hover:border-slate-300 transition-all duration-200"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <div className="text-2xl mb-2">{tech.logo}</div>
              <div className="text-sm font-medium text-slate-900 mb-1">{tech.name}</div>
              <div className="text-xs text-slate-500">{tech.description}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
            <span>🚧</span>
            <span>Experimental • Alpha Quality</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingIntegrations;