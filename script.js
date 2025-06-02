// App state
const appState = {
  selected: "intro"
};

// Fade animation utility
function fadeIn(element) {
  element.classList.add("fade-enter");
  requestAnimationFrame(() => {
    element.classList.add("fade-enter-active");
  });
  setTimeout(() => {
    element.classList.remove("fade-enter", "fade-enter-active");
  }, 800);
}

// Switch section
function switchSection(section) {
  const intro = document.getElementById("introSection");
  const projects = document.getElementById("projectsSection");
  const introBtn = document.getElementById("introBtn");
  const projectsBtn = document.getElementById("projectsBtn");

  if (section === "intro") {
    intro.style.display = "block";
    projects.style.display = "none";
    introBtn.classList.add("active");
    projectsBtn.classList.remove("active");
    fadeIn(intro);
  } else {
    intro.style.display = "none";
    projects.style.display = "grid";
    projectsBtn.classList.add("active");
    introBtn.classList.remove("active");
    fadeIn(projects);
  }

  appState.selected = section;
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("introBtn").addEventListener("click", () => switchSection("intro"));
  document.getElementById("projectsBtn").addEventListener("click", () => switchSection("projects"));
});
document.getElementById('introBtn').addEventListener('click', () => {
  document.getElementById('introSection').style.display = 'block';
  document.getElementById('projectsSection').style.display = 'none';
  document.getElementById('introBtn').classList.add('active');
  document.getElementById('projectsBtn').classList.remove('active');
});

document.getElementById('projectsBtn').addEventListener('click', () => {
  document.getElementById('introSection').style.display = 'none';
  document.getElementById('projectsSection').style.display = 'grid';
  document.getElementById('projectsBtn').classList.add('active');
  document.getElementById('introBtn').classList.remove('active');
});
