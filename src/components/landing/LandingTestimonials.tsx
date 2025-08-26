import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Mail } from 'lucide-react';

const LandingTestimonials: React.FC = () => {
  const [earlyAdopterEmail, setEarlyAdopterEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  // Only include real testimonials - these would be from actual early users
  const realTestimonials = [
    // Uncomment when you have real testimonials
    // {
    //   quote: "The attention visualization finally made transformers click for me.",
    //   author: "Alex Chen",
    //   role: "ML Engineer",
    //   avatar: "/avatars/alex.jpg",
    //   verified: true
    // }
  ];

  const handleEarlyAdopterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (earlyAdopterEmail.includes('@')) {
      // In real app, would send to backend
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEarlyAdopterEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {realTestimonials.length > 0 ? (
          // Show real testimonials when available
          <>
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-semibold text-slate-900 mb-4">
                What Early Users Say
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {realTestimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="space-y-4">
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <blockquote className="text-slate-700 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center space-x-3">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.author}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-semibold text-slate-900 flex items-center space-x-1">
                          <span>{testimonial.author}</span>
                          {testimonial.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-slate-600">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          // Early adopters wanted section
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Early Adopters Wanted
                  </h2>
                </div>
                
                <p className="text-lg text-slate-600 leading-relaxed">
                  Help shape NEI-VS by being one of our first users. Get early access to new features, 
                  direct input on the roadmap, and your feedback featured here.
                </p>

                <form onSubmit={handleEarlyAdopterSignup} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={earlyAdopterEmail}
                      onChange={(e) => setEarlyAdopterEmail(e.target.value)}
                      className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                    <motion.button
                      type="submit"
                      disabled={submitted}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        submitted
                          ? 'bg-green-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                      whileHover={!submitted ? { scale: 1.02 } : {}}
                      whileTap={{ scale: 0.98 }}
                    >
                      {submitted ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-white rounded-full" />
                          <span>Thanks!</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>Join Early Access</span>
                        </div>
                      )}
                    </motion.button>
                  </div>
                  
                  <p className="text-sm text-slate-500">
                    No spam, just updates on new features and early access opportunities.
                  </p>
                </form>

                <div className="flex items-center justify-center space-x-6 text-sm text-slate-600 pt-4 border-t border-slate-200">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Free during Alpha</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Direct feedback line</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Shape the roadmap</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LandingTestimonials;