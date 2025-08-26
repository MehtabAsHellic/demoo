import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const LandingHero: React.FC = () => {
  const { signInWithGoogle, isLoading } = useAuthStore();
  const [promptValue, setPromptValue] = React.useState('Explain how rainbows form');
  const [isRunning, setIsRunning] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);

  const pipelineSteps = [
    { name: 'Tokenize', color: 'blue', duration: 800 },
    { name: 'Embed', color: 'purple', duration: 600 },
    { name: 'Attend', color: 'green', duration: 1000 },
    { name: 'Generate', color: 'orange', duration: 1200 }
  ];

  const handleTrySandbox = () => {
    // Navigate to sandbox without requiring auth
    window.location.href = '/sandbox';
  };

  const handleRunMicroDemo = async () => {
    if (!promptValue.trim()) return;
    
    setIsRunning(true);
    setCurrentStep(0);
    
    // Animate through pipeline steps
    for (let i = 0; i < pipelineSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, pipelineSteps[i].duration));
    }
    
    // Complete
    setCurrentStep(pipelineSteps.length);
    setTimeout(() => {
      setIsRunning(false);
      setCurrentStep(0);
    }, 2000);
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Column - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-6">
              <motion.h1
                className="text-5xl lg:text-6xl font-semibold text-slate-900 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Learn AI by{' '}
                <span className="text-blue-600">
                  Doing—Visually
                </span>
              </h1>

              <motion.p
                className="text-xl text-slate-600 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Type a prompt and see the LLM pipeline—tokenization, embeddings, attention, generation—come alive.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <motion.button
                onClick={handleTrySandbox}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="h-5 w-5" />
                <span>Try the Sandbox</span>
                <span className="text-blue-200 text-sm">(no sign-in)</span>
              </motion.button>

              <div className="flex items-center space-x-4 text-sm text-slate-600">
                <button
                  onClick={handleSignIn}
                  disabled={isLoading}
                  className="hover:text-blue-600 transition-colors underline"
                >
                  Sign in with Google
                </button>
                <span>•</span>
                <a href="/changelog" className="hover:text-blue-600 transition-colors">
                  Changelog
                </a>
              </div>
            </motion.div>

            {/* Proof row */}
            <motion.div
              className="flex items-center space-x-4 text-sm text-slate-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                Alpha
              </div>
              <span>Built with React/Vite</span>
              <span>•</span>
              <span>Privacy-first</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Micro-Sandbox */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Live Pipeline Demo</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                {/* Prompt Input */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">
                    Try a prompt:
                  </label>
                  <textarea
                    value={promptValue}
                    onChange={(e) => setPromptValue(e.target.value)}
                    placeholder="Ask anything..."
                    className="w-full h-20 px-3 py-2 border border-slate-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    disabled={isRunning}
                  />
                  
                  <motion.button
                    onClick={handleRunMicroDemo}
                    disabled={!promptValue.trim() || isRunning}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
                    whileHover={{ scale: promptValue.trim() && !isRunning ? 1.02 : 1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isRunning ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="h-4 w-4" />
                        </motion.div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        <span>Run Demo</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Pipeline Steps */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-slate-700">Pipeline:</div>
                  
                  <div className="flex items-center space-x-2">
                    {pipelineSteps.map((step, index) => (
                      <React.Fragment key={step.name}>
                        <motion.div
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            currentStep === index && isRunning
                              ? `bg-${step.color}-600 text-white shadow-lg`
                              : currentStep > index && isRunning
                              ? 'bg-green-100 text-green-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                          animate={currentStep === index && isRunning ? { 
                            scale: [1, 1.05, 1],
                            boxShadow: ['0 4px 6px -1px rgba(0, 0, 0, 0.1)', '0 10px 15px -3px rgba(0, 0, 0, 0.1)', '0 4px 6px -1px rgba(0, 0, 0, 0.1)']
                          } : {}}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {step.name}
                        </motion.div>
                        
                        {index < pipelineSteps.length - 1 && (
                          <motion.div
                            className="w-4 h-0.5 bg-slate-300 rounded"
                            animate={{
                              backgroundColor: currentStep > index && isRunning ? '#10b981' : '#cbd5e1'
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="text-sm text-slate-600 mb-2">Output:</div>
                  <div className="text-slate-900 text-sm min-h-[60px] flex items-center">
                    {isRunning ? (
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-slate-500"
                      >
                        {currentStep < pipelineSteps.length ? 
                          `${pipelineSteps[currentStep]?.name}ing...` : 
                          'Generating response...'
                        }
                      </motion.span>
                    ) : currentStep === pipelineSteps.length ? (
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-slate-700"
                      >
                        ✨ Response generated! Try the full sandbox for complete output.
                      </motion.span>
                    ) : (
                      <span className="text-slate-400">Run a prompt to see the pipeline in action</span>
                    )}
                  </div>
                </div>

                {/* CTA to full sandbox */}
                <motion.button
                  onClick={handleTrySandbox}
                  className="w-full border-2 border-blue-200 hover:border-blue-300 text-blue-700 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Open Full Sandbox</span>
                  <ExternalLink className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;