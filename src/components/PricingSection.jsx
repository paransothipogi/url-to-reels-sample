import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import MagneticButton from './MagneticButton';

const PricingSection = () => {
  const plans = [
    {
      name: 'Starter',
      price: '0',
      period: 'forever',
      description: 'Perfect for trying out',
      features: [
        '5 reels per month',
        'Basic templates',
        'Watermark included',
        'Standard quality',
        'Email support',
      ],
      popular: false,
    },
    {
      name: 'Pro',
      price: '29',
      period: 'month',
      description: 'For content creators',
      features: [
        'Unlimited reels',
        'Premium templates',
        'No watermark',
        'HD quality',
        'Custom branding',
        'Priority support',
        'API access',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '99',
      period: 'month',
      description: 'For teams and agencies',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'White label solution',
        '4K quality',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee',
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-black text-white mb-4">
            Simple <span className="text-electric-green">Pricing</span>
          </h2>
          <p className="text-xl text-gray-400">Choose the perfect plan for your needs</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-electric-green to-cosmic-pink rounded-full text-deep-indigo font-bold text-sm">
                  Most Popular
                </div>
              )}

              <motion.div
                className={`relative bg-deep-indigo/30 border-2 rounded-2xl p-8 backdrop-blur-sm ${
                  plan.popular
                    ? 'border-electric-green scale-105'
                    : 'border-electric-green/20'
                }`}
                whileHover={{
                  scale: plan.popular ? 1.05 : 1.02,
                  borderColor: 'rgba(57, 255, 20, 0.5)',
                }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-5xl font-black text-white">${plan.price}</span>
                  <span className="text-gray-400">/{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-electric-green flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton className="w-full">
                  {plan.price === '0' ? 'Start Free' : 'Get Started'}
                </MagneticButton>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
