// ==============================================================================
// EMAILJS BEÁLLÍTÁSOK (Töltsd ki a saját kódjaiddal!)
// ==============================================================================

export const EMAIL_CONFIG = {
  // 1. SERVICE ID
  // Javítottam a másolási hibát:
  SERVICE_ID: "service_x42ro0v", 
  
  // 2. PUBLIC KEY
  PUBLIC_KEY: "dcJWcCwGxW08FuD_V",

  // 3. ADMIN SABLON (Ami NEKED küld emailt)
  ADMIN_TEMPLATE_ID: "template_25dqdo8",

  // 4. VISSZAIGAZOLÓ SABLON (Ami az ÜGYFÉLNEK megy a Messenger linkkel)
  // Ezt hozd létre most, és a kapott ID-t írd be ide az idézőjelek közé:
  CONFIRMATION_TEMPLATE_ID: "template_svsds95"
};

/*
SEGÍTSÉG A VISSZAIGAZOLÓ SABLON BEÁLLÍTÁSÁHOZ AZ EMAILJS-EN:
------------------------------------------------------------
Kattints a "Create New Template" gombra, és állítsd be ezeket:

1. Settings (Beállítások fül):
   - Name: Vásárló Visszaigazolás
   - Subject (Tárgy): Rendelésedet sikeresen fogadtuk! ✅
   - From Name (Feladó): GasztroPixel
   - To Email (Címzett): {{to_email}}

2. Content (Tartalom fül) -> "Source Code" (< > gomb):
   - Törölj ki mindent, és másold be ezt a kódot:

<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
  <h2 style="color: #ea580c; text-align: center;">Rendelésedet fogadtuk! ✅</h2>
  <p>Kedves {{customer_name}}!</p>
  <p>Sikeresen rögzítettük az adataidat a rendszerben.</p>
  
  <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
    <strong>Mi a teendő most?</strong><br>
    Ha a fizetés sikeres volt a Stripe-on, hamarosan jelentkezünk.
    Azonnal elkezdjük feldolgozni a képeidet.
  </div>

  <p style="text-align: center; font-weight: bold;">Kérdésed van? Egyeztessünk azonnal:</p>

  <div style="text-align: center; margin: 30px 0;">
    <!-- !!! CSERÉLD KI EZT A LINKET A SAJÁTODRA (pl. https://m.me/neved) !!! -->
    <a href="https://m.me/HorvathAronGasztroPixel" style="background-color: #0084FF; color: white; padding: 15px 30px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 18px;">
      💬 Írj nekem Messengeren
    </a>
  </div>

  <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
  <p style="font-size: 12px; color: #888; text-align: center;">GasztroPixel - Professzionális Ételfotó Retusálás</p>
</div>
*/