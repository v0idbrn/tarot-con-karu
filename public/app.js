/* ============================================================
   Tarot con Karu — lógica del sitio
   Renderiza tiradas, sesiones, rituales, orientación, Año Nuevo,
   filtros, pestañas y el copiado con apertura de Instagram.
   ============================================================ */

import {
  NEW_YEAR_SERVICE,
  TIRADA_SERVICES,
  SESSION_SERVICES_INTRO,
  SESSION_SERVICES,
  RITUAL_PREVIOUS_STEP,
  RITUAL_SERVICES,
  ORIENTATION_SERVICE,
  instagram,
} from "./data/services.js";

const IG_URL = instagram.url;
const ALL = "Todas";

const registry = new Map();

const toastEl = document.getElementById("toast");
const yearEl = document.getElementById("year");

let activeCategory = ALL;
let toastTimer;

/* ---------------- Utilidades ---------------- */

function formatPrice(value) {
  return typeof value === "number" ? `$${value.toLocaleString("es-AR")}` : null;
}

function register(kind, items) {
  items.forEach((item) => {
    registry.set(item.id, { item, kind });
  });
}

function buildMessage(item, kind) {
  if (item.mensaje) return item.mensaje;

  const price = formatPrice(item.precio);
  const priceText = price ? ` (${price})` : "";
  const greeting = "¡Hola Karu! 🌙";

  if (kind === "ritual") {
    return `${greeting} Me interesa el ritual «${item.nombre}»${priceText}. Entiendo que primero necesito la tirada «¿Necesito una limpia?». ¿Cómo coordinamos? ¡Gracias! ✨`;
  }

  if (kind === "sesion") {
    return `${greeting} Me interesa la «${item.nombre}»${priceText}. ¿Tenés disponibilidad para una sesión? ¡Gracias! ✨`;
  }

  if (kind === "orientacion") {
    return `${greeting} Quiero reservar la «${item.nombre}»${priceText}. ¿Me contás cómo seguimos? ¡Gracias! ✨`;
  }

  return `${greeting} Me interesa la tirada «${item.nombre}»${priceText}. ¿Tenés disponibilidad para una lectura? ¡Gracias! ✨`;
}

/*
 * La copia es sincrónica y ocurre dentro del gesto del clic: si se abre
 * Instagram antes de copiar, la pestaña nueva se queda con el foco y la
 * escritura en el portapapeles falla.
 */
function copyText(text) {
  let copied = false;
  let textarea = null;
  const previousFocus = document.activeElement;

  try {
    textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.setAttribute("aria-hidden", "true");
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "-9999px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    copied = document.execCommand("copy");
  } catch (error) {
    copied = false;
  }

  if (textarea) textarea.remove();
  if (previousFocus && typeof previousFocus.focus === "function") {
    previousFocus.focus();
  }

  return copied;
}

/* Respaldo asíncrono para navegadores donde execCommand no está disponible. */
function copyTextAsync(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(
      () => true,
      () => false
    );
  }
  return Promise.resolve(false);
}

function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toastEl.classList.remove("is-visible");
  }, 4000);
}

/* ---------------- Tarjetas ---------------- */

const copyIcon = `
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="9" y="9" width="11" height="11" rx="2.5" stroke="currentColor" stroke-width="1.7" />
    <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v7A2.5 2.5 0 0 0 5.5 15" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
  </svg>
`;

function serviceCard(item, { label, className = "" } = {}) {
  const requisito = item.requisito
    ? `<p class="card-req"><span class="req-label">Requisito</span>${item.requisito}</p>`
    : "";

  const eyebrow =
    label ?? item.categoria ?? (item.duracion ? `Sesión · ${item.duracion}` : "Servicio");

  return `
    <article class="card ${className}">
      <div class="card-top">
        <span class="card-cat">${eyebrow}</span>
        <span class="card-price">${formatPrice(item.precio) ?? "A confirmar"}</span>
      </div>
      <h3 class="card-title">${item.nombre}</h3>
      <p class="card-desc">${item.descripcion}</p>
      ${requisito}
      <button class="btn btn-card" type="button" data-copy="${item.id}">
        ${copyIcon}
        Copiar mensaje y abrir IG
      </button>
    </article>
  `;
}

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
    .map((tirada) => serviceCard(tirada, { label: tirada.categoria }))
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

/* ---------------- Sesiones ---------------- */

const sesionesGrid = document.getElementById("sesiones-grid");
const sessionIntro = document.getElementById("session-intro");

if (sessionIntro) {
  sessionIntro.textContent = SESSION_SERVICES_INTRO;
}

if (sesionesGrid) {
  sesionesGrid.innerHTML = SESSION_SERVICES.map((sesion) =>
    serviceCard(sesion, {
      label: `Sesión · ${sesion.duracion}`,
      className: "card--sesion",
    })
  ).join("");
}

/* ---------------- Rituales ---------------- */

