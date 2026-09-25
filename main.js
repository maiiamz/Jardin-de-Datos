//====================JARDÍN DE FLORES PROYECTOS SEMANALES====================
//------Datos------
//Pétalos - Dificultad (0-10)
//Hojas - Prioridad (0-10)
//Tamaño - Tiempo invertido min
//Abeja - true para que una abejita vuele junto a la flor
const FLORES = [
  { nombre: "Análisis",      petalos: 1, hojas: 3,  color: "#D64550", tamano: 30  },
  { nombre: "Tipografía",    petalos: 7, hojas: 9,  color: "#F3A712", tamano: 180 },
  { nombre: "Diseño 3D",     petalos: 8, hojas: 9,  color: "#F5F3E8", tamano: 360, abeja: true },
  { nombre: "UI/UX Design",  petalos: 5, hojas: 5,  color: "#3D7EBF", tamano: 240, abeja: true },
  { nombre: "Diseño WEB",    petalos: 8, hojas: 8,  color: "#A63D8F", tamano: 120 },
  { nombre: "Robótica",      petalos: 9, hojas: 10, color: "#E8865A", tamano: 300, abeja: true },
  { nombre: "Diseño Sonoro", petalos: 4, hojas: 6,  color: "#7A5CC7", tamano: 90  },
  { nombre: "Laboratorio",   petalos: 7, hojas: 8,  color: "#E58DB5", tamano: 240 },
];

//------Ajustes generales------
const CONFIG = {
  titulo: "Jardín de Datos",
  colorHojas: "#5B8A4A",
  colorTallo: "#4C7A3F",
  colorCentro: "#4A3520",
  colorAbeja: "#F2C230",
  colorAbejaOscuro: "#2B2118",
  tamanoMin: 5,
  tamanoMax: 360,
};

//------Estilos------
const ESTILOS = `
  :root {
    --fondo: #dde5d6;
    --tinta: #1f2a22;
    --tinta-suave: #56634f;
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
    max-width: 1400px;
    margin: 0 auto;
    padding: clamp(1.5rem, 4vw, 3.5rem) clamp(1rem, 3vw, 2rem) 3rem;
  }
  #app header { margin-bottom: clamp(1.5rem, 3vw, 2.5rem); }
  #app h1 {
    margin: 0;
    font-size: clamp(2rem, 5vw, 3.4rem);
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 1.05;
  }

  /* ---- Campo: una sola fila de flores ---- */
  .campo {
    overflow-x: auto;
    scrollbar-width: none;
  }
  .campo::-webkit-scrollbar { display: none; }
  #jardin {
    display: flex;
    align-items: flex-end;
    gap: clamp(0rem, .5vw, .4rem);
    min-width: 960px; /* en pantallas angostas, el campo se desliza de lado */
  }
  #jardin figure {
    flex: 1 1 0;
    min-width: 0;
    margin: 0;
  }
  #jardin svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }

  /* ---- Animaciones de las flores ---- */
  @keyframes brotar {
    from { transform: scale(.15); opacity: 0; }
    to   { transform: scale(1);   opacity: 1; }
  }
  @keyframes tambaleoDecreciente {
    0%   { transform: rotate(calc(var(--push-x, 1) * 7.5deg)); }
    10%  { transform: rotate(calc(var(--push-x, 1) * -5.5deg)); }
    18%  { transform: rotate(calc(var(--push-x, 1) * 4deg)); }
    28%  { transform: rotate(calc(var(--push-x, 1) * -2.8deg)); }
    38%  { transform: rotate(calc(var(--push-x, 1) * 1.8deg)); }
    50%  { transform: rotate(calc(var(--push-x, 1) * -1deg)); }
    65%  { transform: rotate(calc(var(--push-x, 1) * 0.5deg)); }
    80%  { transform: rotate(calc(var(--push-x, 1) * -0.2deg)); }
    100% { transform: rotate(0deg); }
  }
  @keyframes girarPetalos {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .cabeza {
    animation: brotar .9s cubic-bezier(.2, .9, .3, 1.15) calc(var(--i) * 90ms) both;
  }
  .flor-hover .tallo-grupo,
  .flor-hover .hojas-grupo,
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

  /* ---- Abejas (independientes de las flores) ---- */
  .abeja {
    pointer-events: none;
    animation: aparecerAbeja .6s ease-out both;
    animation-delay: calc(var(--i) * 90ms + .8s);
  }
  @keyframes aparecerAbeja {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .abeja-vuelo {
    animation: volarAbeja 3.6s ease-in-out infinite;
  }
  @keyframes volarAbeja {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25%      { transform: translate(-5px, -7px) rotate(-6deg); }
    50%      { transform: translate(3px, -2px) rotate(4deg); }
    75%      { transform: translate(-2px, 5px) rotate(-3deg); }
  }
  .ala {
    transform-box: fill-box;
    transform-origin: 50% 100%;
    animation: aletear .09s ease-in-out infinite alternate;
  }
  @keyframes aletear {
    from { transform: scaleY(1); }
    to   { transform: scaleY(.35); }
  }

  @media (prefers-reduced-motion: reduce) {
    .cabeza,
    .flor-hover .cabeza,
    .flor-hover .tallo-grupo,
    .flor-hover .hojas-grupo,
    .flor-hover .petalos-grupo,
    .abeja,
    .abeja-vuelo,
    .ala { animation: none; }
  }
`;

