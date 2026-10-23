// Prototipos de lo que viene después del formulario: área cliente, panel interno y mapa del proyecto.
// Todo con DATOS FICTICIOS para ver la organización. Más adelante se conectan a la base de datos.
import { PERFILES, PASOS, MARCA } from './datos.js';
import { $, $$, euros, punto, segmentado, pendiente } from './ui.js';

const bandaDemo = (t) => `<div class="banda">${t}</div>`;

// =====================================================================
// ÁREA CLIENTE
// =====================================================================
const CLIENTE = {
  nombre: 'Laura', perfil: 'autonomos', importe: 190000, valor: 245000, pasoActual: 2, responsable: 'Gaizka Cebrián',
  docs: [
    ['DNI de ambos titulares', 'ok', 'Validado el 2 nov'],
    ['Declaraciones de la renta 2024 y 2025', 'ok', 'Validado el 2 nov'],
    ['Modelos 130 y 303 de 2026', 'revisar', 'Falta el 3T: súbelo cuando lo presentes'],
    ['Vida laboral', 'ok', 'Validado el 3 nov'],
    ['Extractos bancarios de 6 meses', 'antes', 'Pendiente'],
    ['Contrato de arras', 'ok', 'Validado el 1 nov'],
  ],
  bancos: [
    ['Entidad A', true, 3, null, 'Tasación pedida'],
    ['Entidad B', true, 2, null, 'En estudio de riesgos'],
    ['Entidad C', true, 4, null, 'Oferta recibida'],
    ['Entidad D', false, 0, null, 'No autorizada por ti'],
    ['Entidad E', true, 2, 'no', 'Denegada: exige 2 años de actividad'],
  ],
  ofertas: [
    // banco, tipo, cuota/año, seguros obligatorios, bonificaciones (coste/año), comisión que paga el banco al intermediario
    ['Entidad C', 'Fijo 2,65 % (bonificado)', 10920, 0, 640, 950],
    ['Entidad A', 'Mixto 2,35 % 5 años', 10430, 380, 1180, 1520],
  ],
  fein: [
    ['Tipo de interés', '2,65 % bonificado', '2,65 % bonificado', true],
    ['Bonificación por seguro de hogar', 'Opcional', 'Opcional', true],
    ['Seguro de vida', 'Opcional', 'Figura como obligatorio', false],
    ['Comisión de amortización anticipada', '0 %', '2 % los 3 primeros años', false],
    ['Plazo', '27 años', '27 años', true],
  ],
  mensajes: [
    ['3 nov · Gaizka', 'Entidad C ha enviado oferta. Te la he puesto en «Ofertas» comparada en euros al año.'],
    ['2 nov · Automático', 'Recordatorio: faltan los extractos bancarios de 6 meses.'],
    ['1 nov · Gaizka', 'Expediente enviado a las entidades A, B, C y E (las que autorizaste).'],
  ],
};

export function area(v, [tab = 'resumen']) {
  const p = PERFILES.find((x) => x.id === CLIENTE.perfil);
  v.innerHTML = `
  <div class="envoltura">
    <header class="cabecera-pagina">
      ${bandaDemo('Demostración con datos ficticios · Se activa con el lanzamiento (acceso por enlace al email)')}
      <div class="area-cab">
        <div style="display:grid; gap:8px"><span class="etiqueta" style="${punto(p.color)}">${p.nombre} · ${euros(CLIENTE.importe)}</span>
          <h1 class="grabado t-titulo">Hola, ${CLIENTE.nombre}</h1>
          <p class="lema">Responsable de tu caso: <b>${CLIENTE.responsable}</b>. Te escribe cada semana con el estado aunque no haya novedades.</p></div>
        <a class="btn" href="#/">Salir</a>
      </div>
    </header>
    <div id="area-tabs" style="margin:16px 0 20px"></div>
    <div id="area-cuerpo"></div>
  </div>`;
  const TABS = { resumen: 'Resumen', documentos: 'Documentos', bancos: 'Bancos', ofertas: 'Ofertas', fein: 'FEIN', mensajes: 'Mensajes' };
  const pintar = (t) => { history.replaceState(null, '', `#/area/${t}`); $('#area-cuerpo', v).innerHTML = AREA[t](); };
  segmentado($('#area-tabs', v), Object.entries(TABS).map(([id, txt]) => ({ id, txt })), TABS[tab] ? tab : 'resumen', pintar, 'Área cliente');
  pintar(TABS[tab] ? tab : 'resumen');
}

