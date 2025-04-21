// STARS
const starsContainer = document.getElementById("stars");
const NUM_STARS = 100;

for (let i = 0; i < NUM_STARS; i++) {
  const star = document.createElement("div");
  const size = Math.random() > 0.5 ? 1 : 2;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.top = `${Math.random() * 100}vh`;
  star.style.left = `${Math.random() * 100}vw`;
  star.style.opacity = Math.random();
  starsContainer.appendChild(star);
}

// METEORS
const meteorContainer = document.getElementById("meteors");

function createMeteor() {
  const meteor = document.createElement("div");
  meteor.classList.add("meteor");
  meteor.style.top = `${Math.random() * window.innerHeight}px`;
  meteor.style.left = `${Math.random() * window.innerWidth}px`;
  meteor.style.animationDuration = `${Math.random() * 2 + 2}s`;

  meteorContainer.appendChild(meteor);

  // Remove after animation
  setTimeout(() => meteor.remove(), 3000);
}

// Create meteor every few seconds
setInterval(createMeteor, 1000);

// Función para obtener la hora actual
function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Aseguramos que los minutos y segundos siempre tengan dos dígitos
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // Formateamos la hora como HH:MM:SS
  const timeString = `${hours}:${minutes}:${seconds}`;

  // Actualizamos el contenido del botón
  document.getElementById("current-time").textContent = timeString;
}

// Actualizamos la hora cada segundo
setInterval(updateTime, 1000);

// Llamamos a la función para mostrar la hora inmediatamente al cargar la página
updateTime();

////////////////////////////////////////////////////////////////
const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X dentro del card
    const y = e.clientY - rect.top; // Mouse Y dentro del card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
    const rotateY = ((x - centerX) / centerX) * -10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});

/////////////////////////////////////////////////////////////////////////////////
async function loadProjects() {
  try {
    const res = await fetch("projects.json");
    const projects = await res.json();

    const container = document.getElementById("projects-container"); // Asegúrate de que esté correctamente referenciado.
    container.innerHTML = ""; // Limpiar contenido previo (si existe)

    // Crear tarjetas de proyectos
    projects.forEach((project, index) => {
      const card = document.createElement("div");
      card.className = "project-card tilt-card";
      card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" style="width:100%; border-radius: 10px; margin-bottom: 1rem;" />
        <div class="project-number">#${String(index + 1).padStart(2, "0")}</div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-list">
          ${project.technologies.map(tech => `<span class='tech-badge tech-${tech}'>${tech}</span>`).join(' ')}
        </div>
        <div class="buttons">
          <a href="${project.codeLink}" target="_blank" class="btn-link"><i class='fa-brands fa-github'></i> Code</a>
          <a href="${project.demoLink}" target="_blank" class="btn-link">Demo <i class='fa-solid fa-up-right-from-square'></i></a>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error cargando proyectos:", error);
  }
}

window.addEventListener("DOMContentLoaded", loadProjects);

// Typewriter effect for hero title
window.addEventListener("DOMContentLoaded", function () {
  if (window.Typewriter) {
    new Typewriter("#typewriter", {
      strings: ["Playground", "Mini Portfolio"],
      autoStart: true,
      loop: true,
      pauseFor: 1800,
      deleteSpeed: 60,
      delay: 70,
    });
  }
});
