# Sistema de diseño de Condado Digital (2026)

Guía interna (no se publica: está fuera de `public/`). Referencia visual: `contenido/maqueta-inicio-condado-digital.html` y el inicio publicado. Todo lo de aquí ya existe como variables o clases en `public/styles.css`.

## 1. Colores y su uso

| Color | Variable CSS | Uso |
|---|---|---|
| Crema `#F7F5EF` | `--bg` | Fondo general de todas las páginas. |
| Negro `#0B1512` | `--negro-cabecera` | Header (translúcido, con desenfoque) y footer. |
| Negro `#05070A` | `--negro-banda` | Bandas destacadas: calculadora del inicio, franja final y bandas de invitación a asesorías. |
| Verde `#1E6B47` | `--primary` | Botones principales **sobre fondo claro** y enlaces del texto. |
| Lima `#C8F169` | `--accent` | Botones y detalles **sobre fondo oscuro** (botón Contacto, veredicto positivo, foco del teclado). Nunca como texto sobre crema o blanco: no tiene contraste. |
| Azul `#1D4ED8` | `--azul` | Etiquetas de sección («PARA TI», «ASESORÍAS»), datos y acentos. |
| Azul `#3B82F6` | `--azul-2` | Acentos y gráficos sobre fondo oscuro. |
| Turquesa `#0F766E` | `--turquesa` | **Solo** íconos y gráficos. No usar en texto ni botones. |
| Turquesa `#2DD4BF` | `--turquesa-2` | Íconos y degradados sobre fondo oscuro. |
| Azul noche `#13294A` | `--azul-noche` | Fondo de íconos y miniaturas. |
| Texto suave `#55635B` | `--texto-suave` | Bajadas y descripciones sobre fondo claro. |
| Borde `#E4E0D5` | `--borde-tarjeta` | Borde de tarjetas. |

- **Degradado de marca** (`--degradado`): lima → turquesa → azul. Se usa en la barra de progreso del header y en palabras destacadas sobre fondo negro (clase `.ini-grad`).
- **Rojo de alerta** `#F87171`: veredicto «pierde plata» y el tachado de la franja final.
- **Contraste**: todo texto debe cumplir WCAG AA (4,5:1; 3:1 en títulos grandes). Sobre negro, el texto secundario va en `#B8C2CC` o `#8B96A3`, nunca más oscuro.

## 2. Tipografías y tamaños

Alojadas en `public/fonts/` (sin Google Fonts):

- **Fraunces** (títulos), con su versión itálica para destacar palabras («*marketing digital*»).
- **DM Sans** (texto, botones y formularios).

| Elemento | Tamaño |
|---|---|
| H1 del inicio | `clamp(44px, 7vw, 92px)`, interlineado 1,02 |
| H2 de sección | `clamp(34px, 4.4vw, 54px)`, interlineado 1,08 (`.ini-h2`) |
| H2 de bandas negras | `clamp(40px, 6vw, 76px)` a `clamp(44px, 7vw, 96px)` |
| Título de tarjeta | 23–24 px, Fraunces 700 |
| Bajada de sección | 19 px, interlineado 1,65, color `--texto-suave` |
| Cuerpo en páginas de lectura | 17–19 px, 60–75 caracteres por línea |
| Etiqueta de sección | 13 px, 700, mayúsculas, espaciado 2 px, azul (`.ini-etiqueta`) |

## 3. Componentes

- **Etiqueta de sección** (`.ini-etiqueta`): sobre el H2, en azul y mayúsculas.
- **Tarjetas** (`.ini-tarjeta`): fondo blanco, borde 1,5 px `--borde-tarjeta`, radio 22 px y padding 26–28 px. Llevan un ícono en un cuadrado de 52 px con radio 15 px (`.ini-ico`). Al pasar el mouse, la tarjeta sube 8 px, gana sombra y el borde se pone verde; el ícono gira y se vuelve lima. Las de servicios llevan además un borde superior de 5 px del color del servicio.
- **Botones**:
  - **Principal sobre claro:** verde, texto blanco y radio 14 px (`.ini-btn-verde`).
  - **Principal sobre oscuro:** lima, texto negro y forma de píldora (`.ini-btn-lima`, `.btn-contacto`).
  - **Secundario sobre oscuro:** borde crema translúcido (`.ini-btn-borde`).
  - Todos miden al menos 44 px de alto y muestran un foco visible con contorno lima de 3 px.
- **Bandas oscuras** (`.ini-calc`, `.ini-final`): fondo `#05070A`, con un halo radial de azul, turquesa o lima y padding vertical de 120–130 px.
- **Bandas claras** (`.ini-franja`, `.ini-autor`): degradados suaves (lima → menta → celeste o celeste → verde claro) con textura de puntos.
- **Header** (`.sitio-cabecera`):
  - Fijo arriba, en negro al 94 % con desenfoque y la barra de progreso en degradado en su borde inferior.
  - Menú: Enciclopedia, Glosario, Calculadoras, Aprendizaje y Asesorías, más el botón Contacto.
  - En móvil, con JavaScript, el menú se despliega con un botón; sin JavaScript queda visible como una fila deslizable.
- **Footer**: mantiene sus 4 columnas, las 7 redes y la línea final, con colores del header.
- **Formulario emergente** (`.dialogo-contacto`):
  - Es un `<dialog>` nativo que se crea con JavaScript desde cualquier enlace `.abrir-contacto`. Sin JavaScript, el enlace lleva a `/contacto`.
  - Se cierra con Escape, con la ×, con un clic en el fondo o con «Cerrar»; al cerrarse, devuelve el foco.
  - Envía a Formspree con `formulario=asesoria` y mide `formulario_iniciado` y `generate_lead`.

## 4. Movimiento

Regla general: **mucho en el inicio, poco en las páginas de lectura y moderado en calculadoras y contacto.**

- Toda animación va dentro de `@media (prefers-reduced-motion: no-preference)`. Si la persona pidió reducir el movimiento, no se anima nada.
- Las animaciones ligadas al scroll van, además, dentro de `@supports (animation-timeline: view())`. En navegadores sin soporte todo se ve normal y quieto.
- **Inicio**: íconos flotando, entrada de tarjetas por los lados, palabras que se enfocan, videos que avanzan de lado y botón final con brillo.
- **Páginas de lectura** (Enciclopedia, glosario, legales, FAQ): sin animaciones de scroll en el texto. Como máximo, una aparición suave de las tarjetas.
- **Calculadoras y contacto**: transiciones de color y de ancho en resultados y barras, y hover en tarjetas. Sin parallax.
- El contenido debe verse completo aunque falle el JavaScript, y nada debe moverse de lugar al cargar (CLS 0).
