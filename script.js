document.addEventListener("DOMContentLoaded", () => {
  const introVideo = document.getElementById("introVideo");
  const startOverlay = document.getElementById("startOverlay");
  const startMediaBtn = document.getElementById("startMediaBtn");
  const enterContainer = document.getElementById("enterContainer");
  const enterButton = document.getElementById("enterButton");
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("mainContent");
  const bgMusic = document.getElementById("bgMusic");

  // 1. PRIMER CLIC: Iniciar Video + Música al mismo tiempo
  if (startMediaBtn) {
    startMediaBtn.addEventListener("click", () => {
      // Ocultar botón de inicio
      startOverlay.style.display = "none";

      // Reproducir video
      if (introVideo) {
        introVideo.play().catch(e => console.log(e));
      }

      // Reproducir música
      if (bgMusic) {
        bgMusic.play().catch(e => console.log(e));
      }

      // Mostrar el botón final de "Entrar a la celebración"
      if (enterContainer) {
        enterContainer.style.display = "flex";
      }
    });
  }

  // Si el video finaliza solo, pasamos automáticamente a la invitación
  if (introVideo) {
    introVideo.addEventListener("ended", () => {
      transicionAMain();
    });
  }

  // 2. SEGUNDO CLIC: Entrar a la invitación (la música sigue reproduciéndose)
  if (enterButton) {
    enterButton.addEventListener("click", () => {
      transicionAMain();
    });
  }

  function transicionAMain() {
    // Pausar video y ocultar loader
    if (introVideo) introVideo.pause();
    loader.style.display = "none";

    // Mostrar el contenido de la invitación
    mainContent.style.display = "block";

    // Garantizar que la música continúe si por algo se pausó
    if (bgMusic && bgMusic.paused) {
      bgMusic.play().catch(e => console.log(e));
    }
  }

  // =========================================
  // CUENTA REGRESIVA
  // =========================================
  const eventDate = new Date("October 10, 2026 14:00:00").getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const difference = eventDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      document.getElementById("days").innerText = days < 10 ? "0" + days : days;
      document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
      document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
      document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    }
  };

  setInterval(updateCountdown, 1000);
  updateCountdown();
});
