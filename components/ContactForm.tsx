import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { EMAIL_CONFIG } from '../constants';

export const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.ADMIN_TEMPLATE_ID, // Using admin template for contact form notifications
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email,
      },
      EMAIL_CONFIG.PUBLIC_KEY
    )
    .then(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      console.error('Email error:', error);
      setStatus('error');
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-700">
      {status === 'success' ? (
        <div className="text-center py-10">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Üzenet elküldve!</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Hamarosan felvesszük veled a kapcsolatot.</p>
          <Button onClick={() => setStatus('idle')} variant="outline">Új üzenet küldése</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Név</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="Teljes név"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email cím</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="pelda@email.hu"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Üzenet</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="Miben segíthetünk?"
            ></textarea>
          </div>

          {status === 'error' && (
            <div className="flex items-center text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <AlertCircle size={16} className="mr-2" />
              Hiba történt a küldés során. Kérlek próbáld újra később.
            </div>
          )}

          <Button type="submit" className="w-full" disabled={status === 'sending'}>
            {status === 'sending' ? (
              <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Küldés folyamatban...</>
            ) : (
              <><Send className="w-5 h-5 mr-2" /> Üzenet küldése</>
            )}
          </Button>
        </form>
      )}
    </div>
  );
};