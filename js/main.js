(function () {
  "use strict";
  try {
    const S = window.SITE, $ = id => document.getElementById(id);
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    document.querySelectorAll("[data-text]").forEach(el => el.textContent = S.texts[el.dataset.text] || "");
    if (S.heroImage) { const h = document.querySelector('[data-slot="hero"]'); h.textContent = ""; const i = new Image(); i.src = S.heroImage; i.alt = ""; i.width = 1920; i.height = 1080; h.appendChild(i); }
    const btn = (label, href) => href ? `<a class="btn" href="${esc(href)}" target="_blank" rel="noopener">${label}</a>` : `<span class="btn" aria-disabled="true">${label} (da confermare)</span>`;
    const tbc = v => v ? esc(v) : '<span class="tbc">Da confermare</span>';
    if (!S.phone) { const booking = document.querySelector("[data-book]"); booking.removeAttribute("href"); booking.setAttribute("aria-disabled", "true"); booking.setAttribute("title", "Prenotazioni: contatto da confermare"); booking.textContent = "Prenotazioni in arrivo"; }
    if (S.phone) { const tel = "tel:" + S.phone.replace(/\s/g, ""); $("heroCall").innerHTML = `<a class="btn" href="${esc(tel)}">Chiama</a>`; document.querySelector("[data-book]").href = tel; }
    $("contacts").innerHTML = [["Attività", esc(S.name)], ["Indirizzo", tbc(S.address)], ["Telefono", tbc(S.phone)], ["Email", tbc(S.email)]].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
    $("contactActions").innerHTML = btn("Indicazioni", S.mapsUrl) + (S.facebook ? btn("Facebook", S.facebook) : "");
    $("hours").innerHTML = S.hours.length ? S.hours.map(h => `<div><span>${esc(h.day)}</span><span>${esc(h.time)}</span></div>`).join("") : '<p class="tbc">Orari da confermare.</p>';
    $("footSocial").innerHTML = S.facebook ? `<a href="${esc(S.facebook)}" target="_blank" rel="noopener">Facebook</a>` : '<span class="tbc">Social: da confermare</span>';
    const cats = Object.entries(S.menu), any = cats.some(([, v]) => v.length);
    $("menuRoot").innerHTML = any ? cats.map(([c, items]) => `<section><h3>${esc(c)}</h3><ul>${items.length ? items.map(i => `<li><span><strong>${esc(i.name)}</strong>${i.desc ? "<br>" + esc(i.desc) : ""}</span><span>${i.price ? esc(i.price) : ""}</span></li>`).join("") : '<li class="empty">In arrivo</li>'}</ul></section>`).join("") : '<div class="demo">Stato dimostrativo: il menù ufficiale non è ancora disponibile. Nessun piatto o prezzo è stato inserito.</div>';
    const catRoot = $("menuCategories");
    const catNames = Object.keys(S.menu);
    if (catRoot && catNames.length) {
      catRoot.innerHTML = catNames.map((name, i) => `<button type="button" class="menu-category${i === 0 ? " is-active" : ""}" data-category="${esc(name)}" aria-pressed="${i === 0}">${esc(name)}</button>`).join("");
      const categoryButtons = [...catRoot.querySelectorAll("button")];
      const menuSections = [...$("menuRoot").querySelectorAll(":scope > section")];
      const activateCategory = index => {
        categoryButtons.forEach((b, i) => { b.classList.toggle("is-active", i === index); b.setAttribute("aria-pressed", String(i === index)); });
        menuSections.forEach((s, i) => { s.hidden = i !== index; });
      };
      if (menuSections.length) {
        activateCategory(0);
        categoryButtons.forEach((b, i) => b.addEventListener("click", () => activateCategory(i)));
      } else catRoot.hidden = true;
    }
    const mobileTabs = [...document.querySelectorAll("[data-mobile-tab]")];
    const mobileScreens = {
      home: [document.querySelector(".hero")],
      menu: [document.getElementById("menu")],
      gallery: [document.getElementById("galleria")],
      contacts: [document.getElementById("contatti")],
      story: [...document.querySelectorAll(".mobile-story")]
    };
    const mobileQuery = matchMedia("(max-width: 760px)");
    const screenFromHash = () => {
      const id = location.hash.slice(1);
      if (id === "menu") return "menu";
      if (id === "galleria") return "gallery";
      if (id === "contatti") return "contacts";
      if (["ristorante", "cucina", "esperienza"].includes(id)) return "story";
      return "home";
    };
    const updateMobileScreen = () => {
      const active = screenFromHash();
      document.body.dataset.mobileScreen = active;
      mobileTabs.forEach(a => {
        const selected = a.dataset.mobileTab === active;
        a.classList.toggle("is-active", selected);
        if (selected) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
      });
      if (mobileQuery.matches) {
        document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-in"));
        requestAnimationFrame(() => scrollTo({ top: 0, behavior: "instant" }));
      }
    };
    addEventListener("hashchange", updateMobileScreen);
    mobileQuery.addEventListener?.("change", updateMobileScreen);
    updateMobileScreen();
    if (S.menuPdf) $("menuPdf").innerHTML = `<p style="margin-top:2rem">${btn("Scarica il menù (PDF)", S.menuPdf)}</p>`;
    const hd = $("header"), burger = $("burger");
    const onScroll = () => hd.classList.toggle("is-scrolled", scrollY > 40); onScroll(); addEventListener("scroll", onScroll, { passive: true });
    const setOpen = o => { hd.classList.toggle("is-open", o); burger.setAttribute("aria-expanded", o); burger.setAttribute("aria-label", o ? "Chiudi il menu" : "Apri il menu"); };
    burger.addEventListener("click", () => setOpen(!hd.classList.contains("is-open")));
    $("nav").addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });
    addEventListener("keydown", e => { if (e.key === "Escape") { setOpen(false); burger.focus(); } });
    document.addEventListener("pointerdown", e => { if (hd.classList.contains("is-open") && !hd.contains(e.target)) setOpen(false); });
    matchMedia("(min-width: 941px)").addEventListener?.("change", e => { if (e.matches) setOpen(false); });
    const els = document.querySelectorAll(".reveal");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) els.forEach(el => el.classList.add("is-in"));
    else if ("IntersectionObserver" in window) { const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: .12 }); els.forEach(el => io.observe(el)); }
    else els.forEach(el => el.classList.add("is-in"));
  } catch (err) { console.error("Errore inizializzazione sito:", err); document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-in")); }
})();
