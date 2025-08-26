import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Bell, ChevronRight } from 'lucide-react';

const LandingCourses: React.FC = () => {
  const [notifyEmails, setNotifyEmails] = React.useState<{[key: string]: string}>({});
  const [votedTracks, setVotedTracks] = React.useState<Set<string>>(new Set());

  const plannedTracks = [
    {
      id: 'llm-fundamentals',
      title: 'LLM Fundamentals',
      description: 'Transformers, attention, and text generation',
      estimatedDuration: '2-3 hours',
      votes: 127,
      priority: 'Next',
      eta: 'Q2 2025'
    },
    {
      id: 'prompt-engineering',
      title: 'Prompt Engineering',
      description: 'Crafting effective prompts and system messages',
      estimatedDuration: '90 minutes',
      votes: 89,
      priority: 'Planned',
      eta: 'Q2 2025'
    },
    {
      id: 'computer-vision',
      title: 'Computer Vision Basics',
      description: 'CNNs, image classification, and feature maps',
      estimatedDuration: '3 hours',
      votes: 64,
      priority: 'Planned',
      eta: 'Q3 2025'
    },
    {
      id: 'classical-ml',
      title: 'Classical ML Methods',
      description: 'SVMs, decision trees, and ensemble methods',
      estimatedDuration: '2 hours',
      votes: 43,
      priority: 'Considering',
      eta: 'TBD'
    }
  ];

  const handleVote = (trackId: string) => {
    if (!votedTracks.has(trackId)) {
      setVotedTracks(prev => new Set([...prev, trackId]));
      // In real app, would send to backend
    }
  };

  const handleNotifyMe = (trackId: string) => {
    const email = notifyEmails[trackId];
    if (email && email.includes('@')) {
      // In real app, would send to backend
      alert(`Thanks! We'll notify ${email} when ${plannedTracks.find(t => t.id === trackId)?.title} is ready.`);
      setNotifyEmails(prev => ({ ...prev, [trackId]: '' }));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Next': return 'bg-green-100 text-green-800';
      case 'Planned': return 'bg-blue-100 text-blue-800';
      case 'Considering': return 'bg-slate-100 text-slate-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">
            Interactive Learning Tracks
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-6">
            Structured courses are coming soon. Help us prioritize what to build next.
          </p>
          
          {/* Roadmap snippet */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium text-slate-700">Public Roadmap</span>
            </div>
            <p className="text-sm text-slate-600 text-left">
              We're building in public. Vote on tracks, get notified when they're ready, 
              and help shape the curriculum based on real learning needs.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {plannedTracks.map((track, index) => (
            <motion.div
              key={track.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-semibold text-slate-900">{track.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(track.priority)}`}>
                        {track.priority}
                      </span>
                    </div>
                    <p className="text-slate-600">{track.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{track.estimatedDuration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{track.votes} votes</span>
                  </div>
                  <div className="text-slate-400">•</div>
                  <span>ETA: {track.eta}</span>
                </div>

                {/* Vote & Notify */}
                <div className="flex items-center space-x-3">
                  <motion.button
                    onClick={() => handleVote(track.id)}
                    disabled={votedTracks.has(track.id)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      votedTracks.has(track.id)
                        ? 'bg-green-100 text-green-800 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    whileHover={!votedTracks.has(track.id) ? { scale: 1.02 } : {}}
                    whileTap={{ scale: 0.98 }}
                  >
                    {votedTracks.has(track.id) ? '✓ Voted' : '👍 Vote'}
                  </motion.button>

                  <div className="flex-1 flex items-center space-x-2">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={notifyEmails[track.id] || ''}
                      onChange={(e) => setNotifyEmails(prev => ({ ...prev, [track.id]: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <motion.button
                      onClick={() => handleNotifyMe(track.id)}
                      disabled={!notifyEmails[track.id]?.includes('@')}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-400 text-slate-700 rounded-lg text-sm font-medium transition-all flex items-center space-x-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Bell className="h-4 w-4" />
                      <span>Notify</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="/roadmap"
            className="inline-flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl font-semibold border border-slate-200 transition-all duration-200"
          >
            <span>View Full Roadmap</span>
            <ChevronRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingCourses;