//====================JARDÍN DE FLORES PROYECTOS SEMANALES====================
//------Datos------
//Pétalos - Dificultad (0-10)
//Hojas - Prioridad (0-10)
//Tamaño - Tiempo invertido min
const FLORES = [
  { nombre: "Análisis",   petalos: 1,  hojas: 3, color: "#D64550", tamano: 30  },
  { nombre: "Tipografía",   petalos: 7, hojas: 9, color: "#F3A712", tamano: 180 },
  { nombre: "Diseño 3D", petalos: 8, hojas: 9, color: "#F5F3E8", tamano: 360 },
  { nombre: "UI/UX Design",    petalos: 5,  hojas: 5, color: "#3D7EBF", tamano: 240 },
  { nombre: "Diseño WEB",     petalos: 8, hojas: 8, color: "#A63D8F", tamano: 120 },
  { nombre: "Robótica",     petalos: 9,  hojas: 10, color: "#E8865A", tamano: 300 },
  { nombre: "Diseño Sonoro",   petalos: 4,  hojas: 6, color: "#7A5CC7", tamano: 90 },
  { nombre: "Laboratorio",    petalos: 7, hojas: 8, color: "#E58DB5", tamano: 240 },
];
 
//------Ajustes generales------
const CONFIG = {
  titulo: "Jardín de datos: Proyectos semanales",
  subtitulo: `Cada materia es representada por color:
Pétalos - Dificultad (0 - 10)
Hojas - Prioridad (0 - 10)
Tamaño - Tiempo Invertido (min)`,
  colorHojas: "#5B8A4A",
  colorTallo: "#4C7A3F",
  colorCentro: "#4A3520",
  tamanoMin: 5,
  tamanoMax: 360,
};
 
//------Estilos------
const ESTILOS = `
  :root {
    --fondo: #dde5d6;
    --tinta: #1f2a22;
    --tinta-suave: #56634f;
    --linea: #b7c4af;
  }
  * { box-sizing: border-box; }
  html::-webkit-scrollbar { display: none; }
  body {
    margin: 0;
    background: var(--fondo);
    color: var(--tinta);
    font-family: "Bricolage Grotesque", system-ui, -apple-system, "Segoe UI", sans-serif;
    line-height: 1.4;
  }
  #app {
    max-width: 1120px;
    margin: 0 auto;
    padding: clamp(1.5rem, 4vw, 3.5rem) clamp(1rem, 3vw, 2rem) 3rem;
  }
  #app header { margin-bottom: clamp(1.5rem, 3vw, 2.5rem); }
  #app h1 {
    margin: 0 0 .5rem;
    font-size: clamp(2rem, 5vw, 3.4rem);
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 1.05;
  }
  #app header p {
    margin: 0;
    max-width: 52ch;
    color: var(--tinta-suave);
    font-size: 1.05rem;
  }
  #jardin {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(1rem, 2.5vw, 2rem) clamp(.75rem, 2vw, 1.5rem);
  }
  @media (max-width: 860px) { #jardin { grid-template-columns: repeat(2, 1fr); } }
  #jardin figure { 
    margin: 0;
    padding-bottom: 0.5rem;
  }
  #jardin svg { 
    display: block; 
    width: 100%; 
    height: auto; 
    overflow: visible;
    margin-bottom: 0.3rem;
  }
  #jardin figcaption {
    margin-top: 1rem;
    padding-top: 1.2rem;
    padding-bottom: .5rem;
    border-top: 2px solid var(--linea);
  }
  .nombre {
    display: flex;
    align-items: center;
    gap: .5rem;
    font-weight: 600;
    font-size: 1.05rem;
    margin-bottom: .3rem;
  }
  .muestra {
    flex: none;
    width: .9rem;
    height: .9rem;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .25);
  }
  #jardin dl {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: .1rem 1rem;
    margin: 0;
    max-width: 11rem;
    font-size: .9rem;
    color: var(--tinta-suave);
  }
  #jardin dt { margin: 0; }
  #jardin dd { margin: 0; text-align: right; color: var(--tinta); font-variant-numeric: tabular-nums; }
  .cabeza {
    animation: brotar .9s cubic-bezier(.2, .9, .3, 1.15) both;
    animation-delay: calc(var(--i) * 90ms);
  }
  @keyframes brotar {
    from { transform: scale(.15); opacity: 0; }
    to   { transform: scale(1);   opacity: 1; }
  }
  @keyframes tambaleoDecreciente {
    0% { 
      transform: rotate(calc(var(--push-x, 1) * 7.5deg));
    }
    10% {
      transform: rotate(calc(var(--push-x, 1) * -5.5deg));
    }
    18% {
      transform: rotate(calc(var(--push-x, 1) * 4deg));
    }
    28% {
      transform: rotate(calc(var(--push-x, 1) * -2.8deg));
    }
    38% {
      transform: rotate(calc(var(--push-x, 1) * 1.8deg));
    }
    50% {
      transform: rotate(calc(var(--push-x, 1) * -1deg));
    }
    65% {
      transform: rotate(calc(var(--push-x, 1) * 0.5deg));
    }
    80% {
      transform: rotate(calc(var(--push-x, 1) * -0.2deg));
    }
    100% {
      transform: rotate(0deg);
    }
  }
  @keyframes girarPetalos {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .cabeza {
    animation: brotar .9s cubic-bezier(.2, .9, .3, 1.15) forwards;
  }
  .flor-hover .tallo-grupo {
    animation: tambaleoDecreciente 3.2s cubic-bezier(0.25, 0.8, 0.25, 1) 1 forwards;
  }
  .flor-hover .hojas-grupo {
    animation: tambaleoDecreciente 3.2s cubic-bezier(0.25, 0.8, 0.25, 1) 1 forwards;
  }
  .flor-hover .cabeza {
    animation: tambaleoDecreciente 3.2s cubic-bezier(0.25, 0.8, 0.25, 1) 1 forwards;
  }
  .flor-hover .petalos-grupo {
    animation: girarPetalos 2s linear 1 forwards;
  }
  .flor-svg {
    pointer-events: auto;
    visibility: visible;
  }
  @media (prefers-reduced-motion: reduce) { 
    .cabeza { animation: none; }
    .flor-hover .cabeza { animation: none; }
    .flor-hover .petalos-grupo { animation: none; }
  }
`;
 
