# El cielo en los mitos y el arte

Exposición digital de Julián Cavallo para Introducción a la Programación Web (UAI, 2026).
Presenta seis relatos y doce obras sobre el Sol, la Luna y los eclipses en seis páginas.

## Ejecutar

Abrir `index.html` directamente o usar Live Server en VS Code. Las hojas CSS listas
para publicar están incluidas. La tipografía principal es Tinos (WOFF2 local, licencia OFL), con
alternativas del sistema; los controles mantienen una tipografía sans serif.
El contenido es HTML estático. JavaScript agrega el visor de obras, el menú para
móviles, el cambio entre tema claro y oscuro, el botón para volver arriba, el esquema
de alineación de eclipses y la corrección del cuestionario.

## Estructura

- `index.html`: portada, introducción, actividad y fuentes.
- `pages/sol.html`, `pages/luna.html`, `pages/eclipses.html`: relatos y galerías de cada tema.
- `pages/glosario.html`: conceptos usados en la exposición.
- `pages/culturas.html`: representaciones culturales del Sol, la Luna, la noche y los eclipses.
- `assets/css/styles.css`: paleta, navegación, pie de página y reglas base.
- `assets/css/cielo.css`: diseño y adaptación a pantallas móviles.
- `assets/css/fonts.css`: tipografía Tinos; binarios y licencia en `assets/fonts/`.
- `assets/css/site.min.css`: estilos combinados y minificados que cargan las páginas.
- `scripts/build-css.cjs`: generación reproducible del CSS publicado.
- `docs/validation/`: resultados W3C y comprobación de enlaces externos.
- `assets/js/app.js`: interacciones del menú, tema, galerías, eclipses y cuestionario.
- `assets/images/obras-cielo/`: doce imágenes optimizadas en WebP.
- `assets/images/ilustraciones/`: ilustraciones grabadas del proyecto.

Las obras tienen texto alternativo, procedencia y crédito. Las galerías enlazan a los
archivos en tamaño completo sin JavaScript y abren las obras en un diálogo si está activo.

GitHub Pages publica el sitio al actualizar la rama indicada en
`.github/workflows/static.yml`.

## Actualizar estilos

Editar `assets/css/styles.css` y `assets/css/cielo.css`. Las páginas cargan directamente
estas hojas de estilo para que sean fáciles de leer y mantener.
La paleta utiliza fondos marfil, texto oscuro y acentos terracota. El visor ampliado
conserva un fondo oscuro para observar las obras.

## Revisión de considerandos

Se resolvieron los cinco pendientes técnicos de la revisión anterior. La evidencia
está en [resultados W3C](docs/validation/w3c-results.json) y
[enlaces externos](docs/validation/external-links.json).

| Puntos del PDF | Estado y evidencia |
| --- | --- |
| 1.19 / 1.26: imágenes | Eclipse convertido de PNG de 2.988.442 bytes a WebP de 121.146 bytes, 800 × 800 px. Todas las imágenes del sitio pesan menos de 200.000 bytes. |
| 1.3 / 1.18 / 5.17: enlaces | Archivos y anclas locales comprobados. Las 33 URLs externas se verificaron: 16 por respuesta HTTP 200 y 17 mediante lectura de sus páginas oficiales en la herramienta de navegación web. Los HTTP 403/429 del cliente directo eran bloqueos o límites, no evidencia de enlaces rotos. |
| 2.13: HTML W3C | Las seis páginas pasan Nu Html Checker: cero errores y cero advertencias. Se retiraron barras innecesarias de elementos vacíos y se agregó un título inicial a los diálogos. |
| 3.5: fuentes | Tinos importada mediante @font-face, cuatro variantes WOFF2 alojadas localmente, font-display: swap y alternativas del sistema. Incluye licencia OFL y procedencia. |
| 3.14: CSS W3C | fonts.css, styles.css, cielo.css y site.min.css válidos con cero errores usando el perfil CSS3+SVG. Ese perfil contempla fill, stroke y text-anchor del diagrama. |
| 3.17: depuración | Eliminados hero-index, route-number, selectores que ya no coincidían con los títulos y declaraciones redundantes; consolidadas reglas de story-section y directory. Se conservan las reglas de estados interactivos y media queries. |
| 3.18: minificación | Las páginas cargan site.min.css: 14.859 bytes. Generación con CSS Tree 3.2.1 fijado en package-lock.json y comprobación automática antes de publicar. |

### Validación funcional y accesibilidad

- Seis páginas y 16 secciones; se supera el mínimo de diez secciones o páginas (1.11).
- Un h1 por página, subtítulos ordenados, main, header, nav, footer, metadatos,
  favicon, descripciones de imágenes, etiquetas de formulario y fuentes presentes.
- Pruebas de Chrome y Edge en tema claro y oscuro: sin errores de JavaScript,
  recursos locales faltantes ni desbordamiento horizontal a 320, 390, 768 y 1440 px.
- Fuente Tinos cargada correctamente; imagen optimizada revisada en pantalla.
- Menú móvil y Escape, galerías con teclado y retorno del foco, cuestionario y
  reinicio, modos de eclipses, persistencia del tema y contenido sin JavaScript.
- Tema oscuro aplicado en las seis páginas aun bloqueando app.js, antes de
  inicializar el botón. Manejo de almacenamiento inaccesible verificado.
- Axe sin infracciones en las reglas WCAG 2 A/AA y 2.1 AA probadas en ambos temas,
  a 1440 y 390 px y en ambos navegadores. Skip links, foco visible y preferencia
  de movimiento reducido presentes.

### Interpretación y límites de la revisión

- El validador CSS emite advertencias por variables dinámicas, colores heredados,
  variantes de fuente y redefiniciones entre media queries/estados. No son errores;
  los cambios de paleta y tamaño se comprobaron en los navegadores. Los recuentos
  completos se conservan en el informe, sin ocultarlos.
- El script inline del head es necesario para aplicar el tema antes de pintar.
  app.js mantiene defer y contiene las interacciones que dependen del body (4.2/4.9).
- No se agregan tablas, campos de formulario ni etiquetas meta sin una necesidad
  real de contenido. Los metadatos ampliados de 1.5 son ejemplos de uso.
- Los elementos del apartado 7 son opcionales. Ya hay favicon SVG, modo oscuro,
  diagrama SVG y botón para volver arriba.
- Las pruebas automáticas no certifican por sí solas conformidad integral WCAG
  2.1 AA ni una auditoría editorial o jurídica completa de cada recurso. Se conservan
  fuentes y créditos; no se afirma una certificación de los puntos 5.19 y 6.20.
