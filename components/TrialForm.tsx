import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { analyzeFoodImage, AnalysisResult } from '../services/geminiService';

interface TrialFormProps {
  onComplete: () => void;
}

export const TrialForm: React.FC<TrialFormProps> = ({ onComplete }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("A fájl mérete túl nagy. Kérlek használj 5MB-nál kisebb képet.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      setAnalysis(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);
    try {
      // Extract base64 data and mime type
      const base64Data = selectedImage.split(',')[1];
      const mimeType = selectedImage.split(';')[0].split(':')[1];
      
      const result = await analyzeFoodImage(base64Data, mimeType);
      setAnalysis(result);
    } catch (err) {
      setError("Hiba történt az elemzés során. Kérlek próbáld újra.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedImage(null);
    setAnalysis(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto border border-gray-100 dark:border-zinc-700">
      <div className="p-6 md:p-8">
        {!selectedImage ? (
          <div 
            className="border-2 border-dashed border-gray-300 dark:border-zinc-600 rounded-xl p-10 text-center hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Tölts fel egy ételfotót</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Húzd ide a képet, vagy kattints a tallózáshoz. JPG, PNG támogatott (max 5MB).
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative rounded-xl overflow-hidden bg-black aspect-square md:aspect-auto">
              <img src={selectedImage} alt="Uploaded" className="w-full h-full object-contain" />
              <button 
                onClick={resetForm}
                className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col justify-center">
              {!analysis ? (
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Kép betöltve</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    A Gemini AI elemzi a kép minőségét, fényeit és kompozícióját.
                  </p>
                  
                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg flex items-center mb-6">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      {error}
                    </div>
                  )}

                  <Button 
                    onClick={handleAnalyze} 
                    disabled={isLoading}
                    className="w-full md:w-auto"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Elemzés...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" /> AI Elemzés Indítása
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-5">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                       <h3 className="text-lg font-bold text-gray-900 dark:text-white">Jelenlegi Marketing Erő</h3>
                       <span className="text-2xl font-bold text-orange-600">{analysis.marketingScore}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2.5">
                      <div 
                        className="bg-orange-600 h-2.5 rounded-full transition-all duration-1000" 
                        style={{ width: `${analysis.marketingScore * 10}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-orange-50 dark:bg-zinc-700/30 p-4 rounded-lg border border-orange-100 dark:border-zinc-600">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-orange-500" />
                      Javasolt Javítások
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      {analysis.improvements.map((imp, idx) => (
                        <li key={idx}>{imp}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Összegzés</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {analysis.summary}
                    </p>
                  </div>

                  <Button onClick={onComplete} className="w-full">
                    Kérem a Profi Retusálást
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};