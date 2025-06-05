
import React from 'react';
import Hero from '../components/Hero';

interface HomeProps {
  onNavigateToMenu: () => void;
}

const Home: React.FC<HomeProps> = ({ onNavigateToMenu }) => {
  return (
    <div>
      <Hero onNavigateToMenu={onNavigateToMenu} />
    </div>
  );
};

export default Home;
