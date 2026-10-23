// Estudio de viabilidad: formulario por pasos con resultado orientativo inmediato.
// Las reglas salen del dossier (sección 9) y los umbrales de datos.js → UMBRALES.
// PRELANZAMIENTO: no envía nada. Cuando haya registro, en enviar() se guarda el lead (Supabase).
import { PERFILES, UMBRALES as U, MARCA } from './datos.js';
import { $, $$, euros, punto, pendiente } from './ui.js';

const LIMITES_ICO = { general: 37800, valencia: 46200, alicante: 46200, madrid: 63000, barcelona: 63000 }; // [verificar en ico.es]
const ETAPAS = [['buscando', 'Todavía buscando'], ['vivienda', 'Ya tengo vivienda'], ['arras', 'Arras firmadas'], ['fein', 'Ya tengo la FEIN']];
const sinCompra = (p) => p === 'mejorar-hipoteca' || p === 'revisar-oferta';

// Preguntas propias de cada perfil
const PREGUNTAS = {
  'primera-vivienda': [['edad', 'Edad del comprador más joven', 'numero'], ['provincia', 'Provincia', 'select', [['general', 'Otra provincia'], ['valencia', 'Valencia'], ['alicante', 'Alicante'], ['madrid', 'Madrid'], ['barcelona', 'Barcelona']]]],
  autonomos: [['anios', 'Años de actividad como autónomo', 'numero'], ['denegadaAntes', '¿Algún banco te la ha denegado ya?', 'sino']],
  extranjeros: [['residente', '¿Resides en España?', 'sino'], ['nie', '¿Tienes ya NIE?', 'sino']],
  'mayores-de-50': [['edad', 'Edad del titular de más edad', 'numero']],
  'mejorar-hipoteca': [['tipo', 'Tipo de tu hipoteca', 'select', [['variable', 'Variable (Euríbor)'], ['fija', 'Fija'], ['mixta', 'Mixta'], ['irph', 'IRPH']]], ['anios', 'Años que le quedan', 'numero'], ['pendiente', 'Capital pendiente (€)', 'numero']],
  'revisar-oferta': [['firma', 'Fecha prevista de firma', 'fecha']],
  denegada: [['moroso', '¿Estás en algún fichero de morosidad?', 'sino'], ['arrasFecha', '¿Tienes arras firmadas con fecha?', 'sino'], ['bancos', '¿Cuántos bancos te han dicho que no?', 'numero']],
};

const estado = { paso: 0, perfil: null, d: {} };

export function estudio(v, [pid]) {
  if (PERFILES.some((p) => p.id === pid)) { if (estado.perfil !== pid) estado.d = {}; estado.perfil = pid; estado.paso = 1; }
  else { estado.paso = 0; estado.perfil = null; estado.d = {}; }
  v.innerHTML = `
  <div class="envoltura" style="max-width:820px">
    <header class="cabecera-pagina"><span class="etiqueta">Estudio de viabilidad · gratis</span><h1 class="grabado t-titulo">¿Tiene salida tu caso?</h1>
      <p class="lema">Unos minutos. Te damos una orientación al momento y una persona revisa tu caso.</p>
      <div class="banda">Prelanzamiento: este formulario aún no envía datos.</div></header>
    <div class="panel" style="margin-top:12px"><div class="form-pasos" id="fp"></div><div id="paso"></div></div>
  </div>`;
  pintar(v);
}

function pintar(v) {
  $('#fp', v).innerHTML = [0, 1, 2, 3].map((i) => `<i class="${i < estado.paso ? 'hecho' : ''}"></i>`).join('');
  const cont = $('#paso', v);
  const pasos = [pasoPerfil, pasoComunes, pasoPerfilPreguntas, pasoContacto, pasoResultado];
  cont.innerHTML = pasos[estado.paso]();
  enlazar(cont, v);
  const f = cont.querySelector('input, select, button'); if (f && estado.paso > 0) f.focus({ preventScroll: true });
}

