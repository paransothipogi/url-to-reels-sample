import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link2, Wand2, Edit3, Share2 } from 'lucide-react';

const HowItWorksSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const steps = [
    {
      icon: Link2,
      title: 'Paste URL',
      description: 'Simply paste any website link you want to convert',
      color: 'from-electric-green to-cyan-400',
    },
    {
      icon: Wand2,
      title: 'AI Processing',
      description: 'Our AI extracts content, images, and creates scenes automatically',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      icon: Edit3,
      title: 'Customize',
      description: 'Edit, add effects, music, and personalize your reel',
      color: 'from-blue-500 to-cosmic-pink',
    },
    {
      icon: Share2,
      title: 'Share',
      description: 'Download or publish directly to your social platforms',
      color: 'from-cosmic-pink to-electric-green',
    },
  ];

  return (
    <section id="how-it-works" ref={ref} className="relative py-32 bg-gradient-to-b from-deep-indigo to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-black text-white mb-4">
            How It <span className="text-cosmic-pink">Works</span>
          </h2>
          <p className="text-xl text-gray-400">Four simple steps to create amazing reels</p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-electric-green via-cosmic-pink to-electric-green transform -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const yOffset = useTransform(
                scrollYProgress,
                [0, 1],
                [100 * (index + 1), -50 * (index + 1)]
              );

              return (
                <motion.div
                  key={index}
                  style={{ y: yOffset }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="relative"
                >
                  {/* Step Number */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-electric-green to-cosmic-pink flex items-center justify-center font-black text-deep-indigo text-xl z-10">
                    {index + 1}
                  </div>

                  <motion.div
                    className="relative bg-deep-indigo/50 border-2 border-electric-green/20 rounded-2xl p-8 pt-12 backdrop-blur-sm"
                    whileHover={{
                      scale: 1.05,
                      borderColor: 'rgba(57, 255, 20, 0.4)',
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <step.icon className="w-10 h-10 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-center">{step.description}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
