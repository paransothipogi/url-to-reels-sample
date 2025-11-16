import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How does the URL to Reel conversion work?',
      answer: 'Our AI analyzes the webpage content, extracts key information, images, and text, then automatically creates engaging scenes with transitions and effects.',
    },
    {
      question: 'What types of URLs can I convert?',
      answer: 'You can convert blog posts, product pages, news articles, portfolio pages, and most web content. Our AI adapts to different content types.',
    },
    {
      question: 'Can I edit the generated reels?',
      answer: 'Yes! After generation, you have full control to edit text, adjust timing, change music, add effects, and customize every aspect of your reel.',
    },
    {
      question: 'What video formats are supported?',
      answer: 'We support MP4, MOV, and WebM formats, optimized for Instagram Reels, TikTok, YouTube Shorts, and Facebook Reels.',
    },
    {
      question: 'Is my content secure?',
      answer: 'Absolutely. All content is encrypted in transit and at rest. We do not store your generated reels permanently unless you explicitly save them.',
    },
  ];

  return (
    <section id="faq" className="relative py-32 bg-gradient-to-b from-black to-deep-indigo overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-black text-white mb-4">
            Frequently Asked <span className="text-electric-green">Questions</span>
          </h2>
          <p className="text-xl text-gray-400">Everything you need to know</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left bg-deep-indigo/50 border border-electric-green/20 hover:border-electric-green/40 rounded-xl p-6 backdrop-blur-sm transition-all"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-bold text-white">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openIndex === index ? (
                      <Minus className="w-6 h-6 text-electric-green" />
                    ) : (
                      <Plus className="w-6 h-6 text-electric-green" />
                    )}
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-400 mt-4 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
