// Variables existentes
const openModalButton = document.getElementById("openModal");
const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("closeModal");
const openNewDocumentButton = document.getElementById("openNewDocument");
const blankPage = document.getElementById("blankPage");
const pagina1 = document.getElementById("paginaopcion1");
const pagina2 = document.getElementById("paginaopcion2");
const body = document.querySelector("body");
const boton1 = document.getElementById("button1");
const boton2 = document.getElementById("button2");


// Funciones para la animación del tulipán
function crearSVGTulipan() {
  return `

      <div class="tulipanes-grid">
          ${Array.from({ length: 24 }, (_, i) => `
              <div class="tulipan-container" id="tulipan-${i}">
                  <svg width="300" height="400" viewBox="0 0 300 400">
                      <!-- Tallo principal -->
                      <path id="tallo-${i}" class="path" d="M150 350 L150 250" 
                            stroke="#228B22" stroke-width="3" 
                            stroke-dasharray="1000" stroke-dashoffset="1000"/>
                      
                      <!-- Hojas -->
                      <path id="hoja1-${i}" class="path" 
                            d="M150 300 C120 290 110 270 130 260 C150 270 150 290 150 300" 
                            stroke="#32CD32" stroke-width="2" 
                            stroke-dasharray="1000" stroke-dashoffset="1000"/>
                      <path id="hoja2-${i}" class="path" 
                            d="M150 280 C180 270 190 250 170 240 C150 250 150 270 150 280" 
                            stroke="#32CD32" stroke-width="2" 
                            stroke-dasharray="1000" stroke-dashoffset="1000"/>
                      
                      <!-- Pétalos -->
                      <path id="petalo1-${i}" class="petal" 
                            d="M150 250 C120 240 110 210 130 190 C150 210 150 240 150 250" 
                            fill="#FF69B4" stroke="#FF1493" stroke-width="1"
                            stroke-dasharray="1000" stroke-dashoffset="1000"/>
                      <path id="petalo2-${i}" class="petal" 
                            d="M150 250 C180 240 190 210 170 190 C150 210 150 240 150 250" 
                            fill="#FF69B4" stroke="#FF1493" stroke-width="1"
                            stroke-dasharray="1000" stroke-dashoffset="1000"/>
                      <path id="petalo3-${i}" class="petal" 
                            d="M150 250 C130 230 130 200 150 180 C170 200 170 230 150 250" 
                            fill="#FF1493" stroke="#FF1493" stroke-width="1"
                            stroke-dasharray="1000" stroke-dashoffset="1000"/>
                  </svg>
              </div>
          `).join('')}
      </div>
  `;
}

function agregarEstilosTulipan() {
  const estilos = document.createElement('style');
  estilos.textContent = `
      .tulipanes-grid {
           display: grid;
    grid-template-columns: repeat(12, 1fr); /* 12 columnas */
    gap: 2px; /* Espacio reducido entre los tulipanes */
    padding: 20px; /* Ajusté el padding */
    justify-items: center;
    align-items: center;
      }
      .tulipan-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          margin-left: -150px;
      }
      .tulipan-container.visible {
          opacity: 1;
          transform: translateY(0);
      }
      .path {
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
      }
      .petal {
          opacity: 0;
          fill-opacity: 0;
          transition: fill-opacity 1s ease;
      }
      .Opcion1-container {
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
          padding: 20px;
      }
  `;
  document.head.appendChild(estilos);
}

function animarPath(elementId, duracion) {
  return new Promise(resolve => {
      const elemento = document.getElementById(elementId);
      if (elemento) {
          elemento.style.transition = `stroke-dashoffset ${duracion}ms ease-in-out`;
          elemento.style.strokeDashoffset = '0';
          setTimeout(resolve, duracion);
      } else {
          resolve();
      }
  });
}

function revelarPetalo(elementId, duracion) {
  return new Promise(resolve => {
      const petalo = document.getElementById(elementId);
      if (petalo) {
          petalo.style.opacity = '1';
          petalo.style.transition = `stroke-dashoffset ${duracion}ms ease-in-out, fill-opacity ${duracion}ms ease-in-out`;
          petalo.style.strokeDashoffset = '0';
          petalo.style.fillOpacity = '1';
          setTimeout(resolve, duracion);
      } else {
          resolve();
      }
  });
}