const AREA = {
  resumen() {
    const hechos = CLIENTE.docs.filter((d) => d[1] === 'ok').length;
    return `<div class="rejilla dos">
      <div class="panel"><span class="etiqueta">Tu proceso</span><div class="pasos" style="margin-top:14px">${PASOS.map(([t], i) => `
        <div class="paso ${i === CLIENTE.pasoActual ? 'actual' : i < CLIENTE.pasoActual ? 'hecho' : ''}"><span class="num">${i < CLIENTE.pasoActual ? '✓' : i + 1}</span><h3>${t}${i === CLIENTE.pasoActual ? '<span class="estado ok aqui">Ahora</span>' : ''}</h3><p></p></div>`).join('')}</div></div>
      <div class="rejilla" style="align-content:start">
        <div class="rejilla dos"><div class="kpi"><span>Documentos</span><b>${hechos}/${CLIENTE.docs.length}</b><small>validados</small></div>
          <div class="kpi"><span>Bancos</span><b>4</b><small>con tu expediente</small></div></div>
        <div class="panel"><span class="etiqueta">Te toca a ti</span><ul class="lista" style="margin-top:12px">
          <li>Subir los extractos bancarios de 6 meses</li><li>Subir el modelo 130 del 3T cuando lo presentes</li></ul>
          <a class="btn chico" href="#/area/documentos" style="margin-top:14px">Ir a documentos</a></div>
        <div class="panel"><span class="etiqueta">Firmado</span><div class="doc"><div><b>Información precontractual</b><br><small>Entregada el 31 oct · firmada digitalmente</small></div><span class="estado ok">Firmado</span></div>
          <div class="doc"><div><b>Nota de encargo</b><br><small>Honorario 2.850 € · solo si firmas</small></div><span class="estado ok">Firmado</span></div></div>
      </div></div>`;
  },
  documentos() {
    const lab = { ok: 'Validado', revisar: 'Revisar', antes: 'Pendiente' };
    return `<div class="rejilla dos"><div class="panel">${CLIENTE.docs.map(([n, e, s]) => `
      <div class="doc"><div><b style="font-weight:500">${n}</b><br><small>${s}</small></div><span class="estado ${e}">${lab[e]}</span></div>`).join('')}</div>
      <div class="rejilla" style="align-content:start">
        <div class="panel hundida" style="text-align:center; padding:32px 20px; border:1.5px dashed rgba(13,39,80,.15)"><b>Arrastra aquí tus documentos</b><p class="apoyo">PDF o foto. Se guardan cifrados y solo los vemos nosotros. ${pendiente('[Almacenamiento: Supabase Storage UE]')}</p>
          <button class="btn chico" style="margin-top:12px" disabled>Subir archivo</button></div>
        <div class="panel"><span class="etiqueta">Por qué te pedimos esto</span><p style="margin-top:8px">Con autónomos el banco parte de lo declarado y de la antigüedad. Con los trimestrales del año ve cómo va tu actividad ahora.</p></div>
      </div></div>`;
  },
  bancos() {
    const fases = ['Enviado', 'En estudio', 'Tasación', 'Oferta'];
    return `<div class="rejilla dos">
      <div class="panel" style="display:grid; gap:18px"><span class="etiqueta">Estado por banco</span>${CLIENTE.bancos.map(([b, aut, fase, no, txt]) => `
        <div class="banco"><div><b>${b}</b><br><small class="apoyo">${txt}</small></div>${aut ? `<span class="estado ${no ? 'antes' : fase === 4 ? 'ok' : 'neutro'}">${no ? 'Denegada' : fases[fase - 1]}</span>` : '<span class="estado neutro">Sin enviar</span>'}
          <div class="linea-tiempo">${fases.map((_, i) => `<i class="${no && i === fase - 1 ? 'no' : i < fase ? 'on' : ''}"></i>`).join('')}</div></div>`).join('')}</div>
      <div class="panel"><span class="etiqueta">Tu permiso, banco a banco</span><p style="margin:8px 0 14px">Tu expediente solo va a las entidades que marques.</p>${CLIENTE.bancos.map(([b, aut]) => `
        <label class="casilla" style="padding:8px 0"><input type="checkbox" ${aut ? 'checked' : ''} disabled> <span>${b}</span></label>`).join('')}</div></div>`;
  },
  ofertas() {
    const filas = CLIENTE.ofertas.map(([b, t, cuota, seg, bon, com]) => ({ b, t, cuota, seg, bon, com, total: cuota + seg + bon }));
    const col = (f) => filas.map((o) => `<td>${f(o)}</td>`).join('');
    return `<div class="panel tabla-env"><table class="comparador">
      <thead><tr><th>En euros al año</th>${filas.map((o) => `<th>${o.b}<br><span style="text-transform:none; letter-spacing:0; font-weight:500">${o.t}</span></th>`).join('')}</tr></thead>
      <tbody>
        <tr><td>Cuota de la hipoteca</td>${col((o) => euros(o.cuota))}</tr>
        <tr><td>Seguros <b>obligatorios</b></td>${col((o) => euros(o.seg))}</tr>
        <tr><td>Productos para la bonificación <span class="apoyo">(opcionales)</span></td>${col((o) => euros(o.bon))}</tr>
        <tr class="total"><td>Coste real el primer año</td>${col((o) => euros(o.total))}</tr>
        <tr><td><span class="apoyo">Comisión que este banco nos paga a nosotros</span></td>${col((o) => `<span class="apoyo">${euros(o.com)}</span>`)}</tr>
      </tbody></table>
      <p class="apoyo" style="margin-top:14px">Te enseñamos lo que nos paga cada banco antes de que elijas. Cifras de ejemplo: las ofertas reales llevan su TAE y la FEIN.</p></div>`;
  },
  fein() {
    return `<div class="panel tabla-env"><span class="etiqueta">Segunda lectura de tu FEIN · Entidad C</span><table style="margin-top:12px">
      <thead><tr><th>Punto</th><th>Lo negociado</th><th>Lo que dice la FEIN</th><th></th></tr></thead>
      <tbody>${CLIENTE.fein.map(([p, n, f, ok]) => `<tr><td><b>${p}</b></td><td>${n}</td><td>${f}</td><td>${ok ? '<span class="estado ok">Coincide</span>' : '<span class="estado antes">No coincide</span>'}</td></tr>`).join('')}</tbody></table>
      <p style="margin-top:16px">Hay 2 puntos que reclamar al banco antes del acta notarial. Te llamamos hoy para verlo.</p></div>`;
  },
  mensajes() {
    return `<div class="rejilla dos"><div class="panel" style="display:grid; gap:14px">${CLIENTE.mensajes.map(([q, t]) => `<div class="hundida"><small class="apoyo">${q}</small><p style="margin-top:4px">${t}</p></div>`).join('')}</div>
      <div class="panel"><span class="etiqueta">Canales</span><p style="margin-top:8px">Estado semanal por WhatsApp y email. Para dudas generales, el asistente; para tu caso, siempre una persona.</p>
        <div class="acciones" style="margin-top:14px"><button class="btn chico" disabled>WhatsApp ${pendiente(MARCA.whatsapp)}</button><button class="btn chico" disabled>Escribir a Gaizka</button></div></div></div>`;
  },
};

