# Web de intermediación hipotecaria · prototipo

Prototipo para **organizar** la web del proyecto (antes «Segunda Lectura»): qué páginas hay, qué servicios se ofrecen, cómo se conecta el embudo y cómo habla el cliente con nosotros. Usa el mismo sistema visual que **SYNCO** (repo `SportTracker`), sin avatar ni rueda.

HTML + CSS + JavaScript puro, sin dependencias ni compilación. Se abre sirviendo la carpeta:

```bash
python3 -m http.server 8000   # y abrir http://localhost:8000
```

## Dónde se cambia cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Nombre, registro, póliza, email, equipo | `js/datos.js` → `MARCA`, `EQUIPO` |
| Textos de cada perfil | `js/datos.js` → `PERFILES` |
| Tarifas y calculadora | `js/datos.js` → `TARIFAS` |
| Umbrales del estudio de viabilidad | `js/datos.js` → `UMBRALES` |
| Respuestas del asistente | `js/datos.js` → `ASISTENTE` |
| Colores, sombras, tipografías | `css/tokens.css` |
| Componentes (botones, paneles…) | `css/estilos.css` |

Todo lo que va entre `[corchetes]` es un dato pendiente y se ve resaltado en amarillo.

## Páginas

| Dirección | Qué es |
|---|---|
| `#/` | Inicio: escena del expediente, perfiles, simulador vs banco, proceso, calculadora, confianza, preguntas |
| `#/servicios/<perfil>` | Los 7 servicios (aval ICO, autónomos, extranjeros, mayores de 50, mejorar, revisar FEIN, denegada) |
| `#/como-trabajamos` | 5 pasos con «¿En qué punto estás?» y compromisos |
| `#/precio` | Calculadora, tarifas por caso y comisión del banco |
| `#/nosotros` | Equipo y pruebas verificables |
| `#/estudio` | Formulario por pasos con resultado orientativo (no envía datos) |
| `#/area` | Área cliente (demo con datos ficticios) |
| `#/panel` | Panel interno (demo) |
| `#/mapa` | Mapa del proyecto: cómo se conecta todo (interno) |
| `#/legal` | Textos legales pendientes del abogado |

## Archivos

```
index.html        Esqueleto: navegación, asistente
css/tokens.css    Diseño central (heredado de SYNCO)
css/estilos.css   Componentes
js/datos.js       TODO el contenido
js/app.js         Arranque y navegación
js/ui.js          Utilidades (control segmentado, revelar, iconos)
js/paginas.js     Páginas públicas
js/estudio.js     Estudio de viabilidad
js/privado.js     Área cliente, panel y mapa
js/asistente.js   Asistente guionizado
fonts/            Bricolage Grotesque (SIL OFL)
```

## Estado

Prelanzamiento: `noindex`, formulario sin envío, área cliente y panel con datos ficticios. No se publica ni se capta a nadie antes del número de registro.
