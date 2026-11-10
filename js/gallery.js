(function () {
  const S = window.SITE, root = document.getElementById("gallery"), dlg = document.getElementById("lightbox");
  if (!root || !dlg) return;
  const real = S.gallery.filter(g => g.src); let cur = 0;
  const show = () => { const g = real[cur], i = document.getElementById("lbImg"); i.src = g.src; i.alt = g.alt; document.getElementById("lbCap").textContent = g.alt; };
  const step = n => { cur = (cur + n + real.length) % real.length; show(); };
  S.gallery.forEach(g => {
    const size = g.size ? " gallery__i--" + g.size : "";
    if (!g.src) { const d = document.createElement("div"); d.className = "gallery__i" + size; d.style.display = "grid"; d.style.placeItems = "center"; d.innerHTML = `<span class="gallery__placeholder-mark" aria-hidden="true">✦</span><span>FOTOGRAFIA DA INSERIRE</span>`; root.appendChild(d); return; }
    const b = document.createElement("button"); b.className = "gallery__i" + size; b.setAttribute("aria-label", "Ingrandisci: " + g.alt);
    const i = new Image(); i.loading = "lazy"; i.width = 800; i.height = 600; i.src = g.src; i.alt = g.alt; b.appendChild(i);
    b.addEventListener("click", () => { cur = real.indexOf(g); show(); dlg.showModal(); }); root.appendChild(b);
  });
  document.getElementById("lbClose").onclick = () => dlg.close();
  document.getElementById("lbPrev").onclick = () => step(-1);
  document.getElementById("lbNext").onclick = () => step(1);
  dlg.addEventListener("keydown", e => { if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1); });
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
})();
