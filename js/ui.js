// Piezas pequeñas que usan todas las páginas.

export const $ = (s, el = document) => el.querySelector(s);
export const $$ = (s, el = document) => [...el.querySelectorAll(s)];

export const euros = (n) => new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0, useGrouping: 'always' }).format(n) + ' €';

// Resalta los datos pendientes: «[Nº de registro]» → marcador amarillo
export const pendiente = (txt) => String(txt).replace(/\[([^\]]+)\]/g, '<span class="marcador-pendiente">[$1]</span>');

// Color de un perfil → variables CSS
export const punto = (color) => `--punto: var(--p-${color}-f)`;

// El indicador (pastilla) que se desliza bajo la opción activa de un control segmentado
export function indicador(cont) {
  if (!cont) return;
  let ind = cont.querySelector(':scope > .indicador');
  if (!ind) { ind = document.createElement('span'); ind.className = 'indicador'; cont.prepend(ind); }
  const act = cont.querySelector(':scope > .activo');
  if (!act) { ind.style.width = '0'; ind.style.opacity = '0'; return; }
  ind.style.opacity = '1';
  ind.style.width = act.offsetWidth + 'px';
  ind.style.transform = `translateX(${act.offsetLeft}px)`;
  if (act.scrollIntoView && cont.scrollWidth > cont.clientWidth) act.scrollIntoView({ block: 'nearest', inline: 'center' });
}

// Control segmentado reutilizable: opciones [{id, txt, color?}] → al cambiar llama a fn(id)
export function segmentado(cont, opciones, activo, fn, etiqueta = 'Opciones') {
  cont.classList.add('segmentado');
  cont.setAttribute('role', 'tablist');
  cont.setAttribute('aria-label', etiqueta);
  cont.innerHTML = opciones.map((o) => `<button role="tab" type="button" data-id="${o.id}" aria-selected="${o.id === activo}" class="${o.id === activo ? 'activo' : ''}">${o.color ? `<i class="punto" style="${punto(o.color)}"></i>` : ''}${o.txt}</button>`).join('');
  cont.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', cont).forEach((x) => { x.classList.toggle('activo', x === b); x.setAttribute('aria-selected', x === b); });
    indicador(cont); fn(b.dataset.id);
  });
  requestAnimationFrame(() => indicador(cont));
}

// Aparecer al entrar en pantalla (nunca deja nada oculto si falla)
let obs;
export function revelar(raiz) {
  const els = $$('.revelar', raiz);
  if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('visible')); return; }
  obs ??= new IntersectionObserver((ents) => ents.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('visible'); $$('.marcador', en.target).forEach((m) => m.classList.add('visible')); obs.unobserve(en.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach((e) => obs.observe(e));
  setTimeout(() => els.forEach((e) => e.classList.add('visible')), 2500);
}

// Número que cuenta hasta su valor
export function contar(el, hasta, fmt = euros) {
  const desde = Number(el.dataset.v || 0); el.dataset.v = hasta;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = fmt(hasta); return; }
  const t0 = performance.now(), dur = 400;
  const paso = (t) => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = fmt(Math.round(desde + (hasta - desde) * e)); if (k < 1) requestAnimationFrame(paso); };
  requestAnimationFrame(paso);
}

// Iconos (trazo fino, como SYNCO)
const P = {
  inicio: '<path d="M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1z"/>',
  servicios: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
  pasos: '<path d="M5 6h14M5 12h10M5 18h6"/>',
  precio: '<circle cx="12" cy="12" r="8"/><path d="M14.5 9.2A3.3 3.3 0 0012.3 8.5c-1.6 0-2.8.9-2.8 2.1 0 2.8 5.6 1.4 5.6 4.3 0 1.2-1.3 2.1-2.9 2.1a3.6 3.6 0 01-2.7-1M12 7v1.5M12 17v1.5"/>',
  nosotros: '<circle cx="9" cy="9" r="3.2"/><circle cx="16.5" cy="10" r="2.6"/><path d="M3.5 19c.8-3 3-4.5 5.5-4.5s4.7 1.5 5.5 4.5M14.5 15c2.6-.4 4.6.9 5.5 3.5"/>',
  flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
};
export const ico = (n, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