/* ==========================================================
   4) CÓDIGO QUE DIBUJA LAS FLORES (no hace falta tocarlo)
   ========================================================== */
// ANCHO más angosto = flores más grandes en pantalla
// ALTO y SUELO dan espacio para que el tallo más alto (360) + pétalos quepa completo
const ANCHO = 200, ALTO = 448, SUELO = 440, CX = ANCHO / 2;

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

// Abejita dibujada mirando a la izquierda, centrada en (0,0).
// lado = 1 → vuela a la derecha de la flor; lado = -1 → a la izquierda (se voltea para mirar la flor)
function dibujarAbeja(x, y, lado, i) {
  const escala = 1.4;
  const idClip = `abeja-cuerpo-${i}`;
  const oscuroAbeja = CONFIG.colorAbejaOscuro;
  return `
    <g class="abeja" style="--i:${i}" transform="translate(${n1(x)} ${n1(y)}) scale(${n1(escala * lado)} ${n1(escala)})">
      <g class="abeja-vuelo" style="animation-delay:${n1(-i * 0.7)}s">
        <!-- Alas -->
        <g transform="rotate(-20 -1 -4)">
          <ellipse class="ala" cx="-1" cy="-9" rx="3.6" ry="5.5" fill="rgba(255,255,255,.8)" stroke="rgba(31,42,34,.35)" stroke-width=".7"/>
        </g>
        <g transform="rotate(18 3 -4)">
          <ellipse class="ala" cx="3" cy="-9" rx="3.6" ry="5.5" fill="rgba(255,255,255,.8)" stroke="rgba(31,42,34,.35)" stroke-width=".7"/>
        </g>
        <!-- Aguijón -->
        <path d="M7.5,-.8 L11,.2 L7.5,1.4Z" fill="${oscuroAbeja}"/>
        <!-- Cuerpo con rayas -->
        <clipPath id="${idClip}">
          <ellipse cx="0" cy="0" rx="8" ry="5.5"/>
        </clipPath>
        <ellipse cx="0" cy="0" rx="8" ry="5.5" fill="${CONFIG.colorAbeja}"/>
        <g clip-path="url(#${idClip})" fill="${oscuroAbeja}">
          <rect x="-1.5" y="-6" width="2.6" height="12"/>
          <rect x="3.6" y="-6" width="2.6" height="12"/>
        </g>
        <ellipse cx="0" cy="0" rx="8" ry="5.5" fill="none" stroke="${oscuroAbeja}" stroke-width="1"/>
        <!-- Cabeza, ojo y antenas -->
        <circle cx="-9" cy="-.5" r="3.8" fill="${oscuroAbeja}"/>
        <circle cx="-10.3" cy="-1.5" r=".9" fill="#fff"/>
        <path d="M-10,-3.8 Q-12,-8 -14.5,-8.3" fill="none" stroke="${oscuroAbeja}" stroke-width=".8" stroke-linecap="round"/>
        <path d="M-8,-4 Q-8.8,-8.5 -10.8,-9.5" fill="none" stroke="${oscuroAbeja}" stroke-width=".8" stroke-linecap="round"/>
      </g>
    </g>`;
}

function dibujarFlor(f, i) {
  const petalos = Math.max(0, Math.round(Number(f.petalos) || 0));
  const hojas   = Math.max(0, Math.round(Number(f.hojas) || 0));
  const R       = 50; // Pétalos FIJOS, no cambian
  const color   = f.color || "#cccccc";

  // Tallo: curva suave desde el suelo hasta el centro de la flor
  const alturaTallo = limitar(Number(f.tamano) || 70, 0, SUELO - R - 10);
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
  const info = `${f.nombre} — Pétalos: ${petalos}, Hojas: ${hojas}, Tamaño: ${f.tamano} min`;

  // Abeja: fuera de los grupos de la flor, así no afecta sus animaciones
  const lado = i % 2 === 0 ? 1 : -1;
  const abeja = f.abeja ? dibujarAbeja(CX + lado * 62, cy - 22, lado, i) : "";

  return `
  <svg viewBox="0 0 ${ANCHO} ${ALTO}" role="img" class="flor-svg" aria-label="${esc(info)}">
    <title>${esc(info)}</title>
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
    ${abeja}
  </svg>`;
}

function dibujarJardin(contenedor) {
  contenedor.innerHTML = FLORES.map((f, i) => `
    <figure>
      ${dibujarFlor(f, i)}
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
    </header>
    <div class="campo">
      <section id="jardin" aria-label="${FLORES.length} flores"></section>
    </div>`;
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
