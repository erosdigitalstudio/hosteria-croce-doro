/* Unico file da modificare per aggiornare i contenuti. null / [] = dato non confermato (mostra segnaposto). */
window.SITE = {
  name: "Hosteria Croce d'Oro",
  city: "Desenzano del Garda",
  address: null,      // DA VERIFICARE
  phone: null,        // DA VERIFICARE (abilita Chiama e Prenota)
  email: null,        // DA CONFERMARE
  facebook: null,     // URL pagina ufficiale, previa verifica
  mapsUrl: null,      // link indicazioni stradali (link esterno)
  menuPdf: null,      // es. "assets/menu.pdf"
  heroImage: null,    // es. "assets/images/hero.jpg"
  hours: [],          // es. [{ day: "Lunedì", time: "Chiuso" }]
  menu: { Antipasti: [], Primi: [], Secondi: [], Dolci: [], Bevande: [] }, // voci: { name, desc, price }
  gallery: [          // src: immagine autorizzata; size: "l" | "w" | ""
    { src: null, alt: "Spazio per fotografia del locale", size: "l" },
    { src: null, alt: "Spazio per fotografia", size: "" },
    { src: null, alt: "Spazio per fotografia", size: "" },
    { src: null, alt: "Spazio per fotografia", size: "w" },
    { src: null, alt: "Spazio per fotografia", size: "" }
  ],
  events: [],
  texts: {
    tagline: "Un luogo da vivere, una storia da raccontare.",
    intro: "Un invito a scoprire l’identità del ristorante. Qui prenderà forma il racconto autentico della sua storia e dell’ospitalità, con i contenuti approvati dalla proprietà.",
    kitchen: "Ogni cucina ha una propria voce. Questo spazio accoglierà il racconto dei sapori, delle preparazioni e della proposta gastronomica, una volta verificati con il ristorante.",
    quote: "La bellezza delle cose autentiche sta nei dettagli."
  }
};
