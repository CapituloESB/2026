# Web del XV Congreso ESB · Barcelona 2026

Guía móvil del congreso: programa, sesiones paralelas, buscador de ponencias y plano con la sala marcada.

## Archivos

| Archivo | Para qué sirve | ¿Lo tocas? |
|---|---|---|
| `programa.js` | Programa, ponentes, salas, logos y planos | **Sí, aquí se cambia casi todo** |
| `index.html` | Diseño y funcionamiento de la web | Solo para cambiar colores |
| `logos/` | Logos (SVG o PNG) | Sí, añade aquí los logos |
| `planos/` | Imágenes de los planos | Solo si cambia el plano |

---

## 1. Publicar en GitHub Pages (una sola vez)

1. En github.com, crea un repositorio nuevo **público**, por ejemplo `congreso-esb-2026`.
2. Pulsa **Add file → Upload files** y arrastra el contenido de esta carpeta: `index.html`, `programa.js`, `README.md` y las carpetas `logos` y `planos`. Pulsa **Commit changes**.
3. Ve a **Settings → Pages**. En *Branch* elige `main` y la carpeta `/ (root)`. Pulsa **Save**.
4. En uno o dos minutos la web estará en:
   `https://TU-USUARIO.github.io/congreso-esb-2026/`

## 2. Código QR

Genera el QR con la dirección del paso 4, por ejemplo con https://www.qrcode-monkey.com.
Puedes ponerle el turquesa del congreso (#0A6B6E) y el logo en el centro.

La dirección no cambia aunque edites la web, así que **puedes imprimir el QR ya**:
los cambios que hagas después aparecen solos.

Para que el QR abra directamente una pestaña, añade al final de la dirección:
`#ahora`, `#jueves`, `#viernes`, `#mapa` o `#buscar`.

Para que abra el plano **con una sala ya marcada**, usa `#mapa-` y el nombre corto de la sala:

| QR para… | Final de la dirección |
|---|---|
| Aula Capella | `#mapa-capella` |
| Aula LS2 | `#mapa-ls2` |
| Aula LS15 | `#mapa-ls15` |
| Aula LS16 | `#mapa-ls16` |
| Registro | `#mapa-registro` |
| Sala d'Actes | `#mapa-actes` |
| Hall | `#mapa-hall` |
| Plaça de l'Enginy | `#mapa-enginy` |

**Importante:** la dirección depende de tu usuario de GitHub y del nombre del repositorio.
No cambies ninguno de los dos después de imprimir los QR, o dejarán de funcionar.

## 3. Añadir los logos

1. Exporta cada logo como **SVG** (mejor) o **PNG** con fondo transparente.
2. Renómbralos así y súbelos a la carpeta `logos/` (en GitHub: entra en la carpeta → *Add file → Upload files*):

| Logo | Nombre del archivo |
|---|---|
| Logo del congreso (cabecera) | `congreso.svg` |
| BIOMEC | `biomec.svg` |
| Departament d'Enginyeria Mecànica | `dem-upc.svg` |
| ETSEIB 175 anys | `etseib-175.svg` |
| UPC | `upc.svg` |
| European Society of Biomechanics | `esb.svg` |
| LabORA | `labora.svg` |
| IRIS | `iris.svg` |
| Able Human Motion | `able.svg` |

Si usas otro nombre o un PNG, cambia la línea correspondiente en `programa.js` (sección `LOGOS`).
Para **añadir** un logo nuevo, copia una línea como esta dentro de `organizan` o `colaboran`:

```js
{ nombre:"Nombre visible", archivo:"logos/nuevo.svg" },
```

Mientras falte un archivo, la web muestra una caja con el nombre.

## 4. Cambiar el programa

En GitHub, abre `programa.js` y pulsa el **lápiz** (✏️) para editar. Al terminar, pulsa **Commit changes**. La web se actualiza en 1–2 minutos.

**Cambiar un moderador o un título:** busca el texto y reescríbelo dentro de las comillas.

**Añadir una ponencia:** dentro de la sesión, añade una línea con este formato:

```
141234|Título de la ponencia|Autor Uno; Autora Dos; Autor Tres
```

**Cambiar una sala:** cambia el tercer valor de la sesión (`"capella"`, `"ls2"`, `"ls15"`, `"ls16"`…).

**Añadir una actividad:**

```js
I("j12","20:30","21:00","break","Cóctel",{ room:"enginy" }),
```

- `"j12"`: identificador único (j = jueves, v = viernes).
- Tipos: `general`, `plenary`, `break`, `parallel`, `session`.
- Opciones: `room:"capella"` (marca en el plano), `ext:"polo"` (abre Google Maps), `meta:"texto pequeño"`.

> ⚠️ Cuidado con las comas y las comillas. Si después de un cambio la web sale en blanco, casi siempre falta una coma o sobra una comilla. En GitHub puedes ver y deshacer cada cambio desde **History**.

## 5. Cambiar el plano

Las imágenes están en `planos/`. Cada sala es un recuadro definido **en porcentaje de la imagen** (sección `ROOMS` de `programa.js`):

```js
capella: { plano:"baja", name:"Aula Capella", pos:[78.0, 69.3, 15.7, 12.3], ... }
//                                          x%    y%    ancho% alto%
```

Si cambias la imagen por otra (por ejemplo, un plano más bonito exportado de Illustrator):

1. Súbela con el mismo nombre a `planos/`.
2. Ábrela en cualquier visor que muestre las coordenadas en píxeles. Para cada sala, apunta la esquina superior izquierda y su tamaño.
3. Pásalos a porcentaje: `x% = x_px / ancho_imagen × 100` (y lo mismo con y, ancho y alto).

Para una sala nueva, copia una línea de `ROOMS` y cambia la clave, el nombre y la posición.

## 6. Comprobar la pestaña "Ahora" antes del congreso

Lo que ven los asistentes:
- **Antes del 29:** un aviso de que el congreso empieza el jueves 29, con acceso al programa.
- **29 y 30:** lo que toca en cada momento, según la hora del móvil.
- **Después del 30:** un mensaje de agradecimiento y el programa.

Para probarlo tú, añade esto a la dirección (antes del `#` si lo hay):

| Para… | Dirección |
|---|---|
| Mover la hora con una barra | `…/congreso-esb-2026/?simular` |
| Ver la web como si fuera el jueves a las 16:30 | `…/congreso-esb-2026/?hora=2026-10-29T16:30` |
| Ver el viernes a las 12:10 | `…/congreso-esb-2026/?hora=2026-10-30T12:10` |
| Ver lo que sale antes del congreso | la dirección normal |
| Ver lo que sale después | `…/congreso-esb-2026/?hora=2026-10-31T10:00` |

Con `?hora=` el reloj avanza a partir de esa hora, igual que el día real. Estos enlaces solo cambian lo que ves tú; no afectan a nadie más.

## 7. Abstracts en PDF

1. Crea la carpeta `abstracts/` en el repositorio (ya viene creada en el zip).
2. Sube cada PDF con el **ID de la ponencia** como nombre: `141014.pdf`, `139964.pdf`…
3. Listo: en la ficha de esa ponencia aparece el botón **Abstract (PDF)**. Si falta el PDF, simplemente no sale el botón.

GitHub admite archivos de hasta 100 MB; los abstracts pesan mucho menos.

## 8. Cambiar los colores

Al principio de `index.html`, en el bloque `:root`, cada color tiene un comentario que explica dónde se usa.
Por ejemplo, `--brand` es el turquesa principal.
