/* ============================================================
   Tarot con Karu — piezas compartidas de las páginas de sección
   (Lecturas, Rituales y Orientación)
   ============================================================ */

import { instagram, tiktok } from "./data/services.js";
import { copyText, copyTextAsync } from "./clipboard.js";

const toastEl = document.getElementById("toast");
let toastTimer;

export function formatPrice(value) {
  return typeof value === "number" ? `$${value.toLocaleString("es-AR")}` : null;
}

export function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null) el.textContent = value;
}

export function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toastEl.classList.remove("is-visible");
  }, 4000);
}

const copyIcon = `
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="9" y="9" width="11" height="11" rx="2.5" stroke="currentColor" stroke-width="1.7" />
    <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v7A2.5 2.5 0 0 0 5.5 15" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
  </svg>
`;

export function serviceCard(
  item,
  { label, className = "", detailLabel = "¿Qué incluye?" } = {}
) {
  const requisito = item.requisito
    ? `<p class="card-req"><span class="req-label">Requisito</span>${item.requisito}</p>`
    : "";

  const eyebrow =
    label ?? item.categoria ?? (item.duracion ? `Sesión · ${item.duracion}` : "Servicio");
  const detailId = `detalle-${item.id}`;

  return `
    <article class="card ${className}">
      <div class="card-top">
        <span class="card-cat">${eyebrow}</span>
        <span class="card-price">${formatPrice(item.precio) ?? "A confirmar"}</span>
      </div>
      <h3 class="card-title">${item.nombre}</h3>
      <button
        class="card-toggle"
        type="button"
        data-detail="${detailId}"
        data-label="${detailLabel}"
        aria-expanded="false"
        aria-controls="${detailId}"
      >
        <span class="card-toggle-label">${detailLabel}</span>
        <span class="card-toggle-icon" aria-hidden="true">⌄</span>
      </button>
      <div class="card-detail" id="${detailId}" hidden>
        <p class="card-desc">${item.descripcion}</p>
        ${requisito}
      </div>
      <button class="btn btn-card" type="button" data-copy="${item.id}">
        ${copyIcon}
        Copiar mensaje y abrir IG
      </button>
    </article>
  `;
}

export function buildMessage(item, kind) {
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

export function registerItems(registry, kind, items) {
  items.forEach((item) => {
    registry.set(item.id, { item, kind });
  });
}

export function initSectionPage(registry) {
  document.querySelectorAll("[data-ig]").forEach((link) => {
    link.href = instagram.url;
  });
  document.querySelectorAll("[data-tiktok]").forEach((link) => {
    link.href = tiktok.url;
  });

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-detail]");
    if (!toggle) return;

    const detail = document.getElementById(toggle.dataset.detail);
    if (!detail) return;

    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    detail.hidden = expanded;

    const labelEl = toggle.querySelector(".card-toggle-label");
    if (labelEl) {
      labelEl.textContent = expanded ? toggle.dataset.label : "Ocultar";
    }
  });

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-copy]");
    if (!trigger) return;

    const entry = registry.get(trigger.dataset.copy);
    if (!entry) return;

    const message = buildMessage(entry.item, entry.kind);

    // 1) Copiar primero, todavía dentro del gesto del clic.
    const copied = copyText(message);

    // 2) Abrir Instagram en el mismo gesto para que el navegador no lo bloquee.
    window.open(instagram.url, "_blank", "noopener,noreferrer");

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

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}
