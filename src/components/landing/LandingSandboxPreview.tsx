import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Sparkles, ExternalLink, Copy } from 'lucide-react';

const LandingSandboxPreview: React.FC = () => {
  const [promptValue, setPromptValue] = React.useState('How do neural networks learn?');
  const [isRunning, setIsRunning] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const samplePrompts = [
    { category: 'Beginner', prompt: 'Explain photosynthesis in simple terms' },
    { category: 'Technical', prompt: 'How does gradient descent work?' },
    { category: 'Creative', prompt: 'Write a haiku about machine learning' }
  ];

  const handleRunDemo = async () => {
    if (!promptValue.trim()) return;
    
    setIsRunning(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate shareable URL
    const encodedPrompt = encodeURIComponent(promptValue);
    const mockShareUrl = `https://neivs.ai/sandbox?prompt=${encodedPrompt}&temp=0.7&topk=40`;
    setShareUrl(mockShareUrl);
    
    setIsRunning(false);
  };

  const handleCopyShare = async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenSandbox = () => {
    window.location.href = '/sandbox';
  };

  const stats = [
    { label: 'Tokens', value: promptValue.split(' ').filter(w => w.length > 0).length || 0 },
    { label: 'Layers', value: 24 },
    { label: 'Heads', value: 16 }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content & Controls */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-slate-900">
                All-Purpose AI Sandbox
              </h2>
              <p className="text-xl text-slate-600">
                Run your own prompts through real LLM pipelines with live visualizations. 
                No sign-in required for basic experiments.
              </p>
            </div>

            {/* Sample Prompts */}
            <div className="space-y-3">
              <div className="text-sm font-medium text-slate-700">Try these prompts:</div>
              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((sample, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setPromptValue(sample.prompt)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-medium text-xs text-slate-500">{sample.category}:</span>
                    <span className="ml-1">{sample.prompt}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Demo Controls */}
            <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Enter your prompt:
                </label>
                <textarea
                  value={promptValue}
                  onChange={(e) => setPromptValue(e.target.value)}
                  placeholder="Ask anything about AI, science, or request creative content..."
                  className="w-full h-24 px-4 py-3 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              <motion.button
                onClick={handleRunDemo}
                disabled={!promptValue.trim() || isRunning}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: promptValue.trim() && !isRunning ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
              >
                {isRunning ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="h-5 w-5" />
                    </motion.div>
                    <span>Processing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    <span>Run Demo</span>
                  </>
                )}
              </motion.button>

              {/* Share URL */}
              {shareUrl && (
                <motion.div
                  className="bg-white border border-slate-200 rounded-lg p-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600 truncate flex-1 mr-2">
                      Shareable URL: {shareUrl}
                    </div>
                    <motion.button
                      onClick={handleCopyShare}
                      className="flex items-center space-x-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-medium transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Copy className="h-3 w-3" />
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right Column - Pipeline Visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Live Pipeline</h3>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
                    <span className="text-sm text-slate-600">
                      {isRunning ? 'Processing' : 'Ready'}
                    </span>
                  </div>
                </div>

                {/* Pipeline Steps */}
                <div className="space-y-4">
                  {[
                    { name: 'Tokenization', color: 'blue', progress: isRunning ? 100 : 0 },
                    { name: 'Embeddings', color: 'purple', progress: isRunning ? 85 : 0 },
                    { name: 'Attention', color: 'green', progress: isRunning ? 70 : 0 },
                    { name: 'Generation', color: 'orange', progress: isRunning ? 45 : 0 }
                  ].map((step, index) => (
                    <motion.div
                      key={step.name}
                      className="space-y-2"
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: isRunning ? 1 : 0.5 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-700 font-medium">{step.name}</span>
                        <span className="text-slate-500">{step.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <motion.div
                          className={`bg-${step.color}-500 h-2 rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${step.progress}%` }}
                          transition={{ duration: 0.8, delay: index * 0.2 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Output Preview */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="text-sm text-slate-600 mb-2">Output Preview:</div>
                  <div className="text-slate-900 text-sm min-h-[60px] flex items-center">
                    {isRunning ? (
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        Generating response through neural layers...
                      </motion.span>
                    ) : shareUrl ? (
                      <span className="text-slate-700">
                        ✨ Response generated! Open the full sandbox to see complete output and visualizations.
                      </span>
                    ) : (
                      <span className="text-slate-400">Run a prompt to see the pipeline in action</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            onClick={handleOpenSandbox}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 mx-auto shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Open Full Sandbox</span>
            <ExternalLink className="h-5 w-5" />
          </motion.button>
          
          <p className="text-sm text-slate-600 mt-3">
            Experiment with real transformer math • Export results • No coding required
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingSandboxPreview;