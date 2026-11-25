/* ============================================================
   Tarot con Karu — página de Trabajos de Brujería Ritual
   Renderiza el paso previo obligatorio y los rituales.
   ============================================================ */

import {
  TIRADA_SERVICES,
  RITUAL_PREVIOUS_STEP,
  RITUAL_SERVICES,
  SECTION_PAGES,
} from "./data/services.js";
import {
  formatPrice,
  initSectionPage,
  registerItems,
  serviceCard,
  setText,
} from "./section-page.js";

const registry = new Map();

const page = SECTION_PAGES.rituales;
setText("page-title", page.titulo);
setText("page-lead", page.lead);
setText("ritual-warning-text", RITUAL_PREVIOUS_STEP);

const limpia = TIRADA_SERVICES.find(
  (tirada) => tirada.id === "necesito-una-limpia"
);

const prerequisiteEl = document.getElementById("prerequisite-card");
if (prerequisiteEl && limpia) {
  prerequisiteEl.innerHTML = serviceCard(limpia, {
    label: "Paso previo obligatorio",
    className: "card--prerequisite",
    detailLabel: "¿Qué incluye?",
  });
}

const ritualesGrid = document.getElementById("rituales-grid");
if (ritualesGrid) {
  ritualesGrid.innerHTML = RITUAL_SERVICES.map((ritual) =>
    serviceCard(ritual, {
      label: "Ritual",
      className: "card--ritual",
      detailLabel: "¿Qué hace?",
    })
  ).join("");
}

setText("rituales-cta-precio", formatPrice(limpia?.precio));

registerItems(registry, "ritual", RITUAL_SERVICES);
registerItems(registry, "tirada", [limpia].filter(Boolean));

initSectionPage(registry);
