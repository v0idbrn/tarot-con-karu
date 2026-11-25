/* ============================================================
   Tarot con Karu — página de la Consulta de Orientación
   Renderiza el detalle completo desde ORIENTATION_SERVICE.
   ============================================================ */

import { ORIENTATION_SERVICE, SECTION_PAGES } from "./data/services.js";
import {
  formatPrice,
  initSectionPage,
  registerItems,
  setText,
} from "./section-page.js";

const registry = new Map();

const page = SECTION_PAGES.orientacion;
setText("page-title", page.titulo);
setText("page-lead", page.lead);

const card = document.getElementById("orientation-card");

if (card) {
  card.innerHTML = `
    <div>
      <p class="eyebrow">
        <span class="eyebrow-line" aria-hidden="true"></span>No sé por dónde empezar
      </p>
      <h2>${ORIENTATION_SERVICE.nombre}</h2>
      <p class="orientation-desc">${ORIENTATION_SERVICE.descripcion}</p>
      <p class="orientation-note">${ORIENTATION_SERVICE.duracion}</p>
    </div>
    <aside class="orientation-aside" aria-label="Precio y contratación de la Consulta de Orientación">
      <p class="mini-label">Valor de la consulta</p>
      <p class="orientation-price">${formatPrice(ORIENTATION_SERVICE.precio)}</p>
      <p class="orientation-bonus">${ORIENTATION_SERVICE.precioNota}</p>
      <button class="btn btn-primary" type="button" data-copy="${ORIENTATION_SERVICE.id}">
        Copiar mensaje y abrir IG
      </button>
    </aside>
  `;
}

const pasosEl = document.getElementById("orientacion-pasos");
if (pasosEl && Array.isArray(ORIENTATION_SERVICE.pasos)) {
  pasosEl.innerHTML = ORIENTATION_SERVICE.pasos
    .map(
      (paso) => `
        <article class="feature">
          <h3 class="feature-title">${paso.titulo}</h3>
          <p class="feature-text">${paso.texto}</p>
        </article>
      `
    )
    .join("");
}

setText("orientacion-aclaracion", ORIENTATION_SERVICE.aclaracion);
setText("orientacion-cta-precio", formatPrice(ORIENTATION_SERVICE.precio));

registerItems(registry, "orientacion", [ORIENTATION_SERVICE]);

initSectionPage(registry);
