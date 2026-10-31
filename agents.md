# AGENTS.md — GameShelf

Guía para cualquier IA que trabaje en este repositorio. Léela entera antes de tocar código.

## 1. Qué es el proyecto

**GameShelf** es una aplicación web para gestionar una colección personal de videojuegos (copias físicas y digitales). Es un trabajo de DAW (CESUR, módulo DIW), hecho por un equipo de dos personas, y se entrega en dos fases:

- **Entrega 1 (hecha en lo básico):** navegación estática con tres páginas: Inicio, Login y Contacto.
- **Entrega 2 (pendiente):** catálogo real, filtros, ficha de detalle, perfil, paginación, etc. (ver historias de usuario, sección 5). Los datos vendrán de un archivo JSON, no de una base de datos.

El diseño estaba definido antes que el código: primero mockup (lienzo "Colección Videojuegos Y2K"), luego EJS y CSS. **El código debe respetar el mockup**, no reinventarlo.

## 2. Stack y cómo arrancar

- Node.js + Express, generado con `express-generator` y motor de vistas **EJS**.
- CSS escrito a mano, sin frameworks (nada de Bootstrap ni Tailwind).
- Sin JavaScript en el navegador por ahora: la interactividad la resuelve el servidor.

```bash
npm install
npm start          # arranca ./bin/www en http://localhost:3000
```

Notas que ya han dado problemas:
- Se arranca con **`npm start`**. `npx start` no existe y da error.
- `npm install express` solo instala la librería. La estructura de carpetas viene de `npx express-generator --view=ejs`.
- Node carga el código una sola vez: **tras cambiar rutas o `app.js` hay que reiniciar** (`Ctrl+C` y `npm start`). Para desarrollo sirve `node --watch ./bin/www`.
- Un `Not Found` en una URL nueva casi siempre significa que la ruta no está registrada, que el servidor no se reinició, o que está en `users.js` (que cuelga de `/users`).

## 3. Estructura

```
app.js                      ← configuración de Express (no tocar sin motivo)
bin/www                     ← arranque del servidor
routes/index.js             ← rutas de Inicio, Login y Contacto (GET y POST)
views/
  partials/header.ejs       ← <head>, logo y menú (compartido)
  partials/footer.ejs       ← pie y cierre de <body> (compartido)
  index.ejs · login.ejs · contacto.ejs
public/
  fonts/                    ← Cloudy.ttf, Rufenthall.otf
  stylesheets/
    style.css               ← SOLO @import. Es el único CSS que enlazan las vistas
    var.css                 ← variables (colores, fuentes, sombras, medidas)
    base.css                ← @font-face, fondo de cielo, foco, .contenedor
    componentes.css         ← piezas reutilizables (.ventana, .boton, .campo, .nota, .aviso…)
    header.css · footer.css
    index.css · login.css · contacto.css   ← una hoja por página
```

## 4. Reglas de código

### Vistas EJS
- Cada página empieza con `<%- include('partials/header') %>` y termina con `<%- include('partials/footer') %>`. El `<head>` y el cierre de `</html>` viven en los partials, **nunca** se repiten en las vistas.
- Distinguir las etiquetas: `<% %>` ejecuta sin imprimir, `<%= %>` imprime escapando HTML, `<%- %>` imprime sin escapar (solo para includes o HTML que se quiere de verdad).
- Para variables opcionales usar `locals.nombre` (p. ej. `locals.enviado`), así no da error cuando la ruta no la envía.
- Cada ruta pasa a la vista `title` (texto del `<title>`) y `pagina` (`'inicio'`, `'login'`, `'contacto'`). El menú usa `pagina` para poner `aria-current="page"` en el enlace activo. **Una página nueva necesita su entrada en el array `enlaces` de `header.ejs`.**

### Rutas
- Todas en `routes/index.js`, antes de `module.exports`.
- Los formularios usan `method="POST"` a su propia URL. Por ahora el POST solo simula el resultado: vuelve a renderizar la misma vista con `enviado: true` y la vista muestra el aviso.
- Login y contacto **no validan ni guardan nada todavía**. El usuario de prueba (`usuario123` / `contraseña123`) es solo texto en una nota del mockup.

### CSS
- Metodología tipo BEM: `.bloque`, `.bloque__elemento`, `.bloque--variante` (p. ej. `.nav__enlace`, `.boton--azul`).
- **Nada de estilos en línea** y nada de colores o fuentes escritos a mano: usar las variables de `var.css`.
- Lo que se repite en más de una página va a `componentes.css`; lo específico de una página, a su hoja.
- Toda hoja nueva se añade con `@import` en `style.css`, respetando el orden: variables → base → componentes → header/footer → páginas.
- Responsive con `flex-wrap`, `grid` con `auto-fit` y `@media (max-width: 600px)` para lo que no se resuelva solo.

