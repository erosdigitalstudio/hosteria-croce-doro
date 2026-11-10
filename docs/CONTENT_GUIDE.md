# Guida ai contenuti
Tutto si modifica in `js/content.js`.
- **Testi**: oggetto `texts`.
- **Contatti**: `address`, `phone`, `email`, `facebook`, `mapsUrl`. Un campo `null` mostra "Da confermare" e il pulsante resta non cliccabile.
- **Orari**: `hours: [{ day: "Lunedì", time: "12:00–14:30" }]`.
- **Menù**: aggiungi voci `{ name, desc, price }` nelle categorie, oppure `menuPdf: "assets/menu.pdf"`.
- **Immagini**: copia i file autorizzati in `assets/images/` (ottimizzati) e inserisci `src` e `alt` in `gallery`; `heroImage` per la hero.
- **Eventi**: array `events` (predisposto, non ancora visualizzato).
