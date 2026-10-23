// Arranque y navegación. Cada dirección (#/precio, #/servicios/autonomos…) pinta una página.
import { MARCA } from './datos.js';
import { $, $$, indicador, revelar, ico, pendiente } from './ui.js';
import * as pub from './paginas.js';
import { estudio } from './estudio.js';
import { area, panel, mapa } from './privado.js';
import { iniciarAsistente } from './asistente.js';

// Secciones principales (cápsula de arriba y barra de abajo en móvil)
const SECCIONES = [
  ['', 'Inicio', 'inicio'],
  ['servicios', 'Servicios', 'servicios'],
  ['como-trabajamos', 'Cómo trabajamos', 'pasos'],
  ['precio', 'Precio', 'precio'],
  ['nosotros', 'Nosotros', 'nosotros'],
];

const RUTAS = {
  '': pub.inicio,
  servicios: pub.servicios,
  'como-trabajamos': pub.comoTrabajamos,
  precio: pub.precio,
  nosotros: pub.nosotros,
  legal: pub.legal,
  estudio,
  area,
  panel,
  mapa,
};

function pintarNav() {
  $('#secciones').innerHTML = SECCIONES.map(([r, t]) => `<a href="#/${r}" data-r="${r}">${t}</a>`).join('');
  $('#barra').innerHTML = SECCIONES.map(([r, t, i]) => `<a href="#/${r}" data-r="${r}"><span class="pastilla">${ico(i)}</span>${t === 'Cómo trabajamos' ? 'Proceso' : t}</a>`).join('');
  $$('[data-marca="nombre"]').forEach((e) => (e.innerHTML = pendiente(MARCA.nombre)));
  $('#pie').innerHTML = pub.pie();
}

function ir() {
  const [base = '', ...resto] = location.hash.replace(/^#\/?/, '').split('/');
  const pagina = RUTAS[base] || pub.noEncontrada;
  const vista = $('#vista');
  vista.classList.remove('entrando'); void vista.offsetWidth; vista.classList.add('entrando');
  vista.innerHTML = '';
  pagina(vista, resto);
  // Marca la sección activa
  const activa = SECCIONES.some(([r]) => r === base) ? base : null;
  $$('#secciones a, #barra a').forEach((a) => a.classList.toggle('activo', a.dataset.r === activa));
  indicador($('#secciones'));
  revelar(vista);
  scrollTo({ top: 0, behavior: 'instant' });
  document.title = `${(vista.querySelector('h1')?.textContent || 'Inicio').trim()} · ${MARCA.nombre}`;
}

pintarNav();
addEventListener('hashchange', ir);
addEventListener('resize', () => { indicador($('#secciones')); $$('.vista .segmentado').forEach(indicador); });
document.fonts?.ready.then(() => indicador($('#secciones')));
ir();
iniciarAsistente();
