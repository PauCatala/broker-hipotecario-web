// =====================================================================
// TODO EL CONTENIDO DE LA WEB ESTÁ AQUÍ
// ---------------------------------------------------------------------
// Para corregir un texto, una tarifa o un umbral, se cambia en este
// archivo y cambia en todas las páginas. Lo que va entre [corchetes]
// es un dato pendiente (marca, registro, póliza…): se ve resaltado en
// la web hasta que se rellene.
// =====================================================================

// ---------- Marca y datos legales (pendientes) ----------
export const MARCA = {
  nombre: '[Nombre]',
  subtitulo: 'Intermediación hipotecaria',
  empresa: '[Razón social, S.L.]',
  cif: '[CIF]',
  domicilio: '[Domicilio], Valencia',
  registro: '[Nº de registro del Banco de España]',
  enlaceRegistro: 'https://www.bde.es',
  polizaRC: '[Aseguradora y nº de póliza de RC]',
  email: '[email]',
  telefono: '[teléfono]',
  whatsapp: '[WhatsApp]',
  respuestaHoras: 48,
  intentosContacto: 3,
};

// ---------- Quiénes somos (dos personas, un responsable por caso) ----------
export const EQUIPO = [
  {
    nombre: 'Gaizka Cebrián',
    rol: 'Intermediario de crédito inmobiliario',
    texto: 'Doble grado en Telecomunicación y ADE (UPV). Formación reconocida por el Banco de España como Asesor Financiero en Crédito Hipotecario. Lleva la relación con los bancos y la preparación de cada expediente.',
    iniciales: 'GC',
  },
  {
    nombre: 'Pau Catalá',
    rol: '[Rol: datos, procesos y tecnología]',
    texto: '[Formación y papel en el proyecto. Por ejemplo: diseña los procesos, la plataforma y el seguimiento de cada operación para que no tengas que preguntar en qué punto está tu caso.]',
    iniciales: 'PC',
  },
];

