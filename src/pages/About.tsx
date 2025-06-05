
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Clock, Users, Award, Heart } from 'lucide-react';

const About: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Clock,
      title: '15+ Anos',
      description: 'De tradição e experiência'
    },
    {
      icon: Users,
      title: '1000+',
      description: 'Clientes satisfeitos'
    },
    {
      icon: Award,
      title: 'Qualidade',
      description: 'Ingredientes selecionados'
    },
    {
      icon: Heart,
      title: 'Família',
      description: 'Atendimento acolhedor'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-lato">
            {t('about.title')}
          </h1>
          <div className="max-w-4xl mx-auto">
            <img
              src="/lovable-uploads/da82f170-3dac-4079-a2f6-51816b746c72.png"
              alt="WITER LANCHES"
              className="mx-auto h-32 w-32 rounded-full shadow-2xl mb-8"
            />
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {t('about.text')}
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-witer-red to-witer-red-dark rounded-full text-white mb-4">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa História</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  A WITER LANCHES nasceu do sonho de uma família em oferecer lanches saborosos e de qualidade para a comunidade. Começamos pequenos, mas com muito amor e dedicação.
                </p>
                <p>
                  Ao longo dos anos, nos tornamos referência na região, sempre mantendo nossos valores de qualidade, tradição e atendimento familiar que nos tornou únicos.
                </p>
                <p>
                  Hoje, continuamos a receita de sucesso: ingredientes frescos, preparo cuidadoso e o carinho de sempre em cada lanche que servimos.
                </p>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-witer-red to-witer-red-dark rounded-xl text-white">
                <h3 className="text-xl font-bold mb-2">Nossa Missão</h3>
                <p className="text-white/90">
                  Proporcionar momentos especiais em família através de lanches deliciosos, ingredientes de qualidade e um atendimento que faz a diferença.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=800&fit=crop"
                alt="Interior da lanchonete"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Ambiente Acolhedor</h3>
                <p className="text-white/90">O lugar perfeito para sua família</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Nossa Equipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Wilson Teixeira",
                role: "Fundador & Chef",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
              },
              {
                name: "Maria Silva",
                role: "Gerente Geral",
                image: "https://images.unsplash.com/photo-1494790108755-2616b69885e8?w=300&h=300&fit=crop&crop=face"
              },
              {
                name: "João Santos",
                role: "Chef de Cozinha",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-witer-red font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
