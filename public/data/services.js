/* ============================================================
   Tarot con Karu — catálogo y contenido editable
   ------------------------------------------------------------
   Todos los textos, precios y servicios del sitio viven acá.

   · Agregar una tirada  -> sumar un objeto a TIRADA_SERVICES.
   · Agregar una sesión  -> sumar un objeto a SESSION_SERVICES.
   · Agregar un ritual   -> sumar un objeto a RITUAL_SERVICES.
   · Los precios van en pesos argentinos, sin puntos ni símbolos
     (10.000 se escribe 10000).
   · Cada objeto necesita un `id` único, sin espacios.
   · `categoria` genera automáticamente los filtros del catálogo.
   · `requisito` es opcional: si no aplica, se omite.
   ============================================================ */

export const instagram = {
  handle: "@tarot.con.karu",
  url: "https://www.instagram.com/tarot.con.karu/",
};

export const tiktok = {
  handle: "@tarot.con.karu",
  url: "https://www.tiktok.com/@tarot.con.karu",
};

/* ------------------------------------------------------------
   ESPECIAL AÑO NUEVO
   Actualizá precio, descripción y condiciones cuando se abra
   la edición del año.
   ------------------------------------------------------------ */

export const NEW_YEAR_SERVICE = {
  id: "ano-nuevo",
  etiqueta: "Edición especial",
  nombre: "Lectura de Año Nuevo",

  // Precio en ARS. Usá un número (por ej. 15000) o null mientras esté a confirmar.
  precio: null,
  precioTexto: "Precio a confirmar",

  descripcion:
    "Una tirada pensada para abrir el año con claridad: qué energías te acompañan, qué ciclos se cierran, qué conviene soltar y qué caminos se abren en el amor, el trabajo y tus vínculos. Se arma como una lectura completa y personalizada, con espacio para tus preguntas.",

  incluye: [
    "Panorama general del año que empieza",
    "Amor, vínculos y vida social",
    "Trabajo, estudio y economía",
    "Aprendizajes, bloqueos y consejo de las cartas",
  ],

  condiciones: [
    "Turnos limitados para esta edición",
    "Se coordina fecha y forma de pago por Instagram",
    "La lectura se entrega de forma privada, por audio o texto",
  ],

  mensaje:
    "¡Hola Karu! 🌙 Quiero consultar por la lectura especial de Año Nuevo. ¿Me contás cómo funciona, el precio y las condiciones? ¡Gracias! ✨",
};

/* ------------------------------------------------------------
   TIRADAS INDIVIDUALES
   ------------------------------------------------------------ */

export const TIRADA_SERVICES = [
  {
    id: "relaciones",
    nombre: "Relaciones",
    categoria: "Amor",
    precio: 10000,
    descripcion:
      "Esta tirada permite explorar las intenciones de ambas personas dentro de una relación, sus sentimientos, aquello que están dispuestos a aportar al vínculo y cómo perciben su posible evolución a futuro.",
    requisito:
      "En esta tirada ya debe existir un vínculo creado, es decir, una relación amorosa o amistosa.",
  },
  {
    id: "vinculo",
    nombre: "Vínculo",
    categoria: "Amor",
    precio: 5000,
    descripcion:
      "Esta tirada permite explorar los sentimientos, la percepción e intenciones de una persona hacia el consultante.",
  },
  {
    id: "general-simple",
    nombre: "General Simple",
    categoria: "General",
    precio: 10000,
    descripcion:
      "Esta tirada permite explorar distintos aspectos de la vida del consultante, como su momento actual, el amor, el trabajo, la economía, la salud, las amistades y la familia.",
  },
  {
    id: "evolucion-amor",
    nombre: "Tu evolución en el amor",
    categoria: "Amor",
    precio: 18000,
    descripcion:
      "Esta tirada permite explorar la evolución sentimental del consultante, identificando patrones e inseguridades de relaciones pasadas, su estado emocional actual, los aspectos que necesita trabajar y su posible evolución amorosa futura.",
  },
  {
    id: "el-amor",
    nombre: "El amor",
    categoria: "Amor",
    precio: 6000,
    descripcion:
      "Esta tirada permite explorar las posibilidades de un romance a corto plazo, las características de una posible pareja y los aspectos personales que el o la consultante puedan trabajar para favorecer una relación amorosa y sana.",
  },
  {
    id: "brujeria",
    nombre: "Brujería",
    categoria: "Espiritual",
    precio: 10000,
    descripcion:
      "Esta tirada permite explorar el tipo de trabajo espiritual del consultante, cómo solucionarlo y cómo afrontarlo.",
    requisito:
      "La lectura es interpretativa; no se puede saber solo con las cartas el nombre de la persona. Se puede preguntar con los nombres por un sí o un no.",
  },
  {
    id: "mi-trabajo",
    nombre: "Mi trabajo",
    categoria: "Trabajo",
    precio: 6000,
    descripcion:
      "Esta lectura permite explorar la estabilidad y el progreso en el trabajo que tiene actualmente el consultante.",
    requisito: "Para esta tirada, el consultante ya debe tener un trabajo.",
  },
  {
    id: "necesito-una-limpia",
    nombre: "¿Necesito una limpia?",
    categoria: "Espiritual",
    precio: 5000,
    descripcion:
      "La tirada permite explorar los momentos del consultante, saber el motivo de sus dificultades y si eso necesita algún tipo de ritual.",
  },
  {
    id: "mi-ex",
    nombre: "Mi ex",
    categoria: "Amor",
    precio: 6000,
    descripcion:
      "La tirada permite explorar los sentimientos, el vínculo y una posible reconciliación con esta expareja.",
  },
];