// ---------- Los 7 perfiles (servicios) ----------
// color: variable de tokens.css · tarifa: clave de TARIFAS
export const PERFILES = [
  {
    id: 'primera-vivienda', corto: 'Aval ICO', nombre: 'Primera vivienda con aval ICO', color: 'ico', tarifa: 'ico',
    gancho: 'Tienes ingresos para la cuota, pero no ahorro para la entrada.',
    para: 'Menores de 36 años (o familias con hijos menores) que compran su primera vivienda.',
    titulo: 'El aval cubre la entrada. El banco sigue estudiando tus ingresos.',
    voz: '«Tengo 30 años, pocos ahorros.»',
    porQue: [
      'El aval ICO cubre hasta el 20 % del precio, pero no obliga al banco a concederte la hipoteca.',
      'Desde el 19/06/2026 el límite de ingresos depende de la provincia. [Verificar cifras exactas en ico.es antes de publicar].',
      'No todas las entidades trabajan igual la línea ICO ni con los mismos plazos.',
    ],
    como: [
      'Comprobamos contigo los requisitos del aval en tu provincia.',
      'Preparamos el expediente completo para que el banco estudie tus ingresos con todo delante.',
      'Lo presentamos solo a entidades que trabajan la línea ICO.',
    ],
    necesitas: ['DNI/NIE', 'Últimas nóminas o declaración de la renta', 'Vida laboral', 'Datos de la vivienda (si ya la tienes)'],
  },
  {
    id: 'autonomos', corto: 'Autónomos', nombre: 'Autónomos', color: 'autonomo', tarifa: 'general',
    gancho: 'Facturas más de lo que el banco ve en tu declaración.',
    para: 'Autónomos y profesionales, también con menos de 2 años de actividad.',
    titulo: 'El banco no valora lo que facturas, sino lo que declaras y desde cuándo.',
    voz: '«Los 130 y 303 que he enviado se los han pasado por el forro.»',
    porQue: [
      'El banco parte de la base imponible declarada y de la antigüedad de la actividad.',
      'Cada entidad aplica criterios distintos a los autónomos: el mismo expediente puede recibir respuestas diferentes.',
    ],
    como: [
      'Hacemos una lectura bancaria de tus números: cómo verá tu caso cada entidad.',
      'Ordenamos la documentación fiscal para que se entienda a la primera.',
      'Elegimos a qué entidades presentarlo según su criterio con autónomos.',
    ],
    necesitas: ['Dos últimas declaraciones de la renta', 'Modelos 130/131 y 303 del año', 'Vida laboral', 'Extractos bancarios de 6 meses'],
  },
  {
    id: 'extranjeros', corto: 'Extranjeros', nombre: 'Extranjeros residentes y no residentes', color: 'extranjero', tarifa: 'general',
    gancho: 'Compras en España y necesitas tus números reales antes de firmar las arras.',
    para: 'Residentes extranjeros y no residentes. Atención en inglés.',
    titulo: 'Know your real numbers before you sign the deposit contract.',
    voz: '«Realistically you would need approx 45% of the mortgage yourself.»',
    porQue: [
      'A no residentes los bancos suelen financiar un porcentaje menor del precio, y hay que sumar impuestos y gastos.',
      'No todas las entidades prestan a no residentes.',
      'El NIE y la cuenta en España pueden chocar con los plazos de las arras.',
    ],
    como: [
      'Pre-check en inglés antes de firmar las arras: cuánto necesitas aportar de verdad.',
      'Calendario de NIE, cuenta y documentación.',
      'Presentación solo a entidades que trabajan con tu perfil.',
    ],
    necesitas: ['Pasaporte y NIE (o solicitud)', 'Justificantes de ingresos de tu país', 'Informe de crédito de tu país si lo hay', 'Extractos bancarios'],
  },
  {
    id: 'mayores-de-50', corto: 'Mayores de 50', nombre: 'Mayores de 50', color: 'mayor', tarifa: 'general',
    gancho: 'Te ofrecen un plazo tan corto que la cuota no sale.',
    para: 'Compradores a partir de 50 años, también para cambiar de vivienda.',
    titulo: 'Lo que te limita es el plazo, no la edad.',
    voz: '«Mi banco solo me la da a 20 años.»',
    porQue: [
      'La mayoría de bancos fija una edad máxima al terminar de pagar (habitualmente en torno a 75 años; algunos más). [Verificar fuente BdE].',
      'Un plazo más corto sube la cuota y empeora tu ratio de endeudamiento.',
    ],
    como: [
      'Calculamos el plazo y la cuota según la edad máxima de cada entidad.',
      'Revisamos el seguro de vida y su coste real.',
      'Si vendes tu vivienda actual, estudiamos el orden de las operaciones.',
    ],
    necesitas: ['DNI', 'Nóminas o pensión', 'Declaración de la renta', 'Datos de tu hipoteca actual si la tienes'],
  },
  {
    id: 'mejorar-hipoteca', corto: 'Mejorar', nombre: 'Mejorar mi hipoteca', color: 'mejorar', tarifa: 'mejorar',
    gancho: 'Tu cuota ha subido o firmaste una fija cara.',
    para: 'Quien ya paga una hipoteca variable o una fija firmada con tipos altos.',
    titulo: 'Cambiar solo compensa si el ahorro neto es real.',
    voz: '«No sé si merece la pena hacer la subrogación o no.»',
    porQue: [
      'El tipo de interés por sí solo no dice si compensa: hay costes de cambio y vinculaciones.',
      'Tu banco actual puede igualar la oferta.',
    ],
    como: [
      'Calculamos el ahorro neto tras costes y productos vinculados.',
      'Si no compensa, te lo decimos.',
      'Si tu banco iguala, también ganas: [decisión pendiente sobre el honorario en ese caso].',
    ],
    necesitas: ['Escritura de tu hipoteca', 'Último recibo', 'Capital pendiente', 'Productos vinculados que tienes'],
  },
  {
    id: 'revisar-oferta', corto: 'Revisar oferta', nombre: 'Ya tengo una oferta (FEIN)', color: 'oferta', tarifa: 'fein',
    gancho: 'Tienes la FEIN y la firma está cerca.',
    para: 'Quien ya tiene la Ficha Europea de Información Normalizada y quiere una segunda lectura.',
    titulo: 'Lo que manda es tu FEIN, no lo que te dijeron.',
    voz: '«La FEIN no se ajusta a todo lo negociado.»',
    porQue: [
      'La FEIN llega por ley al menos 10 días naturales antes de la firma.',
      'Es habitual que no coincida en algún punto con lo hablado: bonificaciones, seguros, comisiones.',
    ],
    como: [
      'Leemos tu FEIN línea a línea contra lo que negociaste.',
      'Te decimos qué es obligatorio, qué es opcional y cuánto cuesta cada bonificación.',
      'Llegas al acta notarial sabiendo qué firmas.',
    ],
    necesitas: ['FEIN y FiAE', 'Lo que te prometieron por escrito (email, simulación)', 'Fecha de notaría'],
  },
  {
    id: 'denegada', corto: 'Denegada', nombre: 'Me la han denegado', color: 'denegada', tarifa: 'general',
    gancho: 'Tienes ahorros y sueldo, y aun así te han dicho que no.',
    para: 'Quien ha recibido un «no» y quiere entender el motivo.',
    titulo: 'Un «no» de un banco no siempre es un «no» de todos.',
    voz: '«Según los simuladores, no me suponía ni el 30 %.»',
    porQue: [
      'El banco mira mucho más que un simulador: estabilidad, historial, ratio, tipo de contrato.',
      'Cada entidad tiene sus propios criterios de riesgo.',
    ],
    como: [
      'Diagnóstico del «no»: encaja / encaja si cambias esto / hoy no.',
      'Si hoy no es viable, te lo decimos y te damos un plan a 6–12 meses.',
      'Nunca prometemos una aprobación: la decisión es siempre del banco.',
    ],
    necesitas: ['Lo que te dijo el banco (si lo tienes por escrito)', 'Nóminas o renta', 'Vida laboral', 'Préstamos y deudas actuales'],
  },
];

