import { useState, useEffect } from 'react';
import { Camera, Check, ChevronDown, Facebook, Instagram, Mail, Moon, Sun, CreditCard, Menu, X, Upload, Zap, Download, ArrowUp } from 'lucide-react';
import { Button } from './components/Button';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { TrialForm } from './components/TrialForm';
import { Checkout } from './components/Checkout';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { ContactForm } from './components/ContactForm';
import { FadeIn } from './components/FadeIn';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'checkout'>('home');
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Dark mode toggle logic
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Scroll spy for "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false); // Close mobile menu if open
    if (currentPage !== 'home') {
      setCurrentPage('home');
      // Wait for re-render then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckoutClick = () => {
    setIsMobileMenuOpen(false);
    setCurrentPage('checkout');
    // Ensure we scroll to top when opening checkout
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const Navbar = () => (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => { setCurrentPage('home'); scrollToTop(); }}>
            <Camera className="h-8 w-8 text-orange-600 group-hover:scale-110 transition-transform duration-200" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white tracking-tight">Gasztro<span className="text-orange-600">Pixel</span></span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <button 
              onClick={() => scrollToSection('portfolio')} 
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              Portfólió
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              Árazás
            </button>
            <button 
              onClick={() => scrollToSection('process')} 
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              Folyamat
            </button>
            <button 
              onClick={() => scrollToSection('trial')} 
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              Próba
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              Kapcsolat
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Sötét mód váltása"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Button onClick={handleCheckoutClick} variant="primary" className="text-sm px-6 py-3 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
              Előfizetés
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
             <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-orange-600 transition-colors p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 shadow-xl animate-in fade-in slide-in-from-top-5">
          <div className="px-4 py-4 space-y-3">
            <button onClick={() => scrollToSection('portfolio')} className="block w-full text-left px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-zinc-800 hover:text-orange-600 rounded-lg">Portfólió</button>
            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-zinc-800 hover:text-orange-600 rounded-lg">Árazás</button>
            <button onClick={() => scrollToSection('process')} className="block w-full text-left px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-zinc-800 hover:text-orange-600 rounded-lg">Folyamat</button>
            <button onClick={() => scrollToSection('trial')} className="block w-full text-left px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-zinc-800 hover:text-orange-600 rounded-lg">Ingyenes Próba</button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-zinc-800 hover:text-orange-600 rounded-lg">Kapcsolat</button>
            <div className="pt-2 border-t border-gray-100 dark:border-zinc-800">
               <Button onClick={handleCheckoutClick} className="w-full justify-center">Előfizetés</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );

  const Footer = () => (
    <footer className="bg-zinc-900 dark:bg-black text-gray-400 py-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <Camera className="h-6 w-6 text-orange-500" />
            <span className="ml-2 text-lg font-bold text-white">GasztroPixel</span>
          </div>
          <p className="text-sm text-gray-400">
            Professzionális ételfotó retusálás éttermeknek. Növeld a forgalmadat minőségi képekkel a Wolt és Foodora platformokon.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Kapcsolat</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center"><Mail className="w-4 h-4 mr-2" /> hello@gasztropixel.hu</li>
            <li>Budapest, Magyarország</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Kövess minket</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-orange-500 transition-colors"><Facebook /></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><Instagram /></a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-zinc-800 text-center text-xs text-gray-500">
        © 2024 GasztroPixel. Minden jog fenntartva.
      </div>
    </footer>
  );

  if (currentPage === 'checkout') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 font-sans transition-colors duration-300">
        <Navbar />
        <div className="py-12 px-4 sm:px-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Azonnali aktiválás</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">Fizetés után azonnal megkezdjük a munkát a képeiddel.</p>
          </div>
          <Checkout onBack={() => setCurrentPage('home')} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-900 dark:text-white bg-white dark:bg-zinc-950 transition-colors duration-300 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-zinc-900 py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
              A profi ételfotók <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">titka</span>
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Növeld a rendeléseid számát azonnal. Professzionális retusálás, platform-optimalizálás (Wolt, Foodora) és havi karbantartás egy helyen.
            </p>
          </FadeIn>
          <FadeIn delay={400}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={() => scrollToSection('trial')} className="text-lg px-8 py-4">
                Ingyenes Próba-Retusálás
              </Button>
              <Button onClick={() => scrollToSection('pricing')} variant="secondary" className="text-lg px-8 py-4">
                Árak megtekintése
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Portfolio / Before-After Section */}
      <section id="portfolio" className="py-12 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Lásd a különbséget</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Így varázsoljuk az átlagos fotókból ínycsiklandó, rendelésre ösztönző képeket.
              </p>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 gap-12">
            <FadeIn delay={200}>
              <div>
                <BeforeAfterSlider 
                  beforeImage="https://i.postimg.cc/pTrwMFn1/unnamed_(2).jpg"
                  afterImage="https://i.postimg.cc/W3zBckJK/Untitled_design_(17).png"
                  alt="Gyros Pita"
                  enhanceDemo={true}
                />
                <p className="mt-4 text-center font-medium text-gray-500 dark:text-gray-400">
                  Ínycsiklandó színek, friss hatás
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={400}>
              <div>
                <BeforeAfterSlider 
                  beforeImage="https://i.postimg.cc/9M06H7qg/unnamed_(3).jpg"
                  afterImage="https://i.postimg.cc/DZ093XbB/Untitled_design_(18).png"
                  alt="Vegyes Hústál"
                  enhanceDemo={true}
                />
                <p className="mt-4 text-center font-medium text-gray-500 dark:text-gray-400">
                  Részletgazdag textúrák, élesebb részletek
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 bg-gray-50 dark:bg-zinc-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Egyszerű, átlátható árazás</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Nincsenek rejtett költségek. Teljes szolgáltatást nyújtunk.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-zinc-700 transition-colors duration-300">
              <div className="grid md:grid-cols-2">
                {/* One-time Fee */}
                <div className="p-8 border-b md:border-b-0 md:border-r border-gray-100 dark:border-zinc-700 transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-zinc-700/30">
                  <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold tracking-wide mb-4">
                    1. LÉPÉS
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Alapozás</h3>
                  <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                    9.890 Ft
                    <span className="text-base font-normal text-gray-500 dark:text-gray-400 ml-2">egyszeri díj</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Meglévő fotók professzionális feljavítása és rendszerbe állítása.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      Összes meglévő kép retusálása
                    </li>
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      Wolt/Foodora méretre vágás
                    </li>
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      Egységes stílus kialakítása
                    </li>
                  </ul>
                </div>

                {/* Recurring Fee */}
                <div className="p-8 bg-orange-50/50 dark:bg-orange-900/10 transition-colors duration-300 hover:bg-orange-100/50 dark:hover:bg-orange-900/20 relative overflow-hidden">
                   {/* 30 Day Free Badge */}
                   <div className="absolute top-4 right-4">
                      <span className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        30 NAPIG INGYEN
                      </span>
                   </div>

                   <div className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs font-bold tracking-wide mb-4">
                    2. LÉPÉS
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Karbantartás</h3>
                  <div className="flex items-baseline mb-4 gap-2">
                    <div className="text-4xl font-extrabold text-gray-900 dark:text-white">
                      0 Ft
                    </div>
                    <div className="text-lg text-gray-500 line-through decoration-red-500 decoration-2">
                      2.490 Ft
                    </div>
                  </div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-6 uppercase tracking-wide">
                    Az első hónap ajándék!
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      Prioritásos munkavégzés
                    </li>
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      Biztonsági felhő tárolás
                    </li>
                    <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      Ingyenes méretkorrekciók
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="p-8 bg-gray-50 dark:bg-zinc-800 border-t border-gray-100 dark:border-zinc-700 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  A szolgáltatás igénybevételéhez mindkét tétel szükséges.
                </p>
                <div className="flex flex-col items-center gap-4">
                    <Button onClick={handleCheckoutClick} className="w-full md:w-auto text-lg px-12 py-4 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                      Tovább a Fizetéshez
                    </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Trial Section with Gemini AI */}
      <section id="trial" className="py-12 bg-gray-50 dark:bg-zinc-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Nem vagy biztos benne?</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Tölts fel egy képet, és a mesterséges intelligenciánk elemzi, mit javítanánk rajta.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={200}>
            <TrialForm onComplete={handleCheckoutClick} />
          </FadeIn>
          
          <div className="mt-8 text-center">
            <ChevronDown className="mx-auto text-gray-300 dark:text-gray-600 animate-bounce" />
          </div>
        </div>
      </section>

      {/* How It Works Section - Moved Here */}
      <section id="process" className="py-12 bg-gray-50 dark:bg-zinc-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <FadeIn>
             <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Hogyan működik?</h2>
               <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Egyszerűbb, mint gondolnád. Mi dolgozunk, te főzöl.</p>
             </div>
           </FadeIn>

           <div className="grid md:grid-cols-3 gap-8 text-center">
             <FadeIn delay={100}>
               <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700 h-full hover:-translate-y-1 transition-transform duration-300">
                 <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                   <Upload size={32} />
                 </div>
                 <h3 className="text-xl font-bold mb-3">1. Automatikus Észlelés</h3>
                 <p className="text-gray-600 dark:text-gray-400">
                   Nem kell e-mailekkel bajlódnod. Rendszerünk figyeli a feltöltött képeidet, vagy egyszerűen megoszthatsz velünk egy mappát.
                 </p>
               </div>
             </FadeIn>

             <FadeIn delay={300}>
               <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700 h-full hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full"></div>
                 <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                   <Zap size={32} />
                 </div>
                 <h3 className="text-xl font-bold mb-3">2. Prémium Retusálás</h3>
                 <p className="text-gray-600 dark:text-gray-400">
                   Szakértő kollégáink a legmodernebb technológiával biztosítják a tökéletes színeket, fényeket és kompozíciót, hogy ételeid a legjobban mutassanak.
                 </p>
               </div>
             </FadeIn>

             <FadeIn delay={500}>
               <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700 h-full hover:-translate-y-1 transition-transform duration-300">
                 <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                   <Download size={32} />
                 </div>
                 <h3 className="text-xl font-bold mb-3">3. Kész Képek 24 órán belül</h3>
                 <p className="text-gray-600 dark:text-gray-400">
                   A kész, platformra (Wolt/Foodora) optimalizált képeket visszatöltjük, így azonnal növelheted velük a rendeléseid számát.
                 </p>
               </div>
             </FadeIn>
           </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact Section */}
      <section id="contact" className="py-12 bg-gray-50 dark:bg-zinc-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Kérdésed van?</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Írj nekünk bátran, hamarosan válaszolunk.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <ContactForm />
          </FadeIn>
        </div>
      </section>

      <Footer />

      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-4 bg-orange-600 text-white rounded-full shadow-xl hover:bg-orange-700 transition-all duration-300 z-40 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Vissza a tetejére"
      >
        <ArrowUp size={24} />
      </button>

    </div>
  );
}

export default App;