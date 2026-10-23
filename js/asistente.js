// Asistente: versión guionizada (sin IA) para ver cómo se comporta.
// Orden de decisión: pedir persona → urgencia → pregunta que no puede contestar → respuesta conocida → derivar.
// Más adelante, esta misma lógica pasa a ser el «filtro» alrededor de un modelo de lenguaje.
import { ASISTENTE as A, MARCA } from './datos.js';
import { $, pendiente } from './ui.js';

const norm = (t) => t.toLowerCase();
const tiene = (t, lista) => lista.some((k) => t.includes(k));

export function iniciarAsistente() {
  const caja = $('#asis'), boton = $('#asis-boton'), msgs = $('#asis-msgs');
  let iniciado = false;

  const decir = (html, quien = 'bot') => {
    const m = document.createElement('div'); m.className = `msg ${quien}`; m.innerHTML = html; msgs.append(m); msgs.scrollTop = msgs.scrollHeight;
  };
  const sugerir = (lista) => { $('#asis-sug').innerHTML = lista.map((s) => `<button type="button" class="chip sin-punto">${s}</button>`).join(''); };
  const contacto = () => decir(`<div class="acciones"><button class="btn chico" disabled>Que me llamen ${pendiente('[Cal.com]')}</button><button class="btn chico" disabled>WhatsApp ${pendiente(MARCA.whatsapp)}</button></div>`);

  function responder(texto) {
    decir(texto.replace(/</g, '&lt;'), 'yo');
    const t = norm(texto);
    setTimeout(() => {
      if (tiene(t, A.persona)) { decir('Claro. Una persona del equipo te responde en ' + MARCA.respuestaHoras + ' h laborables como máximo:'); contacto(); decir('Caso pasado al equipo', 'sistema'); return; }
      if (tiene(t, A.urgente)) { decir(A.urgenteTexto); contacto(); decir('Marcado como urgente para el equipo', 'sistema'); return; }
      if (tiene(t, A.prohibido)) { decir(A.prohibidoTexto + ' <a href="#/estudio">Ir al estudio</a>'); return; }
      const r = A.respuestas.find(([claves]) => tiene(t, claves));
      if (r) { decir(pendiente(r[1])); sugerir(A.sugerencias.filter((s) => !norm(s).includes(t.slice(0, 6)))); return; }
      decir(A.noSe); contacto();
    }, 380);
  }

  function abrir() {
    caja.hidden = false; boton.hidden = true; boton.setAttribute('aria-expanded', 'true');
    if (!iniciado) { iniciado = true; decir(pendiente(A.saludo)); sugerir(A.sugerencias); }
    $('#asis-texto').focus();
  }
  function cerrar() { caja.hidden = true; boton.hidden = false; boton.setAttribute('aria-expanded', 'false'); boton.focus(); }

  boton.addEventListener('click', abrir);
  $('#asis-cerrar').addEventListener('click', cerrar);
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !caja.hidden) cerrar(); });
  $('#asis-sug').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) responder(b.textContent); });
  $('#asis-form').addEventListener('submit', (e) => { e.preventDefault(); const i = $('#asis-texto'); if (i.value.trim()) { responder(i.value.trim()); i.value = ''; } });
  // Los enlaces del chat navegan sin cerrar en ordenador; en móvil se cierra para ver la página
  msgs.addEventListener('click', (e) => { if (e.target.closest('a') && innerWidth < 560) cerrar(); });
}