## 5. Historias de usuario (resumen)

Tema: colección privada de videojuegos.

1. **Login:** credenciales correctas llevan al catálogo personal.
2. **Logout:** "Cerrar sesión" termina la sesión y vuelve al login.
3. **Listado personal:** cuadrícula con las copias del usuario (título, plataforma, formato físico/digital); solo las suyas.
4. **Búsqueda y filtros:** por título o género (búsqueda) y por plataforma, género o formato (filtros); la lista se actualiza.
5. **Ficha de detalle:** al pulsar una tarjeta o "Ver detalles", vista de esa copia (edición, conservación, horas jugadas…).
6. **Perfil:** nombre de usuario, correo y total de copias.
7. **Paginación:** 10–12 por página, con "Anterior", "Siguiente" y número de página.
8. **Ordenación:** A-Z, Z-A, año o plataforma, desde un desplegable.
9. **Anterior/Siguiente en la ficha:** se deshabilitan en la primera y la última copia.

## 6. Sistema de diseño (estética Y2K / "sistema operativo antiguo")

Referencias: lista de deseos con estantería sobre cielo y suelo de cuadros, y póster con monitor retro y ventanas emergentes.

**Elementos recurrentes:** cielo azul con nubes de fondo; ventanas con barra azul brillante y botones de minimizar/cerrar; botones en píldora con brillo; menú en barra plateada; estantería de panel perforado con balda verde y etiquetas en píldora; notas adhesivas amarillas inclinadas; suelo de cuadros blanco y negro en el pie; checks verdes.

**Paleta** (definida en `var.css`): azules `#0d3a8c`, `#1f5fd1`, `#1a4fb3`, `#6fb3ff`, `#b8d4ff`; texto `#14213d`; acentos verde `#3cb043`, amarillo `#ffe14d`, rosa `#ff8cc6` / `#b0307a`.

**Tipografías:**
| Uso | Fuente |
|---|---|
| Logo y títulos | **Cloudy** (archivo propio) |
| Notas adhesivas | **Rufenthall** (archivo propio) |
| Textos dentro de ventanas y portadas | Pixelify Sans |
| Menú, botones, etiquetas de formulario | VT323 |
| Párrafos | Verdana |

> **Atención:** Cloudy **no incluye tildes, ñ, ¡ ni ¿**. Esos caracteres se ven con la fuente de respaldo (Pixelify Sans). Por eso algunos títulos están escritos sin tilde a propósito ("Inicia sesion", "Explora tu catalogo"). No "corregirlos" sin consultar. Rufenthall sí las incluye.

**Criterios de accesibilidad a mantener:**
- Controles de al menos 44 px de alto.
- Cada campo con su `<label for>`.
- Contraste mínimo 4,5:1 en texto normal.
- Foco visible (`:focus-visible`, contorno amarillo).
- Menú con `aria-label` y `aria-current="page"`.
- SVG decorativos con `aria-hidden="true"`; sin emojis como iconos.

## 7. Contenido provisional

Hay datos de relleno que **no hay que dar por definitivos**:
- Los seis juegos de la estantería de Inicio (`routes/index.js`) son inventados a propósito para no usar portadas con derechos. En la Entrega 2 saldrán del JSON.
- En Contacto: `[CORREO DE CONTACTO]` y `[NOMBRE 1] y [NOMBRE 2]` están pendientes de rellenar.
- El aviso "¡Sesión iniciada!" dice que es una simulación; hay que quitarlo cuando exista login real.

## 8. Cómo debe trabajar la IA con este proyecto

- **Explicar el porqué**, no solo dar código: por qué se usa esa etiqueta, esa propiedad o esa estructura.
- **Paso a paso**, con una comprobación al final de cada paso (qué debería verse o qué URL abrir).
- **Verificar antes de dar algo por hecho:** arrancar el servidor y comprobar que las páginas devuelven 200 y que los formularios responden.
- **Ser honesta con los límites:** si algo no se ha probado, o si una decisión tiene pegas, decirlo en vez de presentarlo como perfecto.
- **Cambios mínimos:** hacer lo pedido sin reescribir archivos que no hacen falta. Si se añade una página, tocar solo lo necesario (ruta, vista, hoja CSS, `@import`, entrada del menú).
- **No introducir dependencias** (npm, frameworks CSS, librerías JS) sin preguntar.
- **No hacer commits ni cambiar `app.js`** sin que se pida expresamente.
- Responder en **español**, con tono cercano y claro. El usuario viene de Java y está aprendiendo PHP y Node, así que conviene comparar con conceptos conocidos cuando ayude.