async function animarTulipan(index) {
  // Hacer visible el contenedor del tulipán
  const contenedor = document.getElementById(`tulipan-${index}`);
  contenedor.classList.add('visible');

  // Animar el tallo (más lento como en el original)
const animacionTallo = animarPath(`tallo-${index}`, 9000);

  // Animar hojas
  const animacionHojas = new Promise(resolve => {
    setTimeout(() => {
      Promise.all([
        animarPath(`hoja1-${index}`, 5000),
              animarPath(`hoja2-${index}`, 5000)
          ]).then(resolve);
      }, 1900);
  });

  const animacionPetalos1 = new Promise(resolve => {
    setTimeout(() => {
        Promise.all([
     revelarPetalo(`petalo1-${index}`, 3000)
        ]).then(resolve); // Resolviendo cuando ambas hojas terminan
    }, 3000);
});

const animacionPetalos2 = new Promise(resolve => {
  setTimeout(() => {
      Promise.all([
   revelarPetalo(`petalo2-${index}`, 3000)
      ]).then(resolve); // Resolviendo cuando ambas hojas terminan
  }, 3500);
});

const animacionPetalos3 = new Promise(resolve => {
  setTimeout(() => {
      Promise.all([
   revelarPetalo(`petalo3-${index}`, 3000)
      ]).then(resolve); // Resolviendo cuando ambas hojas terminan
  }, 4000);
});


await animacionTallo; // Esperamos a que termine el tallo
await animacionHojas; // Esperamos a que terminen las hojas
await animacionPetalos1;
await animacionPetalos2;
await animacionPetalos3;



}

async function iniciarAnimacionTulipanes() {
  const tulipanesAnimados = [];

  for (let i = 0; i < 24; i++) {
      tulipanesAnimados.push(animarTulipan(i)); // Añadir cada animación de tulipán a la lista de promesas
  }

  // Esperar a que todos los tulipanes terminen de animarse
  await Promise.all(tulipanesAnimados);

  // Una vez que todos los tulipanes hayan terminado, mostramos el h1 con el mensaje
  const frase = document.createElement('h1');
  frase.textContent = "¡TE AMO MI PRECIOSAAAA! 🌷";
  frase.style.fontSize = '36px';
  frase.style.fontWeight = 'bold';
  frase.style.textAlign = 'center';
  frase.style.color = 'purple';
  frase.style.animation = 'fadeIn 2s ease-in-out';
  
  // Posicionamos el h1 en la parte superior de la página
  frase.style.position = 'absolute';
  frase.style.top = '20px';  // Se puede ajustar la distancia desde la parte superior
  frase.style.left = '50%';
  frase.style.transform = 'translateX(-50%)'; // Centra el texto horizontalmente

  // Agregar colores graduales a la frase
  const colors = ['#FF1493', '#32CD32', '#FF69B4', '#FF4500', '#8A2BE2'];
  let colorIndex = 0;

  setInterval(() => {
    frase.style.color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
  }, 1000);

  document.body.appendChild(frase);
}


// Event Listeners originales modificados
openModalButton.onclick = function() {
    modal.style.display = "block";
}

closeModalButton.onclick = function() {
    modal.style.display = "none";
}

openNewDocumentButton.onclick = function() {
    body.innerHTML = '';
    blankPage.style.display = "block";
    body.appendChild(blankPage);
}

boton1.onclick = function() {
  body.innerHTML = '';
  agregarEstilosTulipan();
  pagina1.innerHTML = crearSVGTulipan();
  pagina1.style.display = "block";
  body.appendChild(pagina1);
  setTimeout(iniciarAnimacionTulipanes, 100);
}
// Función para crear el SVG del corazón
function crearSVGCorazon() {
  return `
    <div class="corazon-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <!-- Contorno del corazón con líneas delgadas -->
        <path id="corazon" d="M200 350 L80 230 C40 180 40 120 120 90 C160 70 200 110 200 110 C200 110 240 70 280 90 C360 120 360 180 320 230 L200 350 Z" 
              fill="none" stroke="red" stroke-width="4" stroke-dasharray="1500" stroke-dashoffset="1500"/>
        
        <!-- Relleno del corazón con animación de pintura -->
        <path id="corazon-fill" d="M200 350 L80 230 C40 180 40 120 120 90 C160 70 200 110 200 110 C200 110 240 70 280 90 C360 120 360 180 320 230 L200 350 Z" 
              fill="red" opacity="0"/>
      </svg>
    </div>
  `;
}