/* ==========================================================
   4) CÓDIGO QUE DIBUJA LAS FLORES (no hace falta tocarlo)
   ========================================================== */
const ANCHO = 240, ALTO = 320, SUELO = 300, CX = ANCHO / 2;
 
const limitar = (v, min, max) => Math.min(max, Math.max(min, v));
const n1 = (v) => v.toFixed(1);
const oscuro = (c, p = 65) => `color-mix(in srgb, ${c} ${p}%, #000)`;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
 
// Forma de un pétalo apuntando hacia arriba, de largo R.
// Con más pétalos, cada uno se hace más angosto para que quepan.
function trazoPetalo(R, n) {
  const w = Math.min(0.45 * R, (4 * R) / n);
  return `M0,0 C${n1(-w)},${n1(-0.3 * R)} ${n1(-0.8 * w)},${n1(-0.9 * R)} 0,${n1(-R)} ` +
         `C${n1(0.8 * w)},${n1(-0.9 * R)} ${n1(w)},${n1(-0.3 * R)} 0,0Z`;
}
 
// Forma de una hoja apuntando hacia arriba, de largo L.
function trazoHoja(L) {
  return `M0,0 C${n1(-0.35 * L)},${n1(-0.25 * L)} ${n1(-0.3 * L)},${n1(-0.75 * L)} 0,${n1(-L)} ` +
         `C${n1(0.3 * L)},${n1(-0.75 * L)} ${n1(0.35 * L)},${n1(-0.25 * L)} 0,0Z`;
}
 
