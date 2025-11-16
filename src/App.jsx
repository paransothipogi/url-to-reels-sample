import './App.css';
import Navbar from './components/Navbar';
import UrlToReelsHero from './components/UrlToReelsHero';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <UrlToReelsHero />
      <FeaturesSection />
      {/* <HowItWorksSection /> */}
      {/* <PricingSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <FAQSection /> */}
      <Footer />
    </div>
  );
}

export default App;
