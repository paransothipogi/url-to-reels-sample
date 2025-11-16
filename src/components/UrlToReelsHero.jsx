import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Zap, Video, Play, Image, Type, Wand2, CheckCircle, AlertCircle, Download } from 'lucide-react';
import MagneticButton from './MagneticButton';
import AnimatedBackground from './AnimatedBackground';

const API_BASE_URL = 'http://localhost:5000/api';

const UrlToReelsHero = () => {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleConvert = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(0);
      setStatus('Creating job...');
      setResultUrl(null);

      // Create job
      const response = await fetch(`${API_BASE_URL}/reels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          captions: '',
          maxDuration: 15,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create job');
      }

      const data = await response.json();
      setJobId(data.jobId);
      setStatus('Processing...');

      // Start polling
      pollJobStatus(data.jobId);

    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to start processing');
      setIsProcessing(false);
    }
  };

  const pollJobStatus = async (jobId) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/reels/${jobId}`);
        
        if (!response.ok) {
          throw new Error('Failed to get job status');
        }

        const jobStatus = await response.json();
        
        console.log('Job status:', jobStatus);
        
        setProgress(jobStatus.progress || 0);
        setStatus(jobStatus.status);

        // Check for completion
        if (jobStatus.status === 'completed' || jobStatus.status === 'done') {
          setResultUrl(jobStatus.resultUrl);
          setIsProcessing(false);
          setProgress(100);
          clearInterval(pollInterval);
          console.log('✅ Job completed!', jobStatus);
        }

        // Check for failure
        if (jobStatus.status === 'failed') {
          setError(jobStatus.error || 'Job failed');
          setIsProcessing(false);
          clearInterval(pollInterval);
        }

      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 2000); // Poll every 2 seconds

    // Stop polling after 5 minutes
    setTimeout(() => {
      clearInterval(pollInterval);
      if (isProcessing) {
        setError('Job timed out after 5 minutes');
        setIsProcessing(false);
      }
    }, 300000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const floatingIcons = [
    { icon: Play, position: { top: '15%', right: '10%' }, delay: 0 },
    { icon: Image, position: { top: '35%', right: '5%' }, delay: 0.5 },
    { icon: Type, position: { top: '60%', right: '15%' }, delay: 1 },
    { icon: Wand2, position: { top: '25%', right: '25%' }, delay: 1.5 },
  ];

  return (
    <section className="relative min-h-screen bg-deep-indigo flex items-center justify-center overflow-hidden pt-20">
      <AnimatedBackground />

      {/* Animated Floating Icons */}
      <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full pointer-events-none">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={item.position}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0],
              y: [0, -20, -40, -60],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-electric-green/20 to-cosmic-pink/20 backdrop-blur-sm border border-electric-green/30 flex items-center justify-center">
              <item.icon className="w-8 h-8 text-electric-green" />
            </div>
          </motion.div>
        ))}

        <motion.div
          className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(57,255,20,0.2) 0%, rgba(247,182,228,0.2) 50%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full border-4 border-electric-green/20"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 360],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-cosmic-pink"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              right: `${Math.random() * 40 + 5}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        style={{ y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          {/* <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-electric-green/10 border border-electric-green/30 rounded-full mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-electric-green" />
            </motion.div>
            <span className="text-electric-green text-sm font-semibold">
              AI-Powered Reel Generation
            </span>
          </motion.div> */}

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
          >
            Transform Any
            <motion.span
              className="block mt-2 bg-gradient-to-r from-electric-green via-cosmic-pink to-electric-green bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              URL to Reels
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Convert any website into stunning social media reels in seconds.
            AI-powered extraction, auto-editing, and instant publishing.
          </motion.p>

          {/* URL Input */}
          <motion.div variants={itemVariants} className="mb-12 max-w-4xl mx-auto">
            <div className="relative">
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
                  ease: 'linear',
                }}
              />

              <div className="relative bg-deep-indigo border-2 border-electric-green/30 rounded-2xl p-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/your-content"
                    className="flex-1 px-6 py-5 bg-deep-indigo/50 text-white placeholder-gray-400 rounded-xl border border-electric-green/20 focus:border-electric-green focus:outline-none focus:ring-2 focus:ring-electric-green/50 transition-all text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && handleConvert()}
                    disabled={isProcessing}
                    whileFocus={{ scale: 1.01 }}
                  />

                  <MagneticButton
                    onClick={handleConvert}
                    className="sm:w-auto w-full whitespace-nowrap px-10"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2 justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        >
                          <Zap className="w-5 h-5" />
                        </motion.div>
                        {Math.round(progress)}%
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 justify-center">
                        <Video className="w-5 h-5" />
                        Generate Reel
                      </span>
                    )}
                  </MagneticButton>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-electric-green to-cosmic-pink h-3"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-gray-400 text-sm mt-2 text-center">
                  {status || 'Processing...'}
                </p>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span className="text-red-400">{error}</span>
              </motion.div>
            )}

            {/* Success Message */}
            {resultUrl && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-6 bg-electric-green/10 border border-electric-green/30 rounded-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-electric-green" />
                  <span className="text-electric-green font-bold text-lg">Your Reel is Ready! 🎉</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={resultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-electric-green text-deep-indigo font-bold rounded-lg hover:scale-105 transition-transform"
                  >
                    <Download className="w-5 h-5" />
                    Download Reel
                  </a>
                  
                  <button
                    onClick={() => {
                      setResultUrl(null);
                      setUrl('');
                      setProgress(0);
                      setJobId(null);
                    }}
                    className="px-6 py-3 border border-electric-green/30 text-electric-green font-bold rounded-lg hover:bg-electric-green/10 transition-all"
                  >
                    Create Another
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Zap, label: 'Reels Created', value: '1M+', color: 'electric-green' },
              { icon: Sparkles, label: 'Happy Users', value: '50K+', color: 'cosmic-pink' },
              { icon: Video, label: 'Avg Speed', value: '< 30s', color: 'electric-green' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="relative group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-electric-green/20 to-cosmic-pink/20 rounded-xl blur-xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
                
                <div className="relative bg-deep-indigo/50 border border-electric-green/20 rounded-xl p-6 backdrop-blur-sm group-hover:border-electric-green/40 transition-all">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    <stat.icon className={`w-8 h-8 text-${stat.color} mx-auto mb-3`} />
                  </motion.div>
                  
                  <div className="text-4xl font-black text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
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

