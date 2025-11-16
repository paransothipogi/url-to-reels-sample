import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Content Creator',
      avatar: '👩‍💼',
      rating: 5,
      text: 'This tool has completely transformed my content creation workflow. I can now create reels 10x faster!',
    },
    {
      name: 'Mike Chen',
      role: 'Digital Marketer',
      avatar: '👨‍💻',
      rating: 5,
      text: 'The AI is incredibly smart. It picks the best moments and creates engaging reels automatically.',
    },
    {
      name: 'Emma Davis',
      role: 'Social Media Manager',
      avatar: '👩‍🎨',
      rating: 5,
      text: "Our engagement has increased by 300% since we started using ReelForge. It's a game-changer!",
    },
  ];

  return (
    <section className="relative py-32 bg-deep-indigo overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-black text-white mb-4">
            What Our <span className="text-cosmic-pink">Users Say</span>
          </h2>
          <p className="text-xl text-gray-400">Join thousands of happy creators</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative bg-deep-indigo/50 border border-cosmic-pink/20 rounded-2xl p-8 backdrop-blur-sm">
                <Quote className="w-12 h-12 text-cosmic-pink/30 mb-4" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-electric-green text-electric-green" />
                  ))}
                </div>

                <p className="text-gray-300 mb-6 text-lg">{testimonial.text}</p>

                <div className="flex items-center gap-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
