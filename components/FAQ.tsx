import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "Mennyi idő alatt készülnek el a képek?",
    answer: "A feltöltéstől számított 24 órán belül elkészítjük a professzionálisan retusált képeket."
  },
  {
    question: "Milyen formátumban kapom meg a képeket?",
    answer: "A képeket a Wolt és Foodora által előírt optimális méretben (JPG) és felbontásban adjuk át."
  },
  {
    question: "Mi történik a próbaidőszak után?",
    answer: "A 30 napos ingyenes karbantartási időszak után eldöntheted, hogy szeretnéd-e folytatni a havi előfizetést, vagy csak eseti megbízásokat adsz."
  },
  {
    question: "Hogyan küldhetem el a fotókat?",
    answer: "A regisztráció után kapsz egy egyedi feltöltő linket, de Google Drive vagy Dropbox mappát is megoszthatsz velünk."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Gyakori Kérdések</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-5 text-left bg-gray-50 dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                {openIndex === idx ? <ChevronUp className="text-orange-600" /> : <ChevronDown className="text-gray-500" />}
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 text-gray-600 dark:text-gray-400 bg-white dark:bg-zinc-950">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};