
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'pt' | 'en' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  pt: {
    // Header
    'nav.home': 'Início',
    'nav.menu': 'Cardápio',
    'nav.about': 'Sobre Nós',
    'nav.control': 'Controle',
    
    // Hero
    'hero.title': 'WITER LANCHES',
    'hero.slogan': 'O sabor com a sua família!',
    'hero.subtitle': 'Tradição, qualidade e sabor em cada lanche. Venha experimentar o melhor da região!',
    'hero.cta': 'Ver Cardápio',
    
    // Menu
    'menu.title': 'Nosso Cardápio',
    'menu.subtitle': 'Sabores irresistíveis para toda a família',
    'menu.add-to-cart': 'Adicionar ao Carrinho',
    'menu.cart': 'Carrinho',
    'menu.total': 'Total',
    'menu.send-order': 'Enviar Pedido',
    'menu.table-number': 'Número da Mesa',
    'menu.delivery-home': 'Entregar em Casa',
    'menu.table-option': 'Estou na mesa da loja',
    'menu.address': 'Endereço de Entrega',
    
    // About
    'about.title': 'Sobre a WITER LANCHES',
    'about.text': 'Com mais de 15 anos de tradição, a WITER LANCHES se consolidou como referência em sabor e qualidade na região. Nossa missão é proporcionar momentos especiais em família através de lanches deliciosos e atendimento excepcional.',
    
    // Footer
    'footer.contact': 'Contato',
    'footer.phone': 'Telefone',
    'footer.social': 'Redes Sociais',
    'footer.rights': 'Todos os direitos reservados.',
    
    // Products
    'products.burger-classic': 'X-Burger Clássico',
    'products.burger-classic-desc': 'Pão artesanal, hambúrguer 150g, queijo, alface, tomate e molho especial',
    'products.burger-bacon': 'X-Bacon Supremo',
    'products.burger-bacon-desc': 'Hambúrguer 180g, bacon crocante, queijo cheddar, cebola caramelizada',
    'products.burger-veggie': 'Veggie Burger',
    'products.burger-veggie-desc': 'Hambúrguer de grão-de-bico, queijo vegano, vegetais frescos',
    'products.fries': 'Batata Frita Especial',
    'products.fries-desc': 'Batatas crocantes temperadas com ervas especiais',
    'products.soda': 'Refrigerante',
    'products.soda-desc': 'Coca-Cola, Pepsi, Guaraná ou Fanta - 350ml',
    'products.juice': 'Suco Natural',
    'products.juice-desc': 'Laranja, limão, maracujá ou açaí - 400ml',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.about': 'About Us',
    'nav.control': 'Control',
    
    // Hero
    'hero.title': 'WITER LANCHES',
    'hero.slogan': 'Flavor with your family!',
    'hero.subtitle': 'Tradition, quality and flavor in every burger. Come try the best in the region!',
    'hero.cta': 'View Menu',
    
    // Menu
    'menu.title': 'Our Menu',
    'menu.subtitle': 'Irresistible flavors for the whole family',
    'menu.add-to-cart': 'Add to Cart',
    'menu.cart': 'Cart',
    'menu.total': 'Total',
    'menu.send-order': 'Send Order',
    'menu.table-number': 'Table Number',
    'menu.delivery-home': 'Home Delivery',
    'menu.table-option': 'I am at a table in the store',
    'menu.address': 'Delivery Address',
    
    // About
    'about.title': 'About WITER LANCHES',
    'about.text': 'With over 15 years of tradition, WITER LANCHES has established itself as a reference for flavor and quality in the region. Our mission is to provide special family moments through delicious burgers and exceptional service.',
    
    // Footer
    'footer.contact': 'Contact',
    'footer.phone': 'Phone',
    'footer.social': 'Social Media',
    'footer.rights': 'All rights reserved.',
    
    // Products
    'products.burger-classic': 'Classic X-Burger',
    'products.burger-classic-desc': 'Artisan bun, 150g burger, cheese, lettuce, tomato and special sauce',
    'products.burger-bacon': 'Supreme X-Bacon',
    'products.burger-bacon-desc': '180g burger, crispy bacon, cheddar cheese, caramelized onion',
    'products.burger-veggie': 'Veggie Burger',
    'products.burger-veggie-desc': 'Chickpea burger, vegan cheese, fresh vegetables',
    'products.fries': 'Special French Fries',
    'products.fries-desc': 'Crispy potatoes seasoned with special herbs',
    'products.soda': 'Soft Drink',
    'products.soda-desc': 'Coca-Cola, Pepsi, Guaraná or Fanta - 350ml',
    'products.juice': 'Natural Juice',
    'products.juice-desc': 'Orange, lemon, passion fruit or açaí - 400ml',
  },
  ja: {
    // Header
    'nav.home': 'ホーム',
    'nav.menu': 'メニュー',
    'nav.about': '私たちについて',
    'nav.control': 'コントロール',
    
    // Hero
    'hero.title': 'WITER LANCHES',
    'hero.slogan': 'ご家族と一緒の美味しさ！',
    'hero.subtitle': '伝統、品質、そして各バーガーの味。地域最高の味を体験してください！',
    'hero.cta': 'メニューを見る',
    
    // Menu
    'menu.title': '私たちのメニュー',
    'menu.subtitle': 'ご家族全員のための魅力的な味',
    'menu.add-to-cart': 'カートに追加',
    'menu.cart': 'カート',
    'menu.total': '合計',
    'menu.send-order': '注文を送信',
    'menu.table-number': 'テーブル番号',
    'menu.delivery-home': '自宅配達',
    'menu.table-option': '店内のテーブルにいます',
    'menu.address': '配達先住所',
    
    // About
    'about.title': 'WITER LANCHESについて',
    'about.text': '15年以上の伝統を持つWITER LANCHESは、地域の味と品質の基準として確立されています。私たちの使命は、美味しいバーガーと優れたサービスを通じて、特別な家族の時間を提供することです。',
    
    // Footer
    'footer.contact': '連絡先',
    'footer.phone': '電話',
    'footer.social': 'ソーシャルメディア',
    'footer.rights': 'すべての権利予約済み。',
    
    // Products
    'products.burger-classic': 'クラシックXバーガー',
    'products.burger-classic-desc': '職人のパン、150gバーガー、チーズ、レタス、トマト、特製ソース',
    'products.burger-bacon': 'スプリームXベーコン',
    'products.burger-bacon-desc': '180gバーガー、クリスピーベーコン、チェダーチーズ、キャラメライズオニオン',
    'products.burger-veggie': 'ベジーバーガー',
    'products.burger-veggie-desc': 'ひよこ豆バーガー、ビーガンチーズ、新鮮野菜',
    'products.fries': 'スペシャルフライドポテト',
    'products.fries-desc': '特製ハーブで味付けされたクリスピーポテト',
    'products.soda': 'ソフトドリンク',
    'products.soda-desc': 'コカコーラ、ペプシ、ガラナまたはファンタ - 350ml',
    'products.juice': 'ナチュラルジュース',
    'products.juice-desc': 'オレンジ、レモン、パッションフルーツまたはアサイー - 400ml',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['pt']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
