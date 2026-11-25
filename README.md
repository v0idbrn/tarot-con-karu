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
│   ├── index.html           # Secciones: inicio, banner año nuevo, tarot, rituales, orientación, reserva
│   ├── arcano-del-ano.html  # Página propia del Pack Arcano del Año
│   ├── lecturas.html        # Página dedicada de Lecturas de tarot
│   ├── rituales.html        # Página dedicada de Trabajos de brujería ritual
│   ├── orientacion.html     # Página dedicada de la Consulta de Orientación
│   ├── styles.css           # Paleta, tipografía y responsive
│   ├── app.js               # Render de la landing, pestañas, filtros, copiado y toast
│   ├── arcano.js            # Render de la página del pack
│   ├── lecturas.js          # Render de tiradas, filtros y sesiones de /lecturas
│   ├── rituales.js          # Render del paso previo y los rituales de /rituales
│   ├── orientacion.js       # Render del detalle, pasos y aclaración de /orientacion
│   ├── section-page.js      # Tarjetas, copiado y toast compartidos por las 3 páginas
│   ├── clipboard.js         # Copiado al portapapeles compartido
│   ├── robots.txt           # Directivas para buscadores
│   ├── sitemap.xml          # URLs públicas del sitio
│   ├── assets/
│   │   ├── arcano-banner.webp      # Banner del pack (también `og:image` del sitio)
│   │   ├── banner-tarot.webp       # Banner de Lecturas (landing + cabecera de /lecturas)
│   │   ├── banner-rituales.webp    # Banner de Rituales (landing + cabecera de /rituales)
│   │   └── banner-orientacion.webp # Banner de Orientación (landing + cabecera de /orientacion)
│   └── data/
│       └── services.js      # ✏️ Todo el contenido editable
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
| `SECTION_PAGES` | Encabezado, banner y textos de `lecturas`, `rituales` y `orientacion` |
| `instagram` / `tiktok` | Enlaces y handle usados en los mensajes y el footer |

## Páginas dedicadas

Además de la landing (`index.html`) y del pack (`arcano-del-ano.html`), el sitio tiene tres páginas propias que se abren desde los banners de la landing y desde el footer:

| Página | HTML | JS | Contenido |
| --- | --- | --- | --- |
| Lecturas de tarot | `lecturas.html` | `lecturas.js` | Tiradas con filtros por categoría + sesiones por tiempo con pestañas |
| Trabajos de brujería ritual | `rituales.html` | `rituales.js` | Aviso y tarjeta del paso previo obligatorio + los 5 rituales |
| Consulta de Orientación | `orientacion.html` | `orientacion.js` | Detalle, precio, 3 pasos y aclaración |

Cada página usa el banner de su sección como cabecera (ver más abajo), tiene navegación de regreso a `./index.html` y renderiza todas sus tarjetas y botones «Copiar mensaje y abrir IG» con el módulo compartido **`public/section-page.js`** (`formatPrice`, `setText`, `showToast`, `serviceCard`, `buildMessage`, `registerItems` e `initSectionPage`). La landing no usa ese módulo: conserva su lógica en `app.js`.

### Encabezado y banners de sección: `SECTION_PAGES`

En `public/data/services.js`, cada página dedicada toma su cabecera de `SECTION_PAGES`:

```js
export const SECTION_PAGES = {
  lecturas: {
    pageUrl: "./lecturas.html",              // ruta pública de la página
    banner: "./assets/banner-tarot.webp",    // imagen de cabecera (y del banner en la landing)
    bannerAlt: "Texto alternativo de la imagen",
    etiqueta: "Lecturas de tarot",          // eyebrow sobre el título
    titulo: "Lecturas de tarot",            // <title> y H1 de la página
    lead: "Bajada: para qué sirve la sección y qué puede contratar.",
  },
  rituales: { /* misma forma */ },
  orientacion: { /* misma forma */ },
};
```

| Campo | Qué hace |
| --- | --- |
| `pageUrl` | Ruta de la página dedicada, usada por los banners y el footer de la landing. |
| `banner` | Imagen de la cabecera; el mismo archivo se muestra en el banner de la landing. Medidas recomendadas: ~1600 px de ancho en WebP. |
| `bannerAlt` | Texto alternativo de la imagen (accesibilidad y SEO). |
| `etiqueta` | Línea pequeña sobre el título de la página. |
| `titulo` | Título visible y del documento en la página dedicada. |
| `lead` | Párrafo introductorio bajo el título. |

Para cambiar un banner, reemplazá el `.webp` en `public/assets/` y actualizá la ruta en `SECTION_PAGES` (la landing y la página lo toman solas). Las cinco páginas (`/`, `/arcano-del-ano`, `/lecturas`, `/rituales`, `/orientacion`) incluyen metadatos Open Graph con `og:image = /assets/arcano-banner.webp` y `twitter:card=summary_large_image`; `public/sitemap.xml` y `public/robots.txt` listan esas mismas rutas.

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

Todos los rituales muestran el aviso de que primero hay que realizar la tirada **"¿Necesito una limpia?" ($5.000)**. Si cambiás ese texto, editá `RITUAL_PREVIOUS_STEP`. La página `rituales.html` además muestra esa tirada como tarjeta destacada, tomándola de `TIRADA_SERVICES` por su `id: "necesito-una-limpia"`.

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
| `mensaje` | Mensaje prearmado para copiar y enviar por IG. |

El pack tiene su **página dedicada** en `public/arcano-del-ano.html`, armada por `arcano.js` con los mismos datos. La landing solo muestra un banner cliqueable que lleva ahí.

### Editar Orientación

`ORIENTATION_SERVICE` alimenta tanto `#orientacion` de la landing como la página `orientacion.html`. Además del `nombre`, `precio`, `precioNota`, `descripcion` y `mensaje`, la página dedicada usa:

| Campo | Qué hace |
| --- | --- |
| `duracion` | Aclaración bajo la descripción (ej. «Charla de asesoramiento de hasta 15 minutos»). |
| `pasos` | Array de `{ titulo, texto }` con los pasos del proceso. |
| `aclaracion` | Texto final que aclara qué no incluye la consulta. |

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
