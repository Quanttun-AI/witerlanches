
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { ArrowRight, Star } from 'lucide-react';

interface HeroProps {
  onNavigateToMenu: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToMenu }) => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-witer-red via-witer-red-dark to-witer-red">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-witer-yellow rounded-full opacity-20 animate-bounce-soft" />
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-witer-yellow rounded-full opacity-30 animate-bounce-soft" style={{ animationDelay: '1s' }} />
      <div className="absolute top-40 right-20 w-12 h-12 bg-white rounded-full opacity-15 animate-bounce-soft" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <img 
              src="/lovable-uploads/da82f170-3dac-4079-a2f6-51816b746c72.png" 
              alt="WITER LANCHES Logo" 
              className="mx-auto h-32 w-32 md:h-48 md:w-48 rounded-full shadow-2xl hover:scale-110 transition-transform duration-500 animate-pulse-glow"
            />
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 font-lato animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t('hero.title')}
          </h1>

          {/* Slogan */}
          <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl md:text-4xl text-witer-yellow font-bold mb-2 font-lato">
              {t('hero.slogan')}
            </h2>
            <div className="flex justify-center items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-witer-yellow fill-current" />
              ))}
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {t('hero.subtitle')}
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Button
              onClick={onNavigateToMenu}
              size="lg"
              className="bg-witer-yellow text-witer-red hover:bg-witer-yellow-dark hover:scale-105 transition-all duration-300 text-xl px-8 py-4 rounded-full font-bold shadow-2xl group"
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>

          {/* Statistics */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-witer-yellow">15+</div>
              <div className="text-white/80">Anos de Tradição</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-witer-yellow">1000+</div>
              <div className="text-white/80">Clientes Satisfeitos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-witer-yellow">50+</div>
              <div className="text-white/80">Itens no Cardápio</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
