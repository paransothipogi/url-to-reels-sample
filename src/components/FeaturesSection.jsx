import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Sparkles, Palette, Download, Share2, Lock } from 'lucide-react';

const FeaturesSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate professional reels in under 30 seconds with our AI engine',
      color: 'electric-green',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Smart content extraction and automatic scene detection',
      color: 'cosmic-pink',
    },
    {
      icon: Palette,
      title: 'Custom Branding',
      description: 'Add your logo, colors, and fonts to match your brand',
      color: 'electric-green',
    },
    {
      icon: Download,
      title: 'Multiple Formats',
      description: 'Export to Instagram, TikTok, YouTube Shorts, and more',
      color: 'cosmic-pink',
    },
    {
      icon: Share2,
      title: 'Direct Publishing',
      description: 'Share directly to your social media platforms',
      color: 'electric-green',
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Your content is encrypted and never stored permanently',
      color: 'cosmic-pink',
    },
  ];

  return (
    <section id="features" ref={ref} className="relative py-32 bg-deep-indigo overflow-hidden">
      {/* Background Effects */}
      <motion.div
        className="absolute top-1/4 left-0 w-96 h-96 bg-electric-green/10 rounded-full blur-3xl"
        style={{ y }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-cosmic-pink/10 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-black text-white mb-4">
            Powerful <span className="text-electric-green">Features</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to create stunning social media reels
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-electric-green/10 to-cosmic-pink/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              
              <div className="relative bg-deep-indigo/50 border border-electric-green/20 rounded-2xl p-8 backdrop-blur-sm group-hover:border-electric-green/40 transition-all">
                <motion.div
                  className={`w-16 h-16 rounded-xl bg-${feature.color}/10 border border-${feature.color}/30 flex items-center justify-center mb-6`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className={`w-8 h-8 text-${feature.color}`} />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
