document.addEventListener("DOMContentLoaded", () => {
  const introVideo = document.getElementById("introVideo");
  const startOverlay = document.getElementById("startOverlay");
  const startMediaBtn = document.getElementById("startMediaBtn");
  const enterContainer = document.getElementById("enterContainer");
  const enterButton = document.getElementById("enterButton");
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("mainContent");
  const bgMusic = document.getElementById("bgMusic");

  // 1. PRIMER CLIC: Inicia el video mudo y la música dancingqueen.mp3
  if (startMediaBtn) {
    startMediaBtn.addEventListener("click", () => {
      // Ocultar pantalla inicial
      startOverlay.style.display = "none";

      // Asegurar que el botón de entrada siga oculto durante el video
      if (enterContainer) {
        enterContainer.style.display = "none";
      }

      // Reproducir video mudo
      if (introVideo) {
        introVideo.muted = true;
        introVideo.play().catch(e => console.log(e));
      }

      // Reproducir la canción Dancing Queen
      if (bgMusic) {
        bgMusic.play().catch(e => console.log(e));
      }
    });
  }

  // 2. CUANDO EL VIDEO TERMINA: Se muestra el segundo botón
  if (introVideo) {
    introVideo.addEventListener("ended", () => {
      if (enterContainer) {
        enterContainer.style.display = "flex";
      }
    });
  }

  // 3. SEGUNDO CLIC: Pasa a la tarjeta de invitación
  if (enterButton) {
    enterButton.addEventListener("click", () => {
      // Ocultar video
      loader.style.display = "none";

      // Mostrar invitación
      mainContent.style.display = "block";

      // Mantener la música sonando sin interrumpir
      if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(e => console.log(e));
      }
    });
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