// Función para agregar los estilos del corazón
function agregarEstilosCorazon() {
  const estilos = document.createElement('style');
  estilos.textContent = `
    body {
      background-color: black;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .corazon-container {
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .corazon-container.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .mensaje-corazon {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 36px;
      font-weight: bold;
      color: white;
      opacity: 0;
      animation: fadeIn 3s ease-out forwards;
    }

    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(estilos);
}

// Función para animar el trazo y el relleno del corazón
function animarCorazon() {
  const corazon = document.getElementById('corazon');
  const corazonFill = document.getElementById('corazon-fill');

  // Iniciar la animación del trazo con stroke-dasharray
  corazon.style.transition = 'stroke-dashoffset 6s ease-in-out'; // Animación lenta para el trazo
  corazon.style.strokeDashoffset = '0'; // Desaparecer el offset para revelar el trazo lentamente

  // Animar el relleno después de que el trazo haya terminado
  setTimeout(() => {
    corazonFill.style.transition = 'opacity 2s ease-in-out'; // Transición suave para el relleno
    corazonFill.style.opacity = '1'; // Hacer visible el relleno después del trazo
    
    // Después de que se complete la animación, agregar el mensaje
    setTimeout(() => {
      const mensaje = document.createElement('h1');
      mensaje.textContent = "Te amo infinito infinito amorcito 🧡!!";  // Cambia el mensaje aquí si deseas
      mensaje.classList.add('mensaje-corazon');  // Usar la clase con animación
      document.body.appendChild(mensaje);

      // Llamar a la función para mostrar los corazones flotantes
   
    }, 5000); // Aparecer después de la animación del relleno
  }, 6000); // Comienza el relleno después de 6 segundos (cuando termina el trazo)
}

function mostrarCorazon() {
  body.innerHTML = ''; // Limpiar la página antes de mostrar el contenido
  agregarEstilosCorazon(); // Agregar estilos para la animación
  pagina2.innerHTML = crearSVGCorazon(); // Crear el SVG del corazón
  pagina2.style.display = "block"; // Mostrar la página 2
  body.appendChild(pagina2); // Agregar la página al cuerpo

  // Esperar un momento y luego animar el corazón
  setTimeout(() => {
    const contenedorCorazon = document.querySelector('.corazon-container');
    contenedorCorazon.classList.add('visible'); // Hacer visible el corazón
    animarCorazon(); // Iniciar la animación del trazo y relleno
  }, 100);
}


// Event listener para el botón 2 (opción 2)
boton2.onclick = function() {

  mostrarCorazon();
 
 function crearCorazon() {
    for (let i = 0; i < 3; i++) {  // Crea 3 corazones en cada llamada
        const corazon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        corazon.setAttribute("viewBox", "0 0 24 24");
        corazon.setAttribute("class", "corazon");
        corazon.innerHTML = `
            <path fill="red" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>`;

        document.body.appendChild(corazon);

        let tamaño = Math.random() * 40 + 10; // Tamaño aleatorio entre 10px y 50px
        corazon.style.width = `${tamaño}px`;
        corazon.style.height = `${tamaño}px`;

        let inicioX = Math.random() * window.innerWidth;
        corazon.style.position = "absolute";
        corazon.style.left = `${inicioX}px`;
        corazon.style.bottom = "0px";

        let duracion = Math.random() * 3 + 3; // Duración entre 3s y 6s
        corazon.style.animation = `flotar ${duracion}s ease-in-out forwards`;

        setTimeout(() => {
            corazon.remove();
        }, duracion * 1000);
    }
}

setTimeout(() => {
  // Genera corazones cada 500ms
  setInterval(crearCorazon, 500);
}, 9000);


};

