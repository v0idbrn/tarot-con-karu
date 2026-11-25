/* ============================================================
   Tarot con Karu — página de Lecturas de Tarot
   Renderiza tiradas (con filtros) y sesiones por tiempo.
   ============================================================ */

import {
  TIRADA_SERVICES,
  SESSION_SERVICES,
  SESSION_SERVICES_INTRO,
  ORIENTATION_SERVICE,
  SECTION_PAGES,
} from "./data/services.js";
import {
  formatPrice,
  initSectionPage,
  registerItems,
  serviceCard,
  setText,
} from "./section-page.js";

const ALL = "Todas";
const registry = new Map();
let activeCategory = ALL;

const page = SECTION_PAGES.lecturas;
setText("page-title", page.titulo);
setText("page-lead", page.lead);

/* ---------------- Tiradas ---------------- */

const tiradasGrid = document.getElementById("tiradas-grid");
const filtersEl = document.getElementById("filtros");

function renderTiradas() {
  if (!tiradasGrid) return;

  const list =
    activeCategory === ALL
      ? TIRADA_SERVICES
      : TIRADA_SERVICES.filter((tirada) => tirada.categoria === activeCategory);

  tiradasGrid.innerHTML = list
    .map((tirada) =>
      serviceCard(tirada, {
        label: tirada.categoria,
        detailLabel: "¿Qué incluye?",
      })
    )
    .join("");
}

function renderFilters() {
  if (!filtersEl) return;

  const categories = [
    ALL,
    ...new Set(TIRADA_SERVICES.map((tirada) => tirada.categoria)),
  ];

  filtersEl.innerHTML = categories
    .map(
      (category) => `
        <button
          class="filter"
          type="button"
          data-filter="${category}"
          aria-pressed="${category === activeCategory}"
        >${category}</button>
      `
    )
    .join("");
}

if (filtersEl) {
  filtersEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    activeCategory = button.dataset.filter;

    filtersEl.querySelectorAll("[data-filter]").forEach((filter) => {
      filter.setAttribute(
        "aria-pressed",
        String(filter.dataset.filter === activeCategory)
      );
    });

    renderTiradas();
  });
}

/* ---------------- Sesiones ---------------- */

const sesionesGrid = document.getElementById("sesiones-grid");
const sessionIntro = document.getElementById("session-intro");

if (sessionIntro) sessionIntro.textContent = SESSION_SERVICES_INTRO;

if (sesionesGrid) {
  sesionesGrid.innerHTML = SESSION_SERVICES.map((sesion) =>
    serviceCard(sesion, {
      label: `Sesión · ${sesion.duracion}`,
      className: "card--sesion",
      detailLabel: "¿En qué consiste?",
    })
  ).join("");
}

/* ---------------- Pestañas ---------------- */

const tabs = Array.from(document.querySelectorAll('[role="tab"]'));

function activateTab(tab) {
  tabs.forEach((current) => {
    const selected = current === tab;
    const panel = document.getElementById(current.getAttribute("aria-controls"));

    current.setAttribute("aria-selected", String(selected));
    current.tabIndex = selected ? 0 : -1;
    if (panel) panel.hidden = !selected;
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab));
  tab.addEventListener("keydown", (event) => {
    const index = tabs.indexOf(tab);
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;

    event.preventDefault();
    let next = index;

    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;

    activateTab(tabs[next]);
    tabs[next].focus();
  });
});

document.querySelectorAll("[data-tab-target]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const tab = document.getElementById(link.dataset.tabTarget);
    if (!tab) return;

    activateTab(tab);
    const tabsEl = document.getElementById("lecturas-tabs");
    if (tabsEl) tabsEl.scrollIntoView({ block: "start" });
  });
});

if (window.location.hash === "#sesiones") {
  const tab = document.getElementById("tab-sesiones");
  if (tab) activateTab(tab);
}

/* ---------------- CTA y copiado ---------------- */

setText("lecturas-cta-precio", formatPrice(ORIENTATION_SERVICE.precio));

registerItems(registry, "tirada", TIRADA_SERVICES);
registerItems(registry, "sesion", SESSION_SERVICES);

renderFilters();
renderTiradas();
initSectionPage(registry);