// ---------- Tarifas ----------
export const TARIFAS = {
  general: { pct: 1.5, min: 2000, max: 4000, texto: '1,5 % del préstamo, mínimo 2.000 € y máximo 4.000 €' },
  ico:     { pct: 1.5, min: 2000, max: 3000, texto: '1,5 % del préstamo, mínimo 2.000 € y máximo 3.000 €' },
  mejorar: { pct: 0.75, min: 1000, max: 2500, texto: '0,75 % del capital pendiente, entre 1.000 € y 2.500 €', base: 'capital pendiente' },
  fein:    { fijo: 250, texto: '250 € cerrados, descontables si después intermediamos [pendiente de validación legal]' },
};

export function honorario(importe, clave = 'general') {
  const t = TARIFAS[clave];
  if (t.fijo) return { valor: t.fijo, limite: null };
  const bruto = importe * t.pct / 100;
  if (bruto < t.min) return { valor: t.min, limite: 'mínimo' };
  if (bruto > t.max) return { valor: t.max, limite: 'máximo' };
  return { valor: Math.round(bruto), limite: null };
}

// ---------- Promesas (reversión de riesgo) ----------
export const COMPROMISOS = [
  ['Si no firmas, no pagas', 'Salvo la tarifa cerrada de revisión de FEIN, que conoces antes.'],
  ['Sin ataduras', 'Solo cobramos si firmas con una oferta que te hayamos presentado nosotros.'],
  ['Si no es viable, te lo decimos', 'En lugar de hacerte perder semanas.'],
  ['Si tu caso es sencillo, también', 'Te diremos que quizá no nos necesitas.'],
  ['Un responsable de tu caso', 'Con nombre, de principio a fin.'],
  ['Máximo 3 intentos de contacto', 'Si no respondes, no insistimos más.'],
  ['Tus datos, solo donde digas', 'Solo los enviamos a los bancos que tú apruebes.'],
];

// ---------- Cómo trabajamos ----------
export const PASOS = [
  ['Estudio de viabilidad', 'Formulario y llamada de unos 20 minutos. Te decimos: viable, viable con cambios, u hoy no y qué cambiaría.'],
  ['Información por escrito y encargo', 'Antes de empezar recibes quiénes somos, nuestro registro, el honorario y lo que paga cada banco. El mismo día, tu lista de documentos.'],
  ['Preparación y envío', 'Ordenamos tu documentación, explicamos tu caso como lo lee un banco y lo presentamos solo donde encaja.'],
  ['Comparación en euros al año', 'Qué es obligatorio, qué es opcional y cuánto cuesta de verdad cada bonificación.'],
  ['FEIN, notaría y firma', 'Revisamos la FEIN contra lo negociado antes del acta notarial y te acompañamos hasta la firma.'],
];
export const PUNTOS = [
  ['Todavía buscando', 0, 'Empieza por el estudio: sabrás cuánto te pueden prestar antes de enamorarte de una casa.'],
  ['Ya tengo vivienda', 0, 'Es el mejor momento: el estudio te dice si tu caso encaja antes de comprometerte.'],
  ['Arras firmadas', 1, 'Hay fecha: cuanto antes revisemos tu caso, más margen hay.'],
  ['Ya tengo la FEIN', 4, 'Vamos directos a la revisión de tu oferta antes de notaría.'],
];

