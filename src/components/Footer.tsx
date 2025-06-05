
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-r from-witer-red to-witer-red-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/da82f170-3dac-4079-a2f6-51816b746c72.png" 
                alt="WITER LANCHES Logo" 
                className="h-16 w-16 rounded-full"
              />
              <div>
                <h3 className="text-2xl font-bold font-lato">WITER LANCHES</h3>
                <p className="text-witer-yellow font-medium">{t('hero.slogan')}</p>
              </div>
            </div>
            <p className="text-white/90 mb-6 max-w-md">
              Há mais de 15 anos oferecendo os melhores lanches da região com qualidade, sabor e atendimento familiar.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-witer-yellow" />
                <div>
                  <div className="font-medium">99183 9100</div>
                  <div className="text-sm text-white/80">3211 3486</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-witer-yellow" />
                <span>Rua das Delícias, 123 - Centro</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-witer-yellow" />
                <span>Seg-Dom: 18h às 23h</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-witer-yellow transition-colors">Início</a></li>
              <li><a href="#" className="text-white/80 hover:text-witer-yellow transition-colors">Cardápio</a></li>
              <li><a href="#" className="text-white/80 hover:text-witer-yellow transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="text-white/80 hover:text-witer-yellow transition-colors">Promoções</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-bold mb-4">{t('footer.social')}</h4>
            <div className="flex space-x-4 mb-6">
              <a 
                href="#" 
                className="bg-white/20 p-3 rounded-full hover:bg-witer-yellow hover:text-witer-red transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-white/20 p-3 rounded-full hover:bg-witer-yellow hover:text-witer-red transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/5583991839100" 
                className="bg-white/20 p-3 rounded-full hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
            
            <div className="text-sm text-white/80">
              <p>Siga-nos nas redes sociais</p>
              <p>para ficar por dentro das novidades!</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/80">
            © 2024 WITER LANCHES. {t('footer.rights')}
          </p>
          <p className="text-sm text-white/60 mt-2">
            Desenvolvido com ❤️ para sua família
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