const ir = (v, n) => { estado.paso = n; pintar(v); $('#vista').scrollIntoView({ behavior: 'smooth' }); };
const val = (k) => estado.d[k] ?? '';
const nav = (sig = 'Siguiente') => `<div class="acciones" style="justify-content:space-between; margin-top:24px"><button type="button" class="btn texto" data-atras>← Atrás</button><button class="btn primario">${sig}</button></div>`;

function campo([k, etq, tipo, ops]) {
  if (tipo === 'select') return `<label class="campo">${etq}<select name="${k}" required><option value="">Elige…</option>${ops.map(([o, t]) => `<option value="${o}" ${val(k) === o ? 'selected' : ''}>${t}</option>`).join('')}</select></label>`;
  if (tipo === 'sino') return `<label class="campo">${etq}<select name="${k}" required><option value="">Elige…</option><option value="si" ${val(k) === 'si' ? 'selected' : ''}>Sí</option><option value="no" ${val(k) === 'no' ? 'selected' : ''}>No</option></select></label>`;
  if (tipo === 'fecha') return `<label class="campo">${etq}<input type="date" name="${k}" min="${new Date().toISOString().slice(0, 10)}" value="${val(k)}" required><span class="error-campo" data-err="${k}"></span></label>`;
  return `<label class="campo">${etq}<input name="${k}" inputmode="numeric" pattern="[0-9.]*" value="${val(k)}" required><span class="error-campo" data-err="${k}"></span></label>`;
}

function pasoPerfil() {
  return `<h2 class="t-h2" style="margin-bottom:6px">¿Cuál es tu caso?</h2><p class="apoyo" style="margin-bottom:16px">Elige el que más se parezca. Si dudas entre dos, cualquiera vale.</p>
    <div class="perfiles-elige">${PERFILES.map((p) => `<button type="button" class="opcion" style="${punto(p.color)}" data-perfil="${p.id}" aria-pressed="${estado.perfil === p.id}"><b>${p.nombre}</b><span>${p.gancho}</span></button>`).join('')}</div>`;
}

function pasoComunes() {
  const compra = !sinCompra(estado.perfil);
  return `<form novalidate><h2 class="t-h2" style="margin-bottom:16px">Tus números, a grandes rasgos</h2>
    <div class="rejilla-campos dos">
      ${compra ? campo(['valor', 'Precio de la vivienda (€)', 'numero']) + campo(['ahorro', 'Ahorro que puedes aportar (€)', 'numero']) : ''}
      ${campo(['ingresos', 'Ingresos netos del hogar al mes (€)', 'numero'])}
      ${campo(['titulares', 'Titulares', 'select', [['1', 'Uno'], ['2', 'Dos'], ['3', 'Tres o más']]])}
      ${compra ? campo(['etapa', 'Etapa', 'select', ETAPAS]) : ''}
      ${compra && val('etapa') === 'arras' ? campo(['arras', 'Fecha límite de las arras', 'fecha']) : '<div id="hueco-arras"></div>'}
    </div>${nav()}</form>`;
}

function pasoPerfilPreguntas() {
  const p = PERFILES.find((x) => x.id === estado.perfil);
  return `<form novalidate><h2 class="t-h2" style="margin-bottom:16px" >Sobre tu caso: ${p.corto.toLowerCase()}</h2>
    <div class="rejilla-campos dos">${PREGUNTAS[p.id].map(campo).join('')}</div>${nav()}</form>`;
}

