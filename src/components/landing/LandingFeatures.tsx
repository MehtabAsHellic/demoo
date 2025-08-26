import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Settings, Download } from 'lucide-react';

const LandingFeatures: React.FC = () => {
  const [hoveredFeature, setHoveredFeature] = React.useState<number | null>(null);

  const features = [
    {
      icon: Eye,
      title: 'See the Pipeline',
      description: 'Visualize each stage in real time',
      demo: 'Tokenization → Embeddings → Attention → Generation',
      color: 'blue'
    },
    {
      icon: Settings,
      title: 'Tweak & Learn',
      description: 'Change temperature, top-p, system prompts',
      demo: 'Temperature: 0.7 → 1.2 (more creative)',
      color: 'purple'
    },
    {
      icon: Download,
      title: 'Capture Insights',
      description: 'Save and compare runs; export CSV/JSON',
      demo: 'Export attention matrices, token probabilities',
      color: 'green'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">
            Why NEI-VS?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Three core capabilities that make AI learning hands-on and visual.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              onHoverStart={() => setHoveredFeature(index)}
              onHoverEnd={() => setHoveredFeature(null)}
            >
              <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full transition-all duration-200 group-hover:shadow-lg group-hover:border-slate-300">
                <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-${feature.color}-200 transition-colors`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
                </div>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 mb-4">
                  {feature.description}
                </p>

                {/* Micro-demo tooltip */}
                <motion.div
                  className={`text-sm text-${feature.color}-700 bg-${feature.color}-50 rounded-lg p-3 font-mono`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: hoveredFeature === index ? 1 : 0,
                    height: hoveredFeature === index ? 'auto' : 0
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.demo}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proof statement */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-full text-sm text-slate-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>All features available in Alpha • No waitlist</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingFeatures;