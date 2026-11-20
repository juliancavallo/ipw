# El cielo en los mitos y el arte

Exposición digital de Julián Cavallo para Introducción a la Programación Web (UAI, 2026).
Presenta seis relatos y doce obras sobre el Sol, la Luna y los eclipses en seis páginas.

## Ejecutar

Abrir `index.html` directamente o usar Live Server en VS Code. Las hojas CSS listas
para publicar están incluidas. La tipografía principal es Times New Roman, con
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

## Revisión de considerandos (19 de noviembre de 2026)

Revisión contra el PDF «Considerandos para la construcción de la página WEB».
El sitio cumple numerosos puntos funcionales, pero no se declara cumplimiento total.

| Apartado | Resultado y evidencia |
| --- | --- |
| 1. Estructura general | Seis páginas con 16 elementos section: cumple el mínimo de diez secciones o páginas (1.11). Index en la raíz, recursos locales existentes, metadatos esenciales, títulos, favicon, navegación, main, header, footer y README presentes. Comprobado en Chrome y Edge y a 320, 390, 768 y 1440 px. Pendientes: peso de una imagen y confirmación de algunos enlaces externos. |
| 2. HTML y semántica | Corregidos el h1 de Sol, Luna y Eclipses y sus subtítulos: un h1 por página y jerarquía sin saltos en esas secciones. HTML válido con html-validate; imágenes con alt, campos con label y for, enlaces descriptivos y marcado semántico. Falta validar con W3C (2.13). No se agregan tablas, select ni textarea sin necesidad de contenido. |
| 3. CSS | Dos hojas externas, variables de color, unidades relativas, grid/flex, media queries y movimiento reducido. CSS Tree no detecta errores de sintaxis; Axe no detecta infracciones de contraste en los estados estables probados. Hay salvedades en 3.5, 3.14, 3.17 y 3.18, detalladas abajo. |
| 4. JavaScript | Funciones por responsabilidad, const/let, addEventListener, validación y feedback del cuestionario, galerías con teclado y restauración de foco, menú móvil y localStorage con manejo de errores. Sin errores JS ni recursos locales fallidos en las pruebas. |
| 5. Contenido | Propósito, títulos, relatos, descripciones, fuentes y créditos presentes. Se revisó su organización, pero no se certificó exhaustivamente la exactitud de cada afirmación ni la licencia individual de cada recurso (5.1 y 5.19). Los enlaces externos pendientes también afectan 5.17. No hay audio ni video. |
| 6. Accesibilidad | Skip links, foco visible, labels, estados ARIA, menú con Escape, diálogo con teclado y preferencia de movimiento reducido. Axe sin infracciones en las reglas WCAG 2 A/AA y 2.1 AA probadas, en ambas paletas y navegadores, a 1440 y 390 px. Esto no certifica por sí solo conformidad integral WCAG 2.1 AA (6.20) ni sustituye una revisión con lector de pantalla. |
| 7. Opcionales | Favicon SVG, modo oscuro, gráficos SVG y botón para volver arriba. Los demás elementos del apartado son opcionales y no son requisitos para este sitio. |

### Pendientes y salvedades

- **1.19 / 1.26:** assets/images/ilustraciones/eclipse-xilografia.png pesa
  2.988.442 bytes (aprox. 2,99 MB), por encima de los 200 KB orientativos del PDF.
  Los otros 16 archivos de imágenes pesan menos de 200.000 bytes cada uno.
- **1.3 / 1.18 / 5.17:** todos los archivos y anclas internos comprobados existen.
  De 33 URLs externas distintas, 16 respondieron HTTP 200; seis respondieron 403
  y once 429. No se recibieron 404. Las respuestas 403/429 impiden confirmar el
  destino automáticamente; no equivalen a un enlace inexistente.
- **2.13 / 3.14:** se usaron html-validate y CSS Tree, no los validadores W3C
  expresamente pedidos en el PDF. Queda pendiente esa comprobación específica.
- **3.5:** se usan Times New Roman y fuentes de sistema. No hay fuentes importadas
  de un proveedor. Es una elección funcional válida, pero no cumple literalmente
  la redacción del punto si se exige importar una fuente externa.
- **3.17:** quedan selectores sin uso, por ejemplo .route-number y .hero-index,
  y reglas repetidas de .story-section. Falta depurar la hoja de estilos.
- **3.18:** las hojas fuente no están minificadas. No se verificó la compresión HTTP
  de la versión publicada, por lo que este punto queda pendiente de acreditar.
- **4.2 / 4.9:** app.js mantiene defer. El pequeño script inline del head es
  intencionalmente temprano: solo recupera el tema y modifica html antes del
  primer renderizado; no depende de elementos del body. Evita el destello claro.
- Los ejemplos ampliados de metadatos del apartado 1.5 se interpretan como
  explicaciones de uso, no como obligación de incluir redirecciones automáticas,
  códigos de verificación ficticios ni todas las etiquetas de proveedores.

### Comprobaciones realizadas

- HTML de las seis páginas y sintaxis de las dos hojas CSS sin errores con los
  validadores locales; sintaxis de app.js comprobada con Node.
- Chrome y Edge: imágenes cargadas y decodificadas, archivos y anclas locales,
  menú móvil, Escape, galerías, cambio de obra y retorno del foco, cuestionario
  correcto y reinicio, y ambos modos del esquema de eclipses.
- Sin desbordamiento horizontal a 320, 390, 768 y 1440 px en ambas paletas.
- Persistencia de ambos temas entre páginas. Con app.js bloqueado, las seis páginas
  ya muestran el fondo oscuro guardado antes de inicializar el botón.
- Contenido principal visible sin JavaScript y controles de tema ocultos.
- Manejo del almacenamiento bloqueado y valores ausentes o inválidos verificado
  para la inicialización del tema y el botón.