function pasoContacto() {
  return `<form novalidate><h2 class="t-h2" style="margin-bottom:16px">¿Cómo te contactamos?</h2>
    <div class="rejilla-campos dos">
      <label class="campo">Nombre<input name="nombre" autocomplete="given-name" value="${val('nombre')}" required><span class="error-campo" data-err="nombre"></span></label>
      <label class="campo">Teléfono<input name="telefono" type="tel" autocomplete="tel" value="${val('telefono')}" required><span class="error-campo" data-err="telefono"></span></label>
      <label class="campo" style="grid-column:1/-1">Email<input name="email" type="email" autocomplete="email" value="${val('email')}" required><span class="error-campo" data-err="email"></span></label>
    </div>
    <div style="display:grid; gap:10px; margin-top:16px">
      <label class="casilla"><input type="checkbox" name="rgpd" required> <span>Acepto que tratéis mis datos para estudiar mi caso y contactarme. ${pendiente('[Enlace a la política de privacidad]')}</span></label>
      <span class="error-campo" data-err="rgpd"></span>
      <p class="apoyo">No enviamos tus datos a ningún banco sin tu permiso. Máximo ${MARCA.intentosContacto} intentos de contacto.</p>
    </div>${nav('Ver mi orientación')}</form>`;
}

// ---------- Reglas → resultado ----------
function evaluar() {
  const d = estado.d, n = (k) => Number(String(d[k] || 0).replace(/\./g, ''));
  const antes = [], revisar = [];
  const dias = (f) => Math.ceil((new Date(f) - new Date()) / 864e5);

  if (!sinCompra(estado.perfil)) {
    const valor = n('valor'), ahorro = n('ahorro'), anual = n('ingresos') * 12, r = valor ? ahorro / valor : 0;
    const extranjeroNoRes = estado.perfil === 'extranjeros' && d.residente === 'no';
    if (!extranjeroNoRes) {
      if (r < U.ahorroAntes) antes.push('el ahorro: con menos de un 10 % del precio es difícil cubrir entrada y gastos');
      else if (r < U.ahorroRevisar) revisar.push('el ahorro aportado frente al precio');
    }
    if (anual && valor > U.valorIngresos * anual) revisar.push('el precio de la vivienda frente a tus ingresos');
    if (d.etapa === 'arras' && d.arras && dias(d.arras) < U.arrasDias) revisar.push('el plazo de tus arras: hay que moverse ya');
  }
  switch (estado.perfil) {
    case 'primera-vivienda':
      if (n('edad') >= U.edadIco) revisar.push('el acceso al aval ICO por edad (salvo familias con hijos menores)'); break;
    case 'autonomos':
      if (n('anios') < U.autonomoMinAnios) antes.push('la antigüedad: con menos de un año de actividad pocas entidades lo estudian');
      if (d.denegadaAntes === 'si') revisar.push('el motivo de la denegación anterior'); break;
    case 'extranjeros':
      if (d.residente === 'no' && n('valor') && n('ahorro') / n('valor') < U.noResidenteAhorro) revisar.push('la entrada: a no residentes se les suele financiar un porcentaje menor');
      if (d.nie === 'no') revisar.push('el NIE y la cuenta en España antes de las arras'); break;
    case 'mayores-de-50':
      if (n('edad') >= U.edadPlazo) revisar.push('el plazo según la edad máxima de cada entidad'); break;
    case 'mejorar-hipoteca':
      if (d.tipo === 'irph') revisar.push('tu hipoteca IRPH, que tiene un tratamiento propio');
      else if (n('anios') < U.mejorarMinAnios || n('pendiente') < U.mejorarMinPendiente) antes.push('si compensa: con poco plazo o poco capital pendiente el ahorro suele ser pequeño'); break;
    case 'revisar-oferta':
      if (d.firma && dias(d.firma) < U.feinDias) revisar.push('la fecha: la firma está muy cerca'); break;
    case 'denegada':
      if (d.moroso === 'si') antes.push('el fichero de morosidad: hay que resolverlo primero');
      if (n('bancos') >= U.denegadaBancos) antes.push('el motivo común de las denegaciones antes de volver a presentarlo');
      if (d.arrasFecha === 'si') revisar.push('tus arras con fecha');
      revisar.push('el motivo de la denegación'); break;
  }
  if (antes.length) return ['antes', 'Antes de pedirla, conviene revisar ' + antes[0] + '.', [...antes.slice(1), ...revisar]];
  if (revisar.length) return ['revisar', 'Hay que revisar ' + revisar[0] + ': hablemos.', revisar.slice(1)];
  return ['ok', `Con estos datos, tu caso merece un estudio detallado: te escribimos en ${MARCA.respuestaHoras} h laborables.`, []];
}

