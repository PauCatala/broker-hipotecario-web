// Páginas públicas: Inicio, Servicios, Cómo trabajamos, Precio, Nosotros, Legal y pie.
import { MARCA, EQUIPO, PERFILES, TARIFAS, honorario, COMPROMISOS, PASOS, PUNTOS, FACTORES, PREGUNTAS } from './datos.js';
import { $, $$, euros, pendiente, punto, segmentado, contar, ico } from './ui.js';

const perfil = (id) => PERFILES.find((p) => p.id === id);
const aviso = '<p class="apoyo">Es una orientación, no una aprobación. La decisión final es siempre del banco.</p>';

// =====================================================================
// INICIO
// =====================================================================
// Ejemplos ilustrativos para la escena (entidades anónimas: nunca se nombran bancos)
const EJEMPLOS = {
  autonomos: {
    txt: 'Autónomo',
    cuentas: [['Facturación', 'Unos 4.200 € al mes'], ['Actividad', '18 meses como autónomo'], ['Ahorro', '45.000 € para entrada y gastos']],
    expediente: [['Base imponible', '31.400 €/año'], ['Antigüedad', '1 año y 6 meses'], ['Financiación', '78 %'], ['Endeudamiento', '29 %']],
    bancos: [['Entidad A', 'Exige 2 años de actividad', false], ['Entidad B', 'Valora los últimos 12 meses', true], ['Entidad C', 'Pide previsión del año en curso', true]],
  },
  mayores: {
    txt: 'Mayor de 50',
    cuentas: [['Edad', '58 años'], ['Ingresos', 'Nómina estable desde hace 20 años'], ['Objetivo', 'Cambiar a una vivienda más pequeña']],
    expediente: [['Edad al vencimiento', '83 años a 25 años'], ['Plazo posible', '17–22 años según entidad'], ['Financiación', '60 %'], ['Endeudamiento', '27 %']],
    bancos: [['Entidad A', 'Edad máxima 75 años', false], ['Entidad B', 'Edad máxima 80 años', true], ['Entidad C', 'Estudia vida + plazo corto', true]],
  },
  extranjeros: {
    txt: 'No residente',
    cuentas: [['Residence', 'United Kingdom'], ['Income', 'Salaried, 6 years'], ['Savings', '40 % of the price']],
    expediente: [['Residencia', 'No residente'], ['Financiación', '60 %'], ['Impuestos y gastos', '≈ 12 %'], ['NIE y cuenta', 'En trámite']],
    bancos: [['Entidad A', 'No financia a no residentes', false], ['Entidad B', 'Hasta 60–70 %', true], ['Entidad C', 'Atiende en inglés', true]],
  },
};

function escena(cont, clave) {
  const ej = EJEMPLOS[clave];
  cont.querySelector('.orbita.izq').innerHTML = `<p class="etiqueta">Lo que tú cuentas</p>` + ej.cuentas.map(([h, p], i) =>
    `<div class="cristal" style="--arco:${[18, 0, 18][i]}"><h4>${h}</h4><p>${p}</p></div>`).join('');
  cont.querySelector('.expediente').innerHTML = `
    <div class="cab"><span>Expediente</span><span>${ej.txt}</span></div>
    <div class="linea-t" style="width:62%"></div><div class="linea-t" style="width:40%"></div>
    ${ej.expediente.map(([a, b]) => `<div class="fila"><span>${a}</span><b>${b}</b></div>`).join('')}
    <span class="sello">Encaja en 2 de 3</span>`;
  cont.querySelector('.orbita.der').innerHTML = `<p class="etiqueta">Cómo lo lee cada banco</p>` + ej.bancos.map(([h, p, ok], i) =>
    `<div class="cristal ${ok ? '' : 'apagada'}" style="--arco:${[18, 0, 18][i]}"><h4>${h}<span>${ok ? '✓' : '✕'}</span></h4><p>${p}</p></div>`).join('');
  requestAnimationFrame(() => hilos(cont));
}