/* ------------------------------------------------------------
   SESIONES POR TIEMPO
   ------------------------------------------------------------ */

export const SESSION_SERVICES_INTRO =
  "¿No sabés qué tirada elegir o querés combinar varias consultas en un mismo encuentro? Podés reservar una sesión por tiempo. Durante el bloque elegido y abonado, podemos realizar cualquiera de las tiradas disponibles en el catálogo (o combinar varias), siempre respetando la duración exacta de la sesión contratada.";

export const SESSION_SERVICES = [
  {
    id: "sesion-30",
    nombre: "Sesión de 30 minutos",
    duracion: "30 min",
    precio: 7000,
    descripcion:
      "Ideal para consultas puntuales o para realizar una o dos tiradas breves del catálogo dentro de los 30 minutos abonados.",
  },
  {
    id: "sesion-45",
    nombre: "Sesión de 45 minutos",
    duracion: "45 min",
    precio: 12000,
    descripcion:
      "Espacio intermedio para profundizar en un tema o combinar distintas tiradas del catálogo, respetando siempre el tiempo establecido y abonado.",
  },
  {
    id: "sesion-60",
    nombre: "Sesión de 1 hora",
    duracion: "60 min",
    precio: 16000,
    descripcion:
      "Lectura completa donde podemos explorar distintas áreas y realizar todas las tiradas del catálogo que desees dentro de los 60 minutos abonados.",
  },
  {
    id: "sesion-90",
    nombre: "Sesión de 1 hora y media",
    duracion: "90 min",
    precio: 20000,
    descripcion:
      "Sesión extendida para un abordaje profundo e integral. Podés elegir libremente cualquier tirada de la página y despejar todas tus dudas dentro de los 90 minutos abonados.",
  },
];

/* ------------------------------------------------------------
   BRUJERÍA Y RITUALES
   ------------------------------------------------------------ */

export const RITUAL_PREVIOUS_STEP =
  'Para solicitar cualquiera de los siguientes rituales es indispensable realizar primero la tirada "¿Necesito una limpia?" ($5.000). Esta lectura previa permite evaluar tu situación real para saber si efectivamente necesitás un trabajo energético, si solo estás atravesando un mal momento y si está dentro de mis posibilidades ayudarte. De esta manera, te asegurás de no gastar tu dinero en un ritual que no te corresponda o que no vaya a funcionarte.';

export const RITUAL_SERVICES = [
  {
    id: "limpieza-energetica",
    nombre: "Limpieza Energética",
    precio: 18000,
    descripcion:
      "Ritual enfocado en armonizar tu campo energético y liberar cargas densas acumuladas por estrés, agotamiento emocional, bloqueos o envidias. Es una limpieza restauradora para recuperar el equilibrio y el bienestar personal (trabajo de armonización; no incluye tumbatrabajos ni cortes de magia negra).",
  },
  {
    id: "autoendulzamiento",
    nombre: "Autoendulzamiento",
    precio: 18000,
    descripcion:
      "Ritual de amor propio diseñado para elevar la autoestima, suavizar emociones difíciles, atraer bienestar personal y reconectar con tu propia energía desde la calma y la dulzura.",
  },
  {
    id: "endulzamiento-pareja",
    nombre: "Endulzamiento de Pareja",
    precio: 25000,
    descripcion:
      "Trabajo energético destinado a armonizar un vínculo amoroso ya existente, suavizar asperezas y fomentar el diálogo, la ternura y la conexión afectiva entre ambas personas (no fuerza voluntades ni funciona como amarre).",
  },
  {
    id: "corte-de-lazos",
    nombre: "Corte de Lazos",
    precio: 25000,
    descripcion:
      "Ritual para cerrar ciclos y liberar ataduras energéticas con exparejas, personas o situaciones del pasado que ya cumplieron su etapa, permitiéndote avanzar con mayor liviandad y paz mental.",
  },
  {
    id: "abrecaminos",
    nombre: "Abrecaminos",
    precio: 30000,
    descripcion:
      "Ritual orientado a destrabar situaciones estancadas y favorecer la llegada de nuevas oportunidades en áreas como el trabajo, los proyectos personales, la economía o el crecimiento general.",
  },
];

/* ------------------------------------------------------------
   CONSULTA DE ORIENTACIÓN
   ------------------------------------------------------------ */

export const ORIENTATION_SERVICE = {
  id: "orientacion",
  nombre: "Consulta de Orientación",
  precio: 3000,
  precioNota: "100% bonificables al contratar un servicio",
  descripcion:
    "¿No sabés si necesitás una lectura de tarot o un ritual? Reservá este espacio para contarme por mensaje o audio (a través de Instagram o TikTok) qué te está pasando. Analizamos brevemente tu situación para guiarte y recomendarte la tirada o el trabajo espiritual más adecuado para vos. Si luego decidís contratar una lectura o un ritual, los $3.000 de esta consulta se te descuentan del total del servicio.",
};