// =====================================================================
// PANEL INTERNO (backoffice)
// =====================================================================
const LEADS = [
  ['Marta R.', 'denegada', 'revisar', 'meta · denegada-v2', 1, 'Llamada mañana 10:00'],
  ['James T.', 'extranjeros', 'revisar', 'meta · extranjeros-en', 2, 'Escalado por el asistente: arras en 3 semanas'],
  ['Laura P.', 'autonomos', 'ok', 'meta · autonomos-v1', 1, 'Encargo firmado'],
  ['Andrés G.', 'mayores-de-50', 'ok', 'web directa', 3, 'Sin respuesta · cerrado'],
  ['Nuria S.', 'primera-vivienda', 'antes', 'meta · ico-v1', 1, 'Enviado plan de ahorro'],
  ['Pablo M.', 'revisar-oferta', 'revisar', 'google', 1, 'FEIN recibida, notaría el día 14'],
];

export function panel(v) {
  const lab = { ok: 'Encaja', revisar: 'Revisar', antes: 'Antes' };
  const embudo = [['Visitas a landings', 1840], ['Formularios empezados', 212], ['Formularios completos', 96], ['Llamadas hechas', 41], ['Encargos firmados', 9], ['Operaciones firmadas', 2]];
  v.innerHTML = `
  <div class="envoltura">
    <header class="cabecera-pagina">${bandaDemo('Panel interno · datos ficticios · solo para el equipo')}
      <h1 class="grabado t-titulo">Panel</h1><p class="lema">Las métricas del dossier desde el primer día: coste por contacto, % viables, operaciones y horas.</p></header>
    <div class="rejilla cuatro" style="margin-top:12px">
      <div class="kpi"><span>Coste por contacto</span><b>${euros(18)}</b><small>Meta · últimos 30 días</small></div>
      <div class="kpi"><span>Contactos viables</span><b>58 %</b><small>Encaja + Revisar</small></div>
      <div class="kpi"><span>Operaciones firmadas</span><b>2</b><small>Objetivo: 1–2 al mes</small></div>
      <div class="kpi"><span>Horas por operación</span><b>14 h</b><small>Media</small></div>
    </div>
    <div class="rejilla dos" style="margin-top:16px">
      <div class="panel"><span class="etiqueta">Embudo del mes</span><div class="embudo" style="margin-top:14px">${embudo.map(([t, n]) => `
        <div class="fila"><span>${t}</span><div class="barra-e"><i style="width:${Math.max(3, (Math.log10(n + 1) / Math.log10(embudo[0][1] + 1)) * 100)}%"></i></div><b>${n}</b></div>`).join('')}</div>
        <p class="apoyo" style="margin-top:10px">Escala logarítmica.</p></div>
      <div class="panel"><span class="etiqueta">Ingreso por operación</span>
        <div class="doc"><span>Honorario medio</span><b>${euros(2850)}</b></div>
        <div class="doc"><span>Comisión de banco media</span><b>${euros(1100)}</b></div>
        <div class="doc"><span>Anuncios por operación firmada</span><b>−${euros(410)}</b></div>
        <div class="doc"><span><b>Margen por operación</b></span><b>${euros(3540)}</b></div>
        <p class="apoyo" style="margin-top:8px">Decisión ago–sep 2027: seguir si se cierran ≥ 1–2 al mes con margen claro.</p></div>
    </div>
    <section class="seccion" style="padding-top:24px">
      <div class="panel tabla-env"><span class="etiqueta">Leads</span><table style="margin-top:8px">
        <thead><tr><th>Nombre</th><th>Perfil</th><th>Resultado</th><th>Origen</th><th>Intentos</th><th>Estado</th></tr></thead>
        <tbody>${LEADS.map(([n, pid, r, o, i, e]) => { const p = PERFILES.find((x) => x.id === pid); return `
          <tr class="clic"><td><b>${n}</b></td><td><span class="chip" style="${punto(p.color)}; min-height:26px; font-size:12px; box-shadow:none">${p.corto}</span></td><td><span class="estado ${r}">${lab[r]}</span></td>
          <td class="apoyo">${o}</td><td>${i}/${MARCA.intentosContacto}</td><td>${e}</td></tr>`; }).join('')}</tbody></table></div>
    </section>
  </div>`;
}

