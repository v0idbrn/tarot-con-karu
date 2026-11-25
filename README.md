# Tarot con Karu

Sitio estático de **Tarot con Karu** (`@tarot.con.karu`): tiradas de tarot, sesiones por tiempo, rituales, Consulta de Orientación y el Pack Arcano del Año & Vela Intencionada. Se despliega en **Cloudflare Workers (Static Assets)** sirviendo desde `./public`.

- HTML, CSS y JavaScript vanilla, sin build step.
- Catálogo editable desde `public/data/services.js`.
- Botón "Copiar mensaje y abrir IG" con aviso tipo toast y apertura de Instagram.

## Estructura

```
.
├── wrangler.jsonc          # Workers + assets desde ./public
├── public/
│   ├── index.html          # Secciones: inicio, banner año nuevo, tarot, rituales, orientación, reserva
│   ├── arcano-del-ano.html # Página propia del Pack Arcano del Año
│   ├── styles.css          # Paleta, tipografía y responsive
│   ├── app.js              # Render, pestañas, filtros, copiado y toast
│   ├── arcano.js           # Render de la página del pack
│   ├── clipboard.js        # Copiado al portapapeles compartido
│   ├── assets/
│   │   └── arcano-pack.svg # Ilustración del banner y de la página del pack
│   └── data/
│       └── services.js     # ✏️ Todo el contenido editable
└── README.md
```

## Correr en local

```bash
npx wrangler dev
```

Abrí la URL que imprime Wrangler (por defecto `http://localhost:8787`). Cualquier servidor estático apuntando a `public/` también funciona.

## Dónde editar cada sección

Todo el contenido vive en `public/data/services.js`:

| Export | Sección de la página |
| --- | --- |
| `TIRADA_SERVICES` | `#tarot` → pestaña **Tiradas individuales** (con filtros por `categoria`) |
| `SESSION_SERVICES_INTRO` + `SESSION_SERVICES` | `#tarot` → pestaña **Sesiones por tiempo** |
| `RITUAL_PREVIOUS_STEP` | `#rituales` → bloque **Importante — Paso previo obligatorio** |
| `RITUAL_SERVICES` | `#rituales` → tarjetas de rituales |
| `ORIENTATION_SERVICE` | `#orientacion` → Consulta de Orientación |
| `NEW_YEAR_SERVICE` | `#ano-nuevo` → banner cliqueable de la landing + página `arcano-del-ano.html` |
| `instagram` / `tiktok` | Enlaces y handle usados en los mensajes y el footer |

### Agregar una tirada

Sumá un objeto al final del array `TIRADA_SERVICES`:

```js
{
  id: "tirada-nueva",        // único, sin espacios
  nombre: "Tirada nueva",
  categoria: "Amor",         // si es nueva, el filtro aparece solo
  precio: 7000,              // ARS, sin puntos
  descripcion: "Texto completo de la tirada...",
  requisito: "Solo si aplica", // opcional
}
```

### Agregar un ritual

Sumá un objeto a `RITUAL_SERVICES`:

```js
{
  id: "ritual-nuevo",
  nombre: "Ritual nuevo",
  precio: 22000,
  descripcion: "En qué consiste y qué incluye...",
}
```

Todos los rituales muestran el aviso de que primero hay que realizar la tirada **"¿Necesito una limpia?" ($5.000)**. Si cambiás ese texto, editá `RITUAL_PREVIOUS_STEP`.

### Agregar una sesión por tiempo

Sumá un objeto a `SESSION_SERVICES`:

```js
{
  id: "sesion-120",
  nombre: "Sesión de 2 horas",
  duracion: "120 min",
  precio: 26000,
  descripcion: "En qué consiste la sesión...",
}
```

### Editar Año Nuevo

En `NEW_YEAR_SERVICE`:

| Campo | Qué hace |
| --- | --- |
| `nombreCorto` | Título que se muestra en el banner de la landing (sin «Lanzamiento Limitado»). |
| `pageUrl` | Página propia del pack (`./arcano-del-ano.html`). |
| `bannerTexto` / `bannerCta` | Párrafo y texto del botón del banner de la landing. |
| `precio` | Número en ARS (ej. `15000`) o `null` mientras esté a confirmar. |
| `precioTexto` | Texto que se muestra cuando `precio` es `null`. |
| `precioNota` | Aclaración bajo el precio (ej. velas adicionales). |
| `descripcion` | Párrafo principal de la página del pack. |
| `incluye` / `incluyeTitulo` | Array de `{ titulo, texto }` y título del bloque «¿Qué incluye?». |
| `entrega` | `{ titulo, lectura: { titulo, texto }, velaIntro, modalidades: [{ titulo, texto }] }`. |
| `condiciones` | Array del panel lateral. |
| `sorteo` | `{ titulo, texto }` del bloque del sorteo (si se elimina, la sección se oculta sola). |
| `mensaje` | Mensaje prearmado para copiar y enviar por IG. |

El pack tiene su **página dedicada** en `public/arcano-del-ano.html`, armada por `arcano.js` con los mismos datos. La landing solo muestra un banner cliqueable que lleva ahí.

### Precios y mensajes

- Los precios se formatean automáticamente como `$10.000` (ARS).
- El mensaje de cada botón se arma solo según el tipo de servicio. Si querés uno propio, agregá `mensaje: "¡Hola Karu! ..."` al objeto.

## Subir a GitHub (`v0idbrn`)

```bash
git init -b main
git add .
git commit -m "Tarot con Karu: lecturas, sesiones y rituales"
git remote add origin https://github.com/v0idbrn/tarot-con-karu.git
git push -u origin main
```

> Si el repositorio tiene otro nombre, cambiá `tarot-con-karu` en la URL del `remote`.

## Desplegar en Cloudflare Workers

`wrangler.jsonc` ya está configurado con `assets.directory = "./public"`.

```bash
npx wrangler login     # solo la primera vez
npx wrangler deploy
```

Wrangler publica el proyecto como `tarot-con-karu` y devuelve una URL del tipo `https://tarot-con-karu.<tu-subdominio>.workers.dev`.

Para republicar después de editar el catálogo:

```bash
npx wrangler deploy
```

## Redes

- Instagram: <https://www.instagram.com/tarot.con.karu/>
- TikTok: <https://www.tiktok.com/@tarot.con.karu>