const ritualesGrid = document.getElementById("rituales-grid");
const ritualWarning = document.getElementById("ritual-warning-text");

if (ritualWarning) {
  ritualWarning.textContent = RITUAL_PREVIOUS_STEP;
}

if (ritualesGrid) {
  ritualesGrid.innerHTML = RITUAL_SERVICES.map((ritual) =>
    serviceCard(ritual, { label: "Ritual", className: "card--ritual" })
  ).join("");
}

/* ---------------- Orientación ---------------- */

const orientationCard = document.getElementById("orientation-card");

if (orientationCard) {
  orientationCard.innerHTML = `
    <div>
      <p class="eyebrow">
        <span class="eyebrow-line" aria-hidden="true"></span>No sé por dónde empezar
      </p>
      <h2>${ORIENTATION_SERVICE.nombre}</h2>
      <p class="orientation-desc">${ORIENTATION_SERVICE.descripcion}</p>
      <p class="orientation-note">Consulta de asesoramiento de hasta 15 minutos · no incluye tirada de cartas.</p>
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

/* ---------------- Año Nuevo ---------------- */

function renderNewYear() {
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  };

  setText("an-etiqueta", NEW_YEAR_SERVICE.etiqueta);
  setText("an-titulo", NEW_YEAR_SERVICE.nombre);
  setText("an-desc", NEW_YEAR_SERVICE.descripcion);
  setText("an-incluye-titulo", NEW_YEAR_SERVICE.incluyeTitulo);
  setText("an-entrega-titulo", NEW_YEAR_SERVICE.entrega?.titulo);

  const priceEl = document.getElementById("an-precio");
  if (priceEl) {
    priceEl.textContent =
      formatPrice(NEW_YEAR_SERVICE.precio) ??
      NEW_YEAR_SERVICE.precioTexto ??
      "A confirmar";
  }

  setText("an-precio-nota", NEW_YEAR_SERVICE.precioNota);

  const incluyeEl = document.getElementById("an-incluye");
  if (incluyeEl && Array.isArray(NEW_YEAR_SERVICE.incluye)) {
    incluyeEl.innerHTML = NEW_YEAR_SERVICE.incluye
      .map(
        (item) => `
          <article class="feature">
            <h4 class="feature-title">${item.titulo}</h4>
            <p class="feature-text">${item.texto}</p>
          </article>
        `
      )
      .join("");
  }

  const entregaEl = document.getElementById("an-entrega");
  const entrega = NEW_YEAR_SERVICE.entrega;
  if (entregaEl && entrega) {
    const modalidades = Array.isArray(entrega.modalidades)
      ? entrega.modalidades
          .map(
            (modalidad) => `
              <li class="delivery-mode">
                <h4 class="feature-title">${modalidad.titulo}</h4>
                <p class="feature-text">${modalidad.texto}</p>
              </li>
            `
          )
          .join("")
      : "";

    entregaEl.innerHTML = `
      <article class="feature feature--reading">
        <h4 class="feature-title">${entrega.lectura.titulo}</h4>
        <p class="feature-text">${entrega.lectura.texto}</p>
      </article>
      <div class="delivery-modes">
        <p class="delivery-intro">${entrega.velaIntro}</p>
        <ol class="delivery-list">${modalidades}</ol>
      </div>
    `;
  }

  const condEl = document.getElementById("an-cond");
  if (condEl && Array.isArray(NEW_YEAR_SERVICE.condiciones)) {
    condEl.innerHTML = NEW_YEAR_SERVICE.condiciones
      .map((item) => `<li>${item}</li>`)
      .join("");
  }
}

/* ---------------- Copiar y abrir Instagram ---------------- */

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-copy]");
  if (!trigger) return;

  const entry = registry.get(trigger.dataset.copy);
  if (!entry) return;

  const message = buildMessage(entry.item, entry.kind);

  // 1) Copiar primero, todavía dentro del gesto del clic.
  const copied = copyText(message);

  // 2) Abrir Instagram en el mismo gesto para que el navegador no lo bloquee.
  window.open(IG_URL, "_blank", "noopener,noreferrer");

  const successMessage = `Mensaje copiado ✦ Pegalo en el DM de ${instagram.handle}`;
  const failureMessage =
    "Abrimos Instagram: copiá el mensaje manualmente si no se copió.";

  if (copied) {
    showToast(successMessage);
    return;
  }

  copyTextAsync(message).then((copiedAsync) => {
    showToast(copiedAsync ? successMessage : failureMessage);
  });
});

/* ---------------- Inicio ---------------- */

register("tirada", TIRADA_SERVICES);
register("sesion", SESSION_SERVICES);
register("ritual", RITUAL_SERVICES);
register("orientacion", [ORIENTATION_SERVICE]);
register("ano-nuevo", [NEW_YEAR_SERVICE]);

renderFilters();
renderTiradas();
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