// =====================================================================
// MAPA DEL PROYECTO · cómo se conecta todo
// =====================================================================
const FLUJO = [
  ['cliente', 'Anuncio en Meta, uno por perfil', 'Cada anuncio lleva a la página de su perfil con su enlace etiquetado (UTM) para saber qué funciona.', ['Meta Ads', 'Pie con marca y nº de registro']],
  ['cliente', 'Página del perfil', 'El problema con sus palabras, el mecanismo, el precio y la prueba de que somos quien decimos.', ['#/servicios/…', 'Asistente disponible']],
  ['auto', 'Estudio de viabilidad', 'Formulario por pasos. Resultado orientativo inmediato: Encaja / Revisar / Antes.', ['umbrales en datos.js', 'Lead → base de datos']],
  ['cliente', 'Reserva de llamada (20 min)', 'El cliente elige hueco al terminar el formulario. Precio en el primer minuto.', ['Cal.com', 'Recordatorio 24 h', 'Contenido útil a los 3 días']],
  ['interno', 'Información precontractual y nota de encargo', 'Se firman en digital y queda registrada la versión entregada (art. 35).', ['Firma digital', 'PDF en el expediente']],
  ['cliente', 'Área cliente', 'Checklist de documentos, permiso banco a banco, estado de cada banco, comparador y FEIN.', ['Acceso por enlace al email', 'Supabase (UE)']],
  ['interno', 'Envío a bancos y seguimiento', 'Solo a las entidades autorizadas. Cada cambio de estado avisa al cliente.', ['Panel interno', 'WhatsApp + email semanal']],
  ['interno', 'FEIN, notaría y cobro', 'Revisión de la FEIN contra lo negociado. Cobro del honorario en notaría.', ['Comparador en €/año']],
  ['auto', 'Después de la firma', 'Reseña, permiso para caso anónimo y revisión a los 12 meses. Los datos alimentan las métricas.', ['Recordatorio a 12 meses', 'Métricas']],
];

