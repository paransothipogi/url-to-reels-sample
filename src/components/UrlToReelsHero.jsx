import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Video } from 'lucide-react';
import GlowingButton from './GlowingButton';
import AnimatedBackground from './AnimatedBackground';

const UrlToReelsHero = () => {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConvert = () => {
    if (url.trim()) {
      setIsProcessing(true);
      // Simulate processing
      setTimeout(() => {
        console.log('Converting URL:', url);
        setIsProcessing(false);
      }, 2000);
    }
  };

  // Stagger animation for child elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-deep-indigo flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <AnimatedBackground />

      {/* Main content container */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          {/* Badge/Tag */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-electric-green/10 border border-electric-green/30 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-electric-green" />
            <span className="text-electric-green text-sm font-semibold">
              AI-Powered Reel Generation
            </span>
          </motion.div>

          {/* Main Headline (H1) */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
          >
            Transform Any
            <span className="block bg-gradient-to-r from-electric-green via-cosmic-pink to-electric-green bg-clip-text text-transparent animate-pulse">
              URL to Reels
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Convert any website into stunning social media reels in seconds.
            AI-powered extraction, auto-editing, and instant publishing.
          </motion.p>

          {/* URL Input Block */}
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="relative">
              {/* Continuously animating border - "Reel Transformation" visual */}
              <motion.div
                className="absolute -inset-1 rounded-2xl opacity-75 blur-sm"
                style={{
                  background: 'linear-gradient(90deg, #39FF14, #F7B6E4, #39FF14)',
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Input container */}
              <div className="relative bg-deep-indigo border-2 border-electric-green/30 rounded-2xl p-2 shadow-2xl">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* URL Input Field */}
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/your-content"
                    className="flex-1 px-6 py-4 bg-deep-indigo/50 text-white placeholder-gray-400 rounded-xl border border-electric-green/20 focus:border-electric-green focus:outline-none focus:ring-2 focus:ring-electric-green/50 transition-all text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && handleConvert()}
                  />

                  {/* CTA Button */}
                  <GlowingButton
                    onClick={handleConvert}
                    className="sm:w-auto w-full"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Zap className="w-5 h-5" />
                        </motion.div>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Video className="w-5 h-5" />
                        Generate Reel
                      </span>
                    )}
                  </GlowingButton>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature Icons/Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Zap, label: 'Instant Generation', value: '< 30 sec' },
              { icon: Sparkles, label: 'AI-Powered', value: '99% Accuracy' },
              { icon: Video, label: 'Reels Created', value: '1M+' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-electric-green/5 border border-electric-green/20 rounded-xl p-6 backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  borderColor: 'rgba(57, 255, 20, 0.5)',
                  backgroundColor: 'rgba(57, 255, 20, 0.1)',
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <feature.icon className="w-8 h-8 text-electric-green mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  {feature.value}
                </div>
                <div className="text-sm text-cosmic-pink font-medium">
                  {feature.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep-indigo to-transparent pointer-events-none" />
    </section>
  );
};

export default UrlToReelsHero;