function dibujarFlor(f, i) {
  const petalos = Math.max(0, Math.round(Number(f.petalos) || 0));
  const hojas   = Math.max(0, Math.round(Number(f.hojas) || 0));
  const R       = 50; // Pétalos FIJOS, no cambian
  const color   = f.color || "#cccccc";

  // Tallo: curva suave desde el suelo hasta el centro de la flor
  const alturaTallo = Number(f.tamano) || 70; // Ahora solo controla la altura
  const cy = SUELO - alturaTallo;
  const curva = (i % 2 === 0 ? 1 : -1) * 10;
  const p0 = [CX, SUELO], p1 = [CX + curva, (SUELO + cy) / 2], p2 = [CX, cy];
  const puntoTallo = (t) => [
    (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t ** 2 * p2[0],
    (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t ** 2 * p2[1],
  ];
 
  const tallo = `<g class="tallo-grupo" style="transform-origin:${CX}px ${SUELO}px">
    <path d="M${p0[0]},${p0[1]} Q${n1(p1[0])},${n1(p1[1])} ${p2[0]},${n1(p2[1])}"
        fill="none" stroke="${CONFIG.colorTallo}" stroke-width="${n1(3 + R * 0.02)}" stroke-linecap="round"/>
  </g>`;
 
  // Hojas: se reparten a lo largo del tallo, alternando izquierda y derecha
  const largoHoja = 22 + R * 0.35;
  let svgHojas = "";
  for (let k = 0; k < hojas; k++) {
    const t = hojas === 1 ? 0.4 : 0.12 + 0.6 * (k / (hojas - 1));
    const [x, y] = puntoTallo(t);
    const angulo = (k % 2 === 0 ? -1 : 1) * 58;
    svgHojas += `
      <g transform="translate(${n1(x)} ${n1(y)}) rotate(${angulo})">
        <path d="${trazoHoja(largoHoja)}" fill="${CONFIG.colorHojas}" stroke="${oscuro(CONFIG.colorHojas, 70)}" stroke-width="1"/>
        <path d="M0,0 L0,${n1(-largoHoja * 0.85)}" stroke="rgba(255,255,255,.35)" stroke-width="1" fill="none"/>
      </g>`;
  }
  
  const hojas_html = hojas > 0 ? `<g class="hojas-grupo" style="transform-origin:${CX}px ${SUELO}px">${svgHojas}</g>` : "";
 
  // Pétalos: repartidos en círculo alrededor del centro
  const forma = trazoPetalo(R, Math.max(petalos, 1));
  let svgPetalos = "";
  for (let k = 0; k < petalos; k++) {
    const angulo = (360 / petalos) * k;
    const strokeColor = color === "#F5F3E8" ? "#D4D0C0" : oscuro(esc(color));
    svgPetalos += `
      <g transform="rotate(${n1(angulo)})">
        <path d="${forma}" fill="${esc(color)}" stroke="${strokeColor}" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M0,${n1(-R * 0.2)} L0,${n1(-R * 0.72)}" stroke="rgba(100,100,100,.15)" stroke-width="1" fill="none"/>
      </g>`;
  }
 
  const radioCentro = Math.max(5, R * 0.16);
 
  return `
  <svg viewBox="0 0 ${ANCHO} ${ALTO}" role="img" class="flor-svg"
       aria-label="${esc(f.nombre)}: ${petalos} pétalos, ${hojas} hojas, tamaño ${Math.round(R)}">
    <title>${esc(f.nombre)}</title>
    <ellipse cx="${CX}" cy="${SUELO + 2}" rx="46" ry="5" fill="rgba(31,42,34,.14)"/>
    ${tallo}
    ${hojas_html}
    <g class="cabeza" style="transform-origin:${CX}px ${SUELO}px; --i:${i}">
      <g transform="translate(${CX} ${n1(cy)})">
        <g class="petalos-grupo" style="transform-origin:0px 0px">
          ${svgPetalos}
        </g>
        <circle r="${n1(radioCentro)}" fill="${CONFIG.colorCentro}"/>
      </g>
    </g>
  </svg>`;
}
 
function dibujarJardin(contenedor) {
  contenedor.innerHTML = FLORES.map((f, i) => `
    <figure>
      ${dibujarFlor(f, i)}
      <figcaption>
        <div class="nombre">
          <span class="muestra" style="background:${esc(f.color)}"></span>${esc(f.nombre)}
        </div>
        <dl>
          <dt>Pétalos</dt><dd>${esc(f.petalos)}</dd>
          <dt>Hojas</dt><dd>${esc(f.hojas)}</dd>
          <dt>Tamaño</dt><dd>${esc(f.tamano)}</dd>
        </dl>
      </figcaption>
    </figure>`).join("");
}
 
/* ==========================================================
   5) ARRANQUE: crea la página y dibuja el jardín
   ========================================================== */
function iniciar() {
  document.title = CONFIG.titulo;
 
  // Tipografía (si no hay internet, se usa la fuente del sistema)
  const fuente = document.createElement("link");
  fuente.rel = "stylesheet";
  fuente.href = "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700&display=swap";
  document.head.appendChild(fuente);
 
  // Estilos
  const estilo = document.createElement("style");
  estilo.textContent = ESTILOS;
  document.head.appendChild(estilo);
 
  // Estructura de la página
  const app = document.createElement("main");
  app.id = "app";
  app.innerHTML = `
    <header>
      <h1>${esc(CONFIG.titulo)}</h1>
      <p>${esc(CONFIG.subtitulo)}</p>
    </header>
    <section id="jardin" aria-label="${FLORES.length} flores"></section>`;
  document.body.appendChild(app);
 
  dibujarJardin(app.querySelector("#jardin"));
  
  // Event listeners para animación de empujón
  const flores = document.querySelectorAll(".flor-svg");
  flores.forEach(flor => {
    flor.addEventListener("mouseenter", (e) => {
      const rect = flor.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const mouseX = e.clientX;
      
      // Determinar dirección: si viene de la izquierda, empuja a la derecha
      const dirX = mouseX < centerX ? 1 : -1;
      
      // Aplicar variable CSS para la dirección
      flor.style.setProperty('--push-x', dirX);
      
      // Aplicar clase para activar animación
      const figura = flor.closest("figure");
      
      // Remover y reagregar clase para reiniciar la animación
      figura.classList.remove("flor-hover");
      // Usar setTimeout con 0ms para forzar el reflow
      setTimeout(() => {
        figura.classList.add("flor-hover");
      }, 0);
    });
  });
}
 
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar);
} else {
  iniciar();
}