function pasoResultado() {
  const [tipo, frase, mas] = evaluar();
  const etq = { ok: 'Encaja', revisar: 'Hay que revisar', antes: 'Antes de pedirla' }[tipo];
  const ico = estado.perfil === 'primera-vivienda' ? `<p class="apoyo">Límite de ingresos para el aval ICO en tu provincia: <b>${euros(LIMITES_ICO[estado.d.provincia] || LIMITES_ICO.general)}</b> ${pendiente('[verificar en ico.es]')}</p>` : '';
  return `<div class="resultado ${tipo}">
      <span class="estado ${tipo}">${etq}</span>
      <h2 class="grabado t-h2">${frase}</h2>
      ${mas.length ? `<ul class="lista">${mas.map((m) => `<li>También: ${m}.</li>`).join('')}</ul>` : ''}
      ${ico}
      <p class="apoyo">Es una orientación, no una aprobación. La decisión final es siempre del banco.</p>
    </div>
    <div class="hundida" style="margin-top:16px"><span class="etiqueta">Siguiente paso</span>
      <p style="margin:8px 0 12px">Reserva una llamada de 20 minutos. En el primer minuto te contamos el precio.</p>
      <div class="acciones"><button class="btn primario" type="button" disabled title="Se activa con el lanzamiento">Reservar llamada ${pendiente('[Cal.com]')}</button><a class="btn" href="#/area">Ver cómo es el área cliente</a></div></div>
    <div class="acciones" style="margin-top:20px"><button type="button" class="btn texto" data-reiniciar>Empezar de nuevo</button></div>`;
}

// ---------- Eventos y validación ----------
function enlazar(cont, v) {
  $$('[data-perfil]', cont).forEach((b) => b.addEventListener('click', () => { estado.perfil = b.dataset.perfil; history.replaceState(null, '', `#/estudio/${estado.perfil}`); ir(v, 1); }));
  $('[data-atras]', cont)?.addEventListener('click', () => ir(v, estado.paso - 1));
  $('[data-reiniciar]', cont)?.addEventListener('click', () => { estado.d = {}; estado.perfil = null; history.replaceState(null, '', '#/estudio'); ir(v, 0); });
  const etapa = $('select[name=etapa]', cont);
  etapa?.addEventListener('change', () => { estado.d.etapa = etapa.value; guardar(cont); pintar(v); });
  $('form', cont)?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validar(cont)) return;
    guardar(cont);
    ir(v, estado.paso + 1);
  });
}

function guardar(cont) { $$('input, select', cont).forEach((i) => { if (i.name) estado.d[i.name] = i.type === 'checkbox' ? i.checked : i.value.trim(); }); }

function validar(cont) {
  let ok = true;
  $$('input, select', cont).forEach((i) => {
    if (!i.name) return;
    const err = $(`[data-err="${i.name}"]`, cont);
    let msg = '';
    if (i.type === 'checkbox') { if (!i.checked) msg = 'Necesitamos tu consentimiento para poder contestarte.'; }
    else if (!i.value.trim()) msg = 'Falta este dato.';
    else if (i.inputMode === 'numeric' && !/^\d+$/.test(i.value.replace(/\./g, ''))) msg = 'Escribe solo números enteros, sin decimales.';
    else if (i.type === 'date' && i.value < new Date().toISOString().slice(0, 10)) msg = 'La fecha no puede ser pasada.';
    else if (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value)) msg = 'Revisa el email.';
    else if (i.type === 'tel' && i.value.replace(/\D/g, '').length < 9) msg = 'Revisa el teléfono.';
    i.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) err.textContent = msg;
    if (msg) { if (ok) i.focus(); ok = false; }
  });
  return ok;
}
