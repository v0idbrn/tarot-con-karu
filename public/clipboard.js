/* ============================================================
   Copiado al portapapeles compartido por la landing y la página
   del Pack Arcano.
   ============================================================ */

/*
 * La copia es sincrónica y ocurre dentro del gesto del clic: si se abre
 * Instagram antes de copiar, la pestaña nueva se queda con el foco y la
 * escritura en el portapapeles falla.
 */
export function copyText(text) {
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
export function copyTextAsync(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(
      () => true,
      () => false
    );
  }
  return Promise.resolve(false);
}