// ---------- Lo que el simulador no mira ----------
export const FACTORES = [
  ['Importe y plazo', 'Lo que pides y en cuántos años', true],
  ['Ingresos declarados', 'Lo que ve el simulador, sin matices', true],
  ['Estabilidad laboral', 'Tipo de contrato, antigüedad, actividad'],
  ['Ratio de endeudamiento', 'Todas tus deudas, no solo la hipoteca'],
  ['Edad al vencimiento', 'Fija el plazo máximo en cada entidad'],
  ['Ahorro aportado (LTV)', 'Qué % del valor financia el banco'],
  ['Historial y ficheros', 'CIRBE, impagos, préstamos activos'],
];

// ---------- Preguntas frecuentes / objeciones ----------
export const PREGUNTAS = [
  ['¿Por qué no voy yo al banco?', 'Si tu caso es sencillo, hazlo: te lo diremos. Si no lo es, cada banco lee tu caso de forma distinta y tú solo ves uno.'],
  ['¿Cuánto cuesta y cuándo pago?', 'Un 1,5 % del préstamo con mínimo y máximo. Se paga en notaría el día de la firma, solo si firmas.'],
  ['¿Por qué pagar si hay brókers gratis?', 'Los gratuitos cobran del banco. Para un perfil estándar pueden ir bien; nosotros trabajamos casos que se salen del patrón.'],
  ['¿Cómo sé que sois de fiar?', 'Registro comprobable en el Banco de España, seguro de responsabilidad civil, nombre y cara, y nada por adelantado.'],
  ['¿Me vais a freír a llamadas?', 'No. Máximo 3 intentos de contacto.'],
  ['¿Acabaré haciéndolo yo?', 'Lista de documentos el primer día, estado de cada banco por escrito y un único responsable de tu caso.'],
  ['¿Y si encuentro algo por mi cuenta?', 'Solo pagas si firmas una oferta que te hayamos presentado nosotros.'],
  ['¿Qué pasa con mis datos?', 'Se usan solo para tu operación y solo van a los bancos que tú apruebes.'],
  ['¿Cuánta experiencia tenéis?', 'Empezamos ahora, con formación reconocida y registro propio. Por eso te atendemos nosotros directamente.'],
  ['¿Me empujaréis al banco que más os pague?', 'Te decimos la comisión que paga cada banco antes de que elijas.'],
  ['¿Y si me la deniegan otra vez?', 'No pagas. Te explicamos el motivo y qué cambiar.'],
];

// ---------- Umbrales del estudio de viabilidad (revisar tras el curso) ----------
export const UMBRALES = {
  ahorroAntes: 0.10,       // ahorro < 10 % del valor → Antes
  ahorroRevisar: 0.30,     // 10–30 % → Revisar
  valorIngresos: 8,        // valor > 8 × ingresos netos anuales → Revisar
  arrasDias: 30,           // arras a menos de 30 días → Revisar
  edadIco: 36,
  autonomoMinAnios: 1,
  noResidenteAhorro: 0.40,
  edadPlazo: 65,
  mejorarMinAnios: 5,
  mejorarMinPendiente: 50000,
  feinDias: 10,
  denegadaBancos: 3,
};