export function mapa(v) {
  v.innerHTML = `
  <div class="envoltura">
    <header class="cabecera-pagina">${bandaDemo('Página interna para organizarnos · no se publica')}
      <h1 class="grabado t-titulo">Mapa del proyecto</h1><p class="lema">Qué ve el cliente, qué pasa solo y qué hacemos nosotros, en orden.</p>
      <div class="leyenda"><span><i style="background:var(--p-ico)"></i>Lo ve el cliente</span><span><i style="background:var(--p-mayor)"></i>Automático</span><span><i style="background:var(--p-oferta)"></i>Lo hacemos nosotros</span></div></header>
    <div class="rejilla dos" style="margin-top:20px; align-items:start">
      <div class="panel"><div class="flujo">${FLUJO.map(([t, h, p, ch], i) => `
        <div class="nodo"><span class="bola ${t}">${i + 1}</span><h3>${h}</h3><p>${p}</p><div class="chips">${ch.map((c) => `<span class="chip sin-punto">${c}</span>`).join('')}</div></div>`).join('')}</div></div>
      <div class="rejilla" style="align-content:start">
        <div class="panel"><span class="etiqueta">El asistente, en cada punto</span><ul class="lista" style="margin-top:12px">
          <li>Se presenta como asistente automático desde el primer mensaje.</li>
          <li>Responde con una base de conocimiento cerrada (datos.js → ASISTENTE).</li>
          <li>Nunca valora casos, ni da tipos, cuotas o TAE, ni promete aprobaciones.</li>
          <li>Pasa a una persona si hay arras o notaría con fecha, o si el cliente lo pide.</li>
          <li>Dentro del área cliente podrá contestar «qué me falta» leyendo el estado.</li></ul></div>
        <div class="panel"><span class="etiqueta">Páginas</span><div class="chips" style="margin-top:12px">
          ${['/', '/servicios/…×7', '/como-trabajamos', '/precio', '/nosotros', '/estudio', '/legal', '/area', '/panel', '/mapa'].map((r) => `<span class="chip sin-punto">#${r}</span>`).join('')}</div></div>
        <div class="panel"><span class="etiqueta">Al lanzar (con nº de registro)</span><ul class="lista" style="margin-top:12px">
          <li>Rellenar todos los ${pendiente('[marcadores]')} de datos.js</li><li>Quitar <code>noindex</code> del index.html</li>
          <li>Conectar el formulario a la base de datos y la reserva de llamada</li><li>Activar área cliente y panel con acceso real</li>
          <li>Píxel de Meta solo con consentimiento y política de cookies actualizada</li><li>Hosting comercial</li></ul></div>
        <div class="panel"><span class="etiqueta">Decisiones abiertas</span><ul class="lista" style="margin-top:12px">
          <li>¿Se descuenta la comisión del banco del honorario?</li><li>Mejorar hipoteca: qué pasa si el banco actual iguala</li>
          <li>Orden de lanzamiento de perfiles</li><li>Nombre, logo y colores de marca</li><li>Quién figura como intermediario registrado (persona física o S.L.)</li></ul></div>
      </div>
    </div>
  </div>`;
}
