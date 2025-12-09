import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Kovács Péter",
    restaurant: "Ikon Restaurant",
    text: "A rendeléseink 25%-kal nőttek azóta, hogy a GasztroPixel képeit használjuk a Wolton. Hihetetlen a különbség!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    name: "Nagy Anna",
    restaurant: "Csokonai Étterem",
    text: "Gyorsak, precízek és pontosan tudják, mitől lesz étvágygerjesztő egy fotó. Az AI elemzésük is nagyon hasznos volt.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    name: "Tóth Péter",
    restaurant: "WINESTONE",
    text: "A havi karbantartás leveszi a terhet a vállunkról. Mindig egységes a megjelenésünk minden platformon.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-12 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Mit mondanak ügyfeleink?</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"{t.text}"</p>
              <div className="flex items-center">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.restaurant}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};