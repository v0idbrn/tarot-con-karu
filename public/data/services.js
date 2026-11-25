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
  etiqueta: "Lanzamiento Limitado · Año Nuevo",
  nombre:
    "Pack Arcano del Año & Vela Intencionada (Lanzamiento Limitado)",
  // Título corto que se muestra en el banner de la landing.
  nombreCorto: "Pack Arcano del Año & Vela Intencionada",
  // Página propia con todo el detalle del pack.
  pageUrl: "./arcano-del-ano.html",

  // Precio en ARS. Usá un número (por ej. 15000) o null mientras esté a confirmar.
  precio: 15000,
  precioTexto: "Precio a confirmar",
  precioNota: "Velas intencionadas adicionales: $3.000 c/u",

  descripcion:
    "Una propuesta integral y de cupos limitados diseñada para que conozcas la energía que te va a acompañar durante todo este nuevo ciclo y puedas potenciar tus propios deseos e intenciones.",

  // Textos del banner compacto de la landing.
  bannerTexto:
    "Una propuesta integral y de cupos limitados para conocer la energía que va a acompañar tu nuevo ciclo y potenciar tus propios deseos e intenciones.",
  bannerCta: "Hacé clic para ver todo lo que incluye, modalidades y sorteo",

  incluyeTitulo: "¿Qué incluye este pack?",
  incluye: [
    {
      titulo: "Tu Arcano del Año (Numerología y Tarot)",
      texto:
        "A partir de tu fecha de nacimiento calculamos cuál es el Arcano que rige tu año personal. Esta lectura no define tu destino ni sentencia si vas a tener un «buen» o «mal» año; su función es servirte de guía para comprender cuál es la energía principal que va a fluir a tu alrededor, qué aprendizajes trae esta etapa y cómo podés aprovecharla a tu favor.",
    },
    {
      titulo: "Consejo del Tarot",
      texto:
        "Una lectura puntual para orientar tus decisiones en este nuevo comienzo. No se realiza porque tu Arcano sea negativo, sino como una herramienta práctica para que sepas cómo moverte, qué priorizar y cómo convivir en armonía con la energía que te rodea.",
    },
    {
      titulo: "Mensaje del Oráculo de las Hadas",
      texto:
        "Un mensaje sutil, cercano y motivador pensado especialmente para tu momento actual. Funciona como un impulso de ánimo y claridad para acompañar tu presente desde una energía dulce y positiva.",
    },
    {
      titulo: "1 Vela Intencionada (100% a tu elección)",
      texto:
        "Una vela alta preparada y trabajada artesanalmente. Importante: esta vela no se basa únicamente en tu Arcano del Año, sino en lo que vos sientas que más necesitás trabajar o atraer en este momento (amor, abundancia o protección, entre otras opciones disponibles). Si querés potenciar más de un área, podés sumar velitas intencionadas extra por $3.000 cada una.",
    },
  ],

  entrega: {
    titulo: "¿Cómo se entrega? (Disponible para Salta y todo el país)",
    lectura: {
      titulo: "Tu lectura completa",
      texto:
        "Se entrega en una imagen personalizada, diseñada de forma clara y estética para que la guardes en tu celular y puedas volver a leerla cada vez que necesites recordar tu guía del año.",
    },
    velaIntro: "Tu vela intencionada: podés elegir la modalidad que te quede más cómoda.",
    velaTitulo: "Tu vela intencionada",
    modalidades: [
      {
        titulo: "Encendido y velación en mi altar (incluido en el valor)",
        texto:
          "Si no podés prenderla o preferís que lo haga yo, preparo, intenciono y velo tu vela en mi espacio. Te envío fotos, videos y una breve reseña de cómo se trabajó tu pedido.",
      },
      {
        titulo: "Entrega física",
        texto:
          "Te llevás tu vela lista con su bolsita e instructivo de encendido (retiro sin cargo en Salta capital o envío por correo a todo el país a cargo del cliente, sujeto a cobertura postal).",
      },
    ],
  },

  condiciones: [
    "Cupos limitados para este lanzamiento",
    "Retiro sin cargo en Salta capital",
    "Envío a todo el país a cargo del cliente, sujeto a cobertura postal",
  ],

  sorteo: {
    titulo: "Sorteo Especial de Fin de Año",
    texto:
      "Con motivo de este lanzamiento limitado, voy a estar realizando un sorteo especial de fin de año exclusivo para mis seguidores de Instagram y TikTok. Para participar y poder recibir el premio, es requisito obligatorio seguirme sí o sí en Instagram y en TikTok; en caso de que la persona ganadora no cumpla con este requisito, no se realizará la entrega ni el encendido de la vela y se volverá a sortear.",
  },

  mensaje:
    "¡Hola Karu! 🌙 Me interesa el «Pack Arcano del Año & Vela Intencionada (Lanzamiento Limitado)» ($15.000). ¿Me contás cómo reservo mi cupo? ¡Gracias! ✨",
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
