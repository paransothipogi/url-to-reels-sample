import { motion } from 'framer-motion';

const GlowingButton = ({ children, onClick, className = "" }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-8 py-4 bg-electric-green text-deep-indigo font-bold text-lg rounded-lg overflow-hidden ${className}`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 25px rgba(57, 255, 20, 0.6), 0 0 50px rgba(247, 182, 228, 0.4)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 border-2 border-cosmic-pink rounded-lg"
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Button content */}
      <span className="relative z-10">{children}</span>
      
      {/* Hover shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        whileHover={{
          opacity: [0, 0.3, 0],
          x: ['-100%', '100%'],
        }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  );
};

export default GlowingButton;
