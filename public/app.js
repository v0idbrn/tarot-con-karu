/* ============================================================
   Tarot con Karu — lógica de la landing
   La landing es un índice: cada banner abre su página propia.
   Acá solo se completa el banner del Año Nuevo, los contadores
   del hero y el año del footer.
   ============================================================ */

import {
  NEW_YEAR_SERVICE,
  TIRADA_SERVICES,
  SESSION_SERVICES,
  RITUAL_SERVICES,
} from "./data/services.js";

const yearEl = document.getElementById("year");

function formatPrice(value) {
  return typeof value === "number" ? `$${value.toLocaleString("es-AR")}` : null;
}

/* ---------------- Año Nuevo ---------------- */

function renderNewYear() {
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  };

  setText("an-etiqueta", NEW_YEAR_SERVICE.etiqueta);
  setText("an-titulo", NEW_YEAR_SERVICE.nombreCorto ?? NEW_YEAR_SERVICE.nombre);
  setText("an-desc", NEW_YEAR_SERVICE.bannerTexto ?? NEW_YEAR_SERVICE.descripcion);
  setText("an-cta", NEW_YEAR_SERVICE.bannerCta);

  const priceEl = document.getElementById("an-precio");
  if (priceEl) {
    priceEl.textContent =
      formatPrice(NEW_YEAR_SERVICE.precio) ??
      NEW_YEAR_SERVICE.precioTexto ??
      "A confirmar";
  }

  const link = document.getElementById("an-link");
  if (link && NEW_YEAR_SERVICE.pageUrl) link.href = NEW_YEAR_SERVICE.pageUrl;
}

/* ---------------- Inicio ---------------- */

renderNewYear();

const counts = {
  "tiradas-count": TIRADA_SERVICES.length,
  "sesiones-count": SESSION_SERVICES.length,
  "rituales-count": RITUAL_SERVICES.length,
};

Object.entries(counts).forEach(([id, value]) => {
  const el = document.getElementById(id);
  if (el) el.textContent = String(value);
});

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
