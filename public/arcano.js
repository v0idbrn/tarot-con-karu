/* ============================================================
   Tarot con Karu — página del Pack Arcano del Año
   Renderiza el contenido de NEW_YEAR_SERVICE y maneja el copiado
   con apertura de Instagram.
   ============================================================ */

import { NEW_YEAR_SERVICE, instagram, tiktok } from "./data/services.js";
import { copyText, copyTextAsync } from "./clipboard.js";

const toastEl = document.getElementById("toast");
const yearEl = document.getElementById("year");

let toastTimer;

function formatPrice(value) {
  return typeof value === "number" ? `$${value.toLocaleString("es-AR")}` : null;
}

function priceText() {
  return (
    formatPrice(NEW_YEAR_SERVICE.precio) ??
    NEW_YEAR_SERVICE.precioTexto ??
    "A confirmar"
  );
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null) el.textContent = value;
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

function render() {
  document.title = `${NEW_YEAR_SERVICE.nombre} · Tarot con Karu`;

  setText("an-etiqueta", NEW_YEAR_SERVICE.etiqueta);
  setText("an-titulo", NEW_YEAR_SERVICE.nombre);
  setText("an-desc", NEW_YEAR_SERVICE.descripcion);
  setText("an-precio", priceText());
  setText("an-cta-precio", priceText());
  setText("an-precio-nota", NEW_YEAR_SERVICE.precioNota);
  setText("an-incluye-titulo", NEW_YEAR_SERVICE.incluyeTitulo);
  setText("an-entrega-titulo", NEW_YEAR_SERVICE.entrega?.titulo);

  const sorteo = NEW_YEAR_SERVICE.sorteo;
  if (sorteo) {
    const sorteoSection = document.getElementById("sorteo");
    if (sorteoSection) sorteoSection.hidden = false;
    setText("an-sorteo-titulo", sorteo.titulo);
    setText("an-sorteo-texto", sorteo.texto);
  } else {
    const sorteoSection = document.getElementById("sorteo");
    if (sorteoSection) sorteoSection.hidden = true;
  }

  const incluyeEl = document.getElementById("an-incluye");
  if (incluyeEl && Array.isArray(NEW_YEAR_SERVICE.incluye)) {
    incluyeEl.innerHTML = NEW_YEAR_SERVICE.incluye
      .map(
        (item) => `
          <article class="feature">
            <h3 class="feature-title">${item.titulo}</h3>
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
                <h3 class="feature-title">${modalidad.titulo}</h3>
                <p class="feature-text">${modalidad.texto}</p>
              </li>
            `
          )
          .join("")
      : "";

    entregaEl.innerHTML = `
      <article class="feature feature--reading">
        <h3 class="feature-title">${entrega.lectura.titulo}</h3>
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

  document.querySelectorAll("[data-ig]").forEach((link) => {
    link.href = instagram.url;
  });
  document.querySelectorAll("[data-tiktok]").forEach((link) => {
    link.href = tiktok.url;
  });

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

/* ---------------- Copiar y abrir Instagram ---------------- */

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-copy]");
  if (!trigger) return;

  const message =
    NEW_YEAR_SERVICE.mensaje ??
    `¡Hola Karu! 🌙 Me interesa el «${NEW_YEAR_SERVICE.nombre}» (${priceText()}). ¿Me contás cómo reservo mi cupo? ¡Gracias! ✨`;

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

render();
