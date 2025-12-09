import { useState, type FC, type FormEvent, type ChangeEvent } from 'react';
import { ShieldCheck, CreditCard, Lock, Check, AlertCircle, ExternalLink, MapPin, UploadCloud, ArrowLeft } from 'lucide-react';
import { Button } from './Button';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../constants';

// ==============================================================================
// ÚTMUTATÓ A BEÁLLÍTÁSHOZ:
// 1. Menj a Stripe Dashboard -> Payment Links menüpontba.
// 2. Hozz létre egy új linket, ami tartalmazza mindkét terméket (Alapozás + Havi díj).
// 3. Másold ki az URL-t (pl. https://buy.stripe.com/...)
// 4. Illeszd be az alábbi változóba az idézőjelek közé:
// ==============================================================================
const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_fZu4gyfFv6YT6Df40K9IQ00"; 
// ==============================================================================

interface CheckoutProps {
  onBack?: () => void;
}

export const Checkout: FC<CheckoutProps> = ({ onBack }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '', // Új mező a címnek
  });

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
    }
  };

  const handlePay = async (e: FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) return;
    
    if (STRIPE_PAYMENT_LINK.includes("PLACEHOLDER")) {
      setError("Technikai hiba: A fizetési link még nincs beállítva. Kérlek vedd fel a kapcsolatot az ügyfélszolgálattal.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    // Fájlnevek összegyűjtése
    let fileNames = "Nem választott ki fájlokat";
    if (selectedFiles && selectedFiles.length > 0) {
       fileNames = Array.from(selectedFiles).map((f: any) => f.name).join(", ");
    }

    // Időpont formázása
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' });

    try {
      // 1. LÉPÉS: Email küldése az ADMINNAK (NEKED)
      const adminMessage = `
🎉 ÚJ FIZETETT MEGRENDELÉS ÉRKEZETT!

Cím / Telephely: 
${formData.address}

Feltöltött / Kiválasztott fájlok nevei: 
${fileNames}
      `;

      if (!EMAIL_CONFIG.SERVICE_ID.includes("PLACEHOLDER")) {
          // A) Email NEKED (Admin)
          // Nem várunk await-tel, hogy ne akassza meg a böngészőt, ha lassú
          emailjs.send(
            EMAIL_CONFIG.SERVICE_ID,
            EMAIL_CONFIG.ADMIN_TEMPLATE_ID, 
            {
              name: `RENDELÉS: ${formData.name}`,
              email: formData.email,
              from_email: formData.email,
              message: adminMessage,
              time: formattedTime,
            },
            EMAIL_CONFIG.PUBLIC_KEY
          ).catch(err => console.error("Admin email hiba (nem blokkoló):", err));

          // B) Email az ÜGYFÉLNEK (Visszaigazolás)
          emailjs.send(
            EMAIL_CONFIG.SERVICE_ID,
            EMAIL_CONFIG.CONFIRMATION_TEMPLATE_ID, 
            {
              to_email: formData.email,       // Fontos: Ide küldjük!
              customer_name: formData.name,   // A sablonba
            },
            EMAIL_CONFIG.PUBLIC_KEY
          ).catch(err => console.error("Ügyfél email hiba (nem blokkoló):", err));

      } else {
        console.log("Szimulált email küldés: Rendelés adatok elmentve.", formData, fileNames);
      }

      // 2. LÉPÉS: Átirányítás a Stripe-ra (Időzítővel biztosítva)
      setTimeout(() => {
        window.open(STRIPE_PAYMENT_LINK, '_blank');
        setIsProcessing(false);
      }, 1000);

    } catch (err) {
      console.error("Általános hiba:", err);
      // Ha bármi hiba van, akkor is továbbengedjük a fizetésre
      window.open(STRIPE_PAYMENT_LINK, '_blank');
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
      {/* Order Summary */}
      <div className="flex-1 bg-gray-50 dark:bg-zinc-800 p-6 rounded-2xl border border-gray-200 dark:border-zinc-700 h-fit transition-colors duration-300">
        
        {onBack && (
          <button 
            onClick={onBack}
            className="flex items-center text-sm text-gray-500 hover:text-orange-600 mb-6 transition-colors group"
          >
            <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" /> 
            Vissza a főoldalra
          </button>
        )}

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Rendelés összegzése</h3>
        
        <div className="space-y-4 mb-6">
          {/* Item 1 */}
          <div className="flex justify-between items-start pb-4 border-b border-gray-200 dark:border-zinc-700">
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">1. ALAPOZÁS (Egyszeri)</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Összes meglévő étlapkép retusálása</div>
            </div>
            <div className="font-bold text-gray-900 dark:text-white">9.890 Ft</div>
          </div>
          
          {/* Item 2 */}
          <div className="flex justify-between items-start pb-4 border-b border-gray-200 dark:border-zinc-700">
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">2. KARBANTARTÁS (Havi)</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Havi biztonsági mentés és prioritás</div>
              <div className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                <Check size={12} className="mr-1" />
                Első 30 nap ingyenes
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-900 dark:text-white">0 Ft</div>
              <div className="text-xs text-gray-500 line-through">2.490 Ft</div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-xl font-bold text-gray-900 dark:text-white">
          <span>Fizetendő ma:</span>
          <span>9.890 Ft</span>
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">
          A havi díj (2.490 Ft) első terhelése 30 nap múlva esedékes.
        </div>
      </div>

      {/* Payment Form */}
      <div className="flex-[1.5] bg-white dark:bg-zinc-800 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-700 transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-gray-900 dark:text-white relative">
                <CreditCard className="text-orange-600" />
                <h3 className="text-xl font-bold">Biztonságos fizetés</h3>
            </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg flex items-center border border-red-200 dark:border-red-900">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handlePay} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cégnév / Név</label>
              <input 
                type="text" 
                required 
                className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-colors" 
                placeholder="Étterem Kft." 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-mail cím (kapcsolattartáshoz)</label>
              <input 
                type="email" 
                required 
                className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-colors" 
                placeholder="info@pelda.hu" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {/* ÚJ CÍM MEZŐ */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                <MapPin size={16} className="text-orange-600" />
                Cím / Telephely
              </label>
              <input 
                type="text" 
                required 
                className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-colors" 
                placeholder="1051 Budapest, Fő utca 1." 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                A pontos beazonosításhoz és számlázáshoz szükséges.
              </p>
            </div>

            {/* FÁJL KIVÁLASZTÁS MEZŐ */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                 <UploadCloud size={16} className="text-orange-600" />
                 Fotók kiválasztása (Galéria / Mappa) <span className="text-gray-500 font-normal">(Nem kötelező)</span>
              </label>
              <div className="border border-dashed border-gray-300 dark:border-zinc-600 rounded-lg p-4 bg-gray-50 dark:bg-zinc-900/50 hover:bg-orange-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer relative">
                <input 
                    type="file" 
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="text-center">
                    {selectedFiles && selectedFiles.length > 0 ? (
                        <div className="text-green-600 font-medium flex items-center justify-center gap-2">
                            <Check size={16} />
                            {selectedFiles.length} fájl kiválasztva
                        </div>
                    ) : (
                        <span className="text-gray-500 dark:text-gray-400 text-sm">Kattints ide a képek kiválasztásához</span>
                    )}
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Több képet is kiválaszthatsz.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-lg border border-gray-200 dark:border-zinc-700 mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p className="flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
              <span>
                A fizetés a <strong>Stripe</strong> biztonságos rendszerén keresztül történik új ablakban.
              </span>
            </p>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                required 
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" 
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Elfogadom az <a href="#" className="text-orange-600 hover:underline">Általános Szerződési Feltételeket</a>, és hozzájárulok az adataim kezeléséhez.
              </span>
            </label>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full text-lg py-4" isLoading={isProcessing} disabled={!acceptedTerms}>
              Adatok mentése és Fizetés <ExternalLink className="w-5 h-5 ml-2 inline" />
            </Button>
            <p className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
              <Lock size={12} />
              SSL titkosított kapcsolat.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};