// ---------- Asistente: base de conocimiento cerrada ----------
// Cada entrada: palabras clave → respuesta. Si nada encaja, ofrece hablar con una persona.
export const ASISTENTE = {
  saludo: 'Hola, soy el asistente automático de [Nombre]. Resuelvo dudas generales sobre cómo trabajamos. No valoro casos ni doy tipos ni cuotas: eso lo hace una persona del equipo.',
  sugerencias: ['¿Cuánto cuesta?', '¿Cómo funciona?', 'Me la han denegado', 'Tengo la FEIN', '¿Qué documentos necesito?', 'Hablar con una persona'],
  urgente: ['arras', 'notaría', 'notaria', 'firmo', 'mañana', 'urgente', 'esta semana', 'plazo'],
  persona: ['persona', 'humano', 'hablar', 'llamar', 'llamada', 'teléfono', 'whatsapp', 'gaizka', 'pau'],
  // Preguntas que piden una valoración del caso o cifras de producto: nunca las contesta el asistente
  prohibido: ['aprob', 'me la dais', 'me la daréis', 'me la van a dar', 'me la dan', 'tae', 'cuota', 'tipo de interés', 'qué interés', 'que interes', 'cuánto me prestan', 'cuanto me prestan'],
  respuestas: [
    [['cuesta', 'precio', 'honorario', 'cobr', 'pagar', 'pago'], 'Cobramos un 1,5 % del préstamo, con un mínimo de 2.000 € y un máximo de 4.000 €. Solo se paga en notaría si firmas con una oferta que te hayamos presentado. Tienes la calculadora en <a href="#/precio">Precio</a>.'],
    [['funciona', 'proceso', 'pasos', 'cómo trabaj', 'como trabaj'], 'Son 5 pasos: estudio de viabilidad, información por escrito, preparación y envío a bancos, comparación en euros al año, y FEIN y firma. Lo tienes en <a href="#/como-trabajamos">Cómo trabajamos</a>.'],
    [['denega', 'rechaz', 'dijeron que no', 'me han dicho que no'], 'Lo primero es entender el motivo. Hacemos un diagnóstico: encaja, encaja si cambias algo, u hoy no y qué hacer en 6–12 meses. No prometemos aprobaciones. Puedes empezar con el <a href="#/estudio/denegada">estudio de viabilidad</a>.'],
    [['fein', 'oferta', 'ficha europea'], 'Leemos tu FEIN línea a línea contra lo negociado: qué es obligatorio, qué es opcional y cuánto cuesta cada bonificación. ¿Tienes ya fecha de notaría?'],
    [['documento', 'papeles', 'necesito'], 'Depende de tu caso. Como base: DNI/NIE, nóminas o renta, vida laboral y extractos. Tras el estudio recibes tu lista exacta el mismo día.'],
    [['autónomo', 'autonomo', 'freelance'], 'Con autónomos el banco mira lo declarado y la antigüedad, y cada entidad aplica criterios distintos. Mira <a href="#/servicios/autonomos">Autónomos</a>.'],
    [['ico', 'aval', 'joven', 'primera vivienda'], 'El aval ICO cubre hasta el 20 % del precio, pero el banco sigue estudiando tus ingresos. Los límites dependen de tu provincia. Mira <a href="#/servicios/primera-vivienda">Primera vivienda</a>.'],
    [['english', 'extranjero', 'foreign', 'nie', 'no residente'], 'We work in English too. Non-residents usually get a lower financing percentage, so it pays to check your real numbers before signing the deposit. See <a href="#/servicios/extranjeros">Extranjeros</a>.'],
    [['edad', 'mayor', 'jubil', '50', '60'], 'Lo que suele limitar es el plazo: los bancos fijan una edad máxima al terminar de pagar, distinta en cada entidad. Mira <a href="#/servicios/mayores-de-50">Mayores de 50</a>.'],
    [['mejorar', 'subrogación', 'subrogacion', 'cambiar de banco', 'variable'], 'Cambiar solo compensa si el ahorro neto supera costes y vinculaciones. Si no compensa, te lo decimos. Mira <a href="#/servicios/mejorar-hipoteca">Mejorar hipoteca</a>.'],
    [['registro', 'fiar', 'estafa', 'fiable', 'banco de españa'], 'Estamos inscritos en el registro de intermediarios del Banco de España con el número [Nº de registro], y tenemos seguro de responsabilidad civil. Lo puedes comprobar tú mismo.'],
    [['datos', 'privacidad', 'rgpd'], 'Tus datos se usan solo para tu operación y solo van a los bancos que tú apruebes. Detalle en <a href="#/legal">Legal</a>.'],
    [['comisión', 'comision', 'banco os paga', 'independiente'], 'Algunos bancos pagan una comisión al intermediario. Te decimos cuánto paga cada uno, por escrito, antes de que elijas oferta.'],
  ],
  noSe: 'Eso prefiero que lo vea una persona del equipo, para no darte una respuesta genérica. ¿Quieres que te llamemos o que te escribamos?',
  urgenteTexto: 'Si tienes arras o notaría con fecha, mejor que lo vea una persona hoy. Te dejo las dos vías:',
  prohibidoTexto: 'Eso depende de tu expediente y de cada banco, así que no te puedo dar una cifra ni adelantar una respuesta. Lo que sí puedo es llevarte al estudio de viabilidad, donde una persona revisa tu caso.',
};