// Hilos que unen las tarjetas con el expediente (como en SYNCO)
function hilos(cont) {
  const svg = cont.querySelector('.hilos');
  if (!svg || getComputedStyle(svg).display === 'none') return;
  const r0 = cont.getBoundingClientRect(), exp = cont.querySelector('.expediente').getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${r0.width} ${r0.height}`);
  const cx = exp.left - r0.left, cy = exp.top - r0.top;
  let d = '';
  $$('.orbita.izq .cristal', cont).forEach((c) => {
    const r = c.getBoundingClientRect(), x1 = r.right - r0.left, y1 = r.top - r0.top + r.height / 2, x2 = cx + 8, y2 = cy + exp.height / 2;
    d += `<path d="M${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}"/><circle cx="${x1}" cy="${y1}" r="3"/>`;
  });
  $$('.orbita.der .cristal', cont).forEach((c) => {
    const r = c.getBoundingClientRect(), x2 = r.left - r0.left, y2 = r.top - r0.top + r.height / 2, x1 = cx + exp.width - 8, y1 = cy + exp.height / 2;
    d += `<path d="M${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}"/><circle cx="${x2}" cy="${y2}" r="3"/>`;
  });
  const ex = cx + exp.width - 8, ey = cy + exp.height / 2;
  svg.innerHTML = d + `<circle class="aro" cx="${ex}" cy="${ey}" r="6"/><circle cx="${ex}" cy="${ey}" r="3"/>`;
}

export function inicio(v) {
  v.innerHTML = `
  <div class="envoltura">
    <section class="hero">
      <div class="hero-texto revelar">
        <span class="etiqueta">Intermediarios hipotecarios · Toda España</span>
        <h1 class="grabado t-display">Te ayudamos a conseguir<br><span class="claro">tu hipoteca.</span></h1>
        <p class="lema">El banco no decide sobre ti, decide sobre tu expediente. Y cada banco lo lee de una forma distinta. Lo preparamos, lo llevamos a los bancos donde encaja y <span class="marcador">solo pagas si firmas</span>.</p>
        <div class="acciones">
          <a class="btn primario grande" href="#/estudio">Pide tu estudio de viabilidad</a>
          <a class="btn grande" href="#/como-trabajamos">Cómo trabajamos</a>
        </div>
        <div class="promesas"><span>Solo pagas si firmas</span><span>Precio publicado</span><span>Un responsable de tu caso</span></div>
      </div>

      <div class="escena revelar" id="escena" aria-label="Ejemplo ilustrativo: el mismo caso leído por tres bancos">
        <svg class="hilos" aria-hidden="true"></svg>
        <div class="orbita izq"></div>
        <div class="expediente"></div>
        <div class="orbita der"></div>
        <div class="escena-pie"><div id="escena-sel"></div></div>
      </div>
      <p class="apoyo" style="text-align:center">Ejemplo ilustrativo con datos ficticios. Las entidades son anónimas y los criterios cambian.</p>
    </section>

    <section class="seccion">
      <div class="seccion-cab revelar"><span class="etiqueta">Elige tu caso</span><h2 class="grabado t-titulo">¿Cuál es tu situación?</h2>
        <p class="lema">Trabajamos los casos que se salen del patrón del banco. Si eres asalariado fijo y pides un 80 % con una buena oferta, probablemente no nos necesitas, y te lo diremos.</p></div>
      <div class="rejilla tres">${PERFILES.map((p, i) => `
        <a class="widget revelar" style="${punto(p.color)}; --i:${i}" href="#/servicios/${p.id}"><small>${p.corto}</small><b>${p.gancho}</b>${ico('flecha', 'flecha')}</a>`).join('')}
      </div>
    </section>

    <section class="seccion">
      <div class="rejilla dos" style="align-items:center">
        <div class="seccion-cab revelar"><span class="etiqueta">Por qué pasa</span><h2 class="grabado t-titulo">Lo que el simulador no mira</h2>
          <p class="lema">Los simuladores te dan una cifra con dos datos. El banco decide con siete, y cada uno los pesa distinto.</p>
          <div id="sim-sel" style="margin-top:8px"></div>
          <p class="apoyo" id="sim-txt">Un simulador típico mira 2 de 7.</p></div>
        <div class="panel revelar"><div class="factores" id="factores">${FACTORES.map(([t, s, sim]) => `
          <div class="factor ${sim ? '' : 'oculta-sim'}" data-sim="${!!sim}"><b>${t}</b><span class="estado ${sim ? 'neutro' : 'ok'}">${sim ? 'Simulador y banco' : 'Solo el banco'}</span><small>${s}</small></div>`).join('')}</div></div>
      </div>
    </section>

    <section class="seccion">
      <div class="seccion-cab revelar"><span class="etiqueta">Cómo trabajamos</span><h2 class="grabado t-titulo">Cinco pasos, todos por escrito</h2></div>
      <div class="rejilla dos">
        <div class="panel revelar"><div class="pasos">${PASOS.map(([t, d], i) => `<div class="paso"><span class="num">${i + 1}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></div>
        <div class="rejilla" style="align-content:start">
          <div class="panel revelar"><span class="etiqueta">Plazo orientativo</span><p class="grabado t-h2" style="margin:8px 0 6px">4–8 semanas</p><p class="apoyo">Depende sobre todo de los bancos. Nunca prometemos sus plazos; sí los nuestros: te respondemos en ${MARCA.respuestaHoras} h laborables.</p></div>
          <div class="panel revelar"><span class="etiqueta">Nuestros compromisos</span><ul class="lista check" style="margin-top:12px">${COMPROMISOS.slice(0, 4).map(([t]) => `<li>${t}</li>`).join('')}</ul>
            <a class="btn chico" href="#/como-trabajamos" style="margin-top:16px">Ver el proceso completo</a></div>
        </div>
      </div>
    </section>

    <section class="seccion">
      <div class="panel revelar" id="calc-inicio"></div>
    </section>

    <section class="seccion">
      <div class="rejilla dos">
        <div class="seccion-cab revelar"><span class="etiqueta">Antes de darnos tus datos</span><h2 class="grabado t-titulo">Compruébalo tú</h2>
          <p class="lema">Lo normal es buscarnos en Google antes de rellenar nada. Aquí tienes todo lo que necesitas para hacerlo.</p></div>
        <div class="panel revelar">${confianza()}</div>
      </div>
    </section>

    <section class="seccion">
      <div class="seccion-cab revelar"><span class="etiqueta">Preguntas</span><h2 class="grabado t-titulo">Lo que nos suelen preguntar</h2></div>
      <div class="preguntas revelar">${PREGUNTAS.slice(0, 6).map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
    </section>

    ${cta()}
  </div>`;

  const esc = $('#escena', v);
  segmentado($('#escena-sel', v), Object.entries(EJEMPLOS).map(([id, e]) => ({ id, txt: e.txt })), 'autonomos', (id) => escena(esc, id), 'Ejemplo');
  escena(esc, 'autonomos');
  addEventListener('resize', () => esc.isConnected && hilos(esc));

  segmentado($('#sim-sel', v), [{ id: 'sim', txt: 'Simulador' }, { id: 'banco', txt: 'Banco' }], 'sim', (id) => {
    $$('.factor', v).forEach((f) => f.classList.toggle('oculta-sim', id === 'sim' && f.dataset.sim === 'false'));
    $('#sim-txt', v).textContent = id === 'sim' ? 'Un simulador típico mira 2 de 7.' : 'El banco mira las 7.';
  }, 'Quién mira');

  calculadora($('#calc-inicio', v));
}

// =====================================================================
// SERVICIOS (un perfil por pestaña)
// =====================================================================
export function servicios(v, [id]) {
  const actual = perfil(id) || PERFILES[0];
  v.innerHTML = `
  <div class="envoltura">
    <header class="cabecera-pagina"><span class="etiqueta">Servicios</span><h1 class="grabado t-titulo">Siete casos que conocemos bien</h1>
      <p class="lema">Cada perfil tiene un motivo distinto por el que el banco duda. Elige el tuyo.</p></header>
    <div id="perfiles-sel" style="margin:12px 0 8px"></div>
    <div id="perfil"></div>
  </div>`;
  const pintar = (pid) => {
    const p = perfil(pid);
    history.replaceState(null, '', `#/servicios/${pid}`);
    $('#perfil', v).innerHTML = fichaPerfil(p);
    calculadora($('#perfil .calc-perfil', v), p.tarifa, true);
  };
  segmentado($('#perfiles-sel', v), PERFILES.map((p) => ({ id: p.id, txt: p.corto, color: p.color })), actual.id, pintar, 'Perfiles');
  pintar(actual.id);
}

function fichaPerfil(p) {
  return `
  <section class="vista entrando" style="${punto(p.color)}; padding:0; min-height:0">
    <div class="rejilla dos" style="align-items:end; margin:24px 0 20px">
      <div style="display:grid; gap:12px"><span class="etiqueta">${p.nombre}</span><h2 class="grabado t-h2" style="font-size:clamp(26px,2.6vw,36px)">${p.titulo}</h2><p class="lema">${p.para}</p></div>
      <figure class="hundida" style="margin:0"><blockquote style="margin:0; font: 500 18px/1.4 var(--fuente-titulo); letter-spacing:-.01em">${p.voz}</blockquote>
        <figcaption class="apoyo" style="margin-top:6px">Así lo cuenta la gente en foros. Lo usamos para entenderte, no como testimonio.</figcaption></figure>
    </div>
    <div class="rejilla dos">
      <div class="panel"><span class="etiqueta">Por qué te cuesta</span><ul class="lista" style="margin-top:12px">${p.porQue.map((x) => `<li>${pendiente(x)}</li>`).join('')}</ul></div>
      <div class="panel"><span class="etiqueta">Cómo lo trabajamos</span><ul class="lista check" style="margin-top:12px">${p.como.map((x) => `<li>${pendiente(x)}</li>`).join('')}</ul></div>
      <div class="panel"><span class="etiqueta">Qué vas a necesitar</span><ul class="lista" style="margin-top:12px">${p.necesitas.map((x) => `<li>${x}</li>`).join('')}</ul>
        <p class="apoyo" style="margin-top:12px">Tu lista exacta te llega el mismo día del estudio.</p></div>
      <div class="panel"><span class="etiqueta">Precio</span><p style="margin:10px 0 14px">${pendiente(TARIFAS[p.tarifa].texto)}. Solo si firmas.</p><div class="calc-perfil"></div></div>
    </div>
    <div class="panel" style="margin-top:16px; display:flex; flex-wrap:wrap; gap:16px; align-items:center; justify-content:space-between">
      <div><h3>¿Es tu caso?</h3><p class="apoyo">Unos minutos de formulario y te damos una orientación al momento.</p></div>
      <a class="btn primario grande" href="#/estudio/${p.id}">Pide tu estudio de viabilidad</a>
    </div>
  </section>`;
}

// =====================================================================
// CÓMO TRABAJAMOS
// =====================================================================
export function comoTrabajamos(v) {
  v.innerHTML = `
  <div class="envoltura">
    <header class="cabecera-pagina"><span class="etiqueta">Proceso</span><h1 class="grabado t-titulo">Cómo trabajamos</h1>
      <p class="lema">Sabes en todo momento en qué punto está tu caso, qué falta y qué viene después.</p></header>
    <div class="rejilla dos" style="margin-top:16px">
      <div>
        <p class="etiqueta" style="margin-bottom:10px">¿En qué punto estás?</p>
        <div id="punto-sel"></div>
        <p class="lema" id="punto-txt" style="margin-top:14px"></p>
        <div class="panel" style="margin-top:20px"><div class="pasos" id="pasos">${PASOS.map(([t, d], i) => `
          <div class="paso" data-i="${i}"><span class="num">${i + 1}</span><h3>${t}<span class="estado ok aqui">Empiezas aquí</span></h3><p>${d}</p></div>`).join('')}</div></div>
      </div>
      <div class="rejilla" style="align-content:start">
        <div class="panel"><span class="etiqueta">Plazos</span><p class="grabado t-h2" style="margin:8px 0">4–8 semanas</p>
          <p class="apoyo">Plazo orientativo. La FEIN llega por ley al menos 10 días naturales antes de la firma. Nunca prometemos plazos del banco.</p></div>
        <div class="panel"><span class="etiqueta">Lo que te comprometemos</span>
          <div style="display:grid; gap:12px; margin-top:12px">${COMPROMISOS.map(([t, d]) => `<div><b style="font-weight:600">${t}</b><p class="apoyo">${d}</p></div>`).join('')}</div></div>
      </div>
    </div>
    ${cta()}
  </div>`;
  const marcar = (i) => {
    const [, paso, txt] = PUNTOS[i];
    $$('.paso', v).forEach((el) => { const n = +el.dataset.i; el.classList.toggle('actual', n === paso); el.classList.toggle('hecho', n < paso); });
    $('#punto-txt', v).textContent = txt;
  };
  segmentado($('#punto-sel', v), PUNTOS.map(([t], i) => ({ id: String(i), txt: t })), '0', (i) => marcar(+i), 'En qué punto estás');
  marcar(0);
}

// =====================================================================
// PRECIO
// =====================================================================
export function precio(v) {
  v.innerHTML = `
  <div class="envoltura">
    <header class="cabecera-pagina"><span class="etiqueta">Precio publicado</span><h1 class="grabado t-titulo">Lo que pagas, antes de empezar</h1>
      <p class="lema">Un porcentaje con mínimo y máximo, en notaría y solo si firmas con una oferta que te hayamos presentado.</p></header>
    <div class="panel" id="calc" style="margin-top:16px"></div>
    <section class="seccion">
      <div class="seccion-cab"><span class="etiqueta">Tarifas</span><h2 class="grabado t-h2">Por tipo de caso</h2></div>
      <div class="panel tabla-env"><table>
        <thead><tr><th>Caso</th><th>Tarifa</th><th>Por qué</th></tr></thead>
        <tbody>
          <tr><td><b>General</b><br><span class="apoyo">Autónomos, extranjeros, mayores de 50, denegada</span></td><td>${TARIFAS.general.texto}</td><td>Perfiles complejos, donde más trabajo hay.</td></tr>
          <tr><td><b>Aval ICO</b></td><td>${TARIFAS.ico.texto}</td><td>El perfil más sensible al precio.</td></tr>
          <tr><td><b>Mejorar hipoteca</b></td><td>${TARIFAS.mejorar.texto}</td><td>Solo lo aceptamos si el ahorro neto supera claramente el honorario.</td></tr>
          <tr><td><b>Revisión de FEIN</b></td><td>${pendiente(TARIFAS.fein.texto)}</td><td>Una segunda lectura cerrada antes de notaría.</td></tr>
        </tbody></table></div>
    </section>
    <section class="seccion">
      <div class="rejilla dos">
        <div class="panel"><span class="etiqueta">La comisión del banco</span><h3 style="margin-top:10px">Te decimos lo que paga cada banco</h3>
          <p>Algunas entidades pagan una comisión al intermediario. Te la informamos por escrito, banco por banco, antes de que elijas oferta.</p>
          <p class="apoyo">${pendiente('[Decisión pendiente: si se descuenta o no del honorario].')}</p></div>
        <div class="panel"><span class="etiqueta">Cuándo pagas</span><h3 style="margin-top:10px">El día de la firma, en notaría</h3>
          <p>Nada por adelantado. Si no firmas, no pagas. Si encuentras una oferta por tu cuenta y firmas con ella, tampoco.</p></div>
      </div>
    </section>
    ${cta()}
  </div>`;
  calculadora($('#calc', v), 'general');
}

// Calculadora de honorario reutilizable (inicio, precio y cada perfil)
function calculadora(el, clave = 'general', mini = false) {
  if (!el) return;
  if (TARIFAS[clave].fijo) { el.innerHTML = `<div class="hundida"><span class="etiqueta">Honorario</span><p class="calc-cifra" style="margin-top:6px">${euros(TARIFAS[clave].fijo)}</p></div>`; return; }
  const base = TARIFAS[clave].base || 'hipoteca';
  const ini = clave === 'mejorar' ? 120000 : 180000;
  el.innerHTML = `
    <div class="calc">
      <div style="display:grid; gap:12px">
        ${mini ? '' : `<span class="etiqueta">Calculadora</span><h2 class="grabado t-h2">¿Cuánto vas a pedir de ${base}?</h2>`}
        <label class="campo"><span class="${mini ? '' : 'sr'}">${clave === 'mejorar' ? 'Capital pendiente' : 'Importe del préstamo'}</span>
          <input type="range" min="50000" max="500000" step="5000" value="${ini}" aria-label="Importe"></label>
        <div style="display:flex; justify-content:space-between" class="apoyo"><span>Importe</span><b class="importe" style="color:var(--tinta)">${euros(ini)}</b></div>
      </div>
      <div class="hundida"><span class="etiqueta">Nuestro honorario</span><p class="calc-cifra" style="margin:6px 0 4px">${euros(honorario(ini, clave).valor)}</p><p class="apoyo limite">&nbsp;</p></div>
    </div>
    ${mini ? '' : '<p class="apoyo" style="margin-top:12px">El importe medio de una hipoteca sobre vivienda fue de 180.785 € en julio de 2026 (INE).</p>'}`;
  const r = $('input', el), cifra = $('.calc-cifra', el), imp = $('.importe', el), lim = $('.limite', el);
  cifra.dataset.v = honorario(ini, clave).valor;
  r.addEventListener('input', () => {
    const n = +r.value, h = honorario(n, clave);
    imp.textContent = euros(n); contar(cifra, h.valor);
    lim.innerHTML = h.limite ? `Se aplica el ${h.limite} de la tarifa.` : `${String(TARIFAS[clave].pct).replace('.', ',')} % de ${euros(n)}`;
  });
}

// =====================================================================
// NOSOTROS
// =====================================================================
export function nosotros(v) {
  v.innerHTML = `
  <div class="envoltura">
    <header class="cabecera-pagina"><span class="etiqueta">Quiénes somos</span><h1 class="grabado t-titulo">Dos personas, un responsable por caso</h1>
      <p class="lema">Empezamos ahora, con pocos clientes. Por eso te atendemos nosotros, con nombre y cara, de principio a fin.</p></header>
    <div class="rejilla dos" style="margin-top:16px">${EQUIPO.map((p) => `
      <article class="panel" style="display:grid; gap:12px">
        <div style="display:flex; gap:14px; align-items:center">
          <span class="btn" style="width:64px; height:64px; padding:0; font:600 20px var(--fuente-titulo); pointer-events:none">${p.iniciales}</span>
          <div><h3 style="margin:0">${p.nombre}</h3><p class="apoyo">${pendiente(p.rol)}</p></div>
        </div>
        <p>${pendiente(p.texto)}</p>
        <p class="apoyo">${pendiente('[Foto y vídeo de presentación]')}</p>
      </article>`).join('')}
    </div>
    <section class="seccion">
      <div class="rejilla dos">
        <div class="seccion-cab"><span class="etiqueta">Por qué existe ${pendiente(MARCA.nombre)}</span><h2 class="grabado t-h2">El «no» del banco muchas veces depende de cómo llega el expediente y a qué banco va.</h2>
          <p class="lema">Nos formamos como Asesores en Crédito Hipotecario y nos inscribimos en el Banco de España para hacer ese trabajo bien: preparar tu caso y presentarlo donde encaja.</p></div>
        <div class="panel">${confianza()}</div>
      </div>
    </section>
    ${cta()}
  </div>`;
}

function confianza() {
  return `<span class="etiqueta">Verificable</span>
    <div style="display:grid; gap:14px; margin-top:14px">
      <div class="doc"><div><b>Registro de intermediarios del Banco de España</b><br><small>${pendiente(MARCA.registro)}</small></div><a class="btn chico" href="${MARCA.enlaceRegistro}" target="_blank" rel="noopener">Comprobar</a></div>
      <div class="doc"><div><b>Seguro de responsabilidad civil profesional</b><br><small>${pendiente(MARCA.polizaRC)}</small></div><span class="estado neutro">Mín. 460.000 €</span></div>
      <div class="doc"><div><b>Formación reconocida</b><br><small>Asesor Financiero en Crédito Hipotecario (UPV)</small></div><span class="estado ok">BdE</span></div>
      <div class="doc"><div><b>Información precontractual</b><br><small>Identidad, registro y remuneración, por escrito</small></div><a class="btn chico" href="#/legal">Descargar</a></div>
    </div>`;
}

// =====================================================================
// LEGAL
// =====================================================================
export function legal(v) {
  const bloques = [
    ['Aviso legal', `${MARCA.empresa} · ${MARCA.cif} · ${MARCA.domicilio}. Intermediario de crédito inmobiliario inscrito en el Banco de España con el número ${MARCA.registro}.`],
    ['Información precontractual (art. 35 Ley 5/2019)', '[PDF descargable preparado con el abogado: identidad, registro, cómo comprobarlo, remuneración y comisiones de las entidades].'],
    ['Política de privacidad', '[Responsable, finalidades, base legal, envío de datos a entidades con consentimiento, plazos de conservación, derechos].'],
    ['Política de cookies', '[Actualizar si se añade analítica o el píxel de Meta].'],
    ['Atención al cliente y reclamaciones', '[Procedimiento de reclamaciones y plazos de respuesta].'],
    ['Seguro de responsabilidad civil', MARCA.polizaRC],
  ];
  v.innerHTML = `
  <div class="envoltura">
    <header class="cabecera-pagina"><span class="etiqueta">Legal</span><h1 class="grabado t-titulo">Información legal</h1>
      <div class="banda">Pendiente de redactar con el abogado. No se publica nada de esta página sin revisión.</div></header>
    <div class="rejilla dos" style="margin-top:16px">${bloques.map(([t, d]) => `<div class="panel"><h3>${t}</h3><p class="apoyo">${pendiente(d)}</p></div>`).join('')}</div>
  </div>`;
}

// =====================================================================
// PIEZAS COMUNES
// =====================================================================
function cta() {
  return `<section class="seccion"><div class="panel revelar" style="display:grid; gap:16px; justify-items:center; text-align:center; padding:48px 24px">
    <span class="etiqueta">Sin compromiso</span>
    <h2 class="grabado t-titulo">¿Tu caso tiene salida?</h2>
    <p class="lema">Pide el estudio de viabilidad. Te damos una orientación al momento y te respondemos en ${MARCA.respuestaHoras} h laborables.</p>
    <a class="btn primario grande" href="#/estudio">Pide tu estudio de viabilidad</a>
    ${aviso}</div></section>`;
}

export function pie() {
  return `
  <div class="pie-rejilla">
    <div><b style="font:600 17px var(--fuente-titulo)">${pendiente(MARCA.nombre)}</b><p style="margin-top:6px">Intermediación hipotecaria para casos que se salen del patrón del banco.</p></div>
    <div><h4>Servicios</h4><ul>${PERFILES.map((p) => `<li><a href="#/servicios/${p.id}">${p.nombre}</a></li>`).join('')}</ul></div>
    <div><h4>Empresa</h4><ul><li><a href="#/como-trabajamos">Cómo trabajamos</a></li><li><a href="#/precio">Precio</a></li><li><a href="#/nosotros">Nosotros</a></li><li><a href="#/legal">Legal y privacidad</a></li></ul></div>
    <div><h4>Interno (prototipo)</h4><ul><li><a href="#/mapa">Mapa del proyecto</a></li><li><a href="#/area">Área cliente (demo)</a></li><li><a href="#/panel">Panel interno (demo)</a></li></ul></div>
  </div>
  <p class="legal">${pendiente(`${MARCA.empresa} · ${MARCA.cif} · Intermediario de crédito inmobiliario inscrito en el Banco de España nº ${MARCA.registro} · Seguro de RC: ${MARCA.polizaRC}`)}<br>
  Los datos de mercado se citan con fuente y fecha. La decisión de conceder una hipoteca corresponde siempre a la entidad financiera.</p>`;
}

export function noEncontrada(v) {
  v.innerHTML = `<div class="envoltura"><header class="cabecera-pagina"><h1 class="grabado t-titulo">Esta página no existe</h1><a class="btn" href="#/">Volver al inicio</a></header></div>`;
}
