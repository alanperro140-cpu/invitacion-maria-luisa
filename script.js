document.addEventListener("DOMContentLoaded", () => {
  const introVideo = document.getElementById("introVideo");
  const enterContainer = document.getElementById("enterContainer");
  const enterButton = document.getElementById("enterButton");
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("mainContent");
  const bgMusic = document.getElementById("bgMusic");

  // Mostrar el botón cuando termine el video intro
  if (introVideo) {
    introVideo.addEventListener("ended", () => {
      enterContainer.style.display = "flex";
    });

    // Respaldos en caso de que el video no reproduzca o no dispare el evento 'ended'
    introVideo.addEventListener("error", () => {
      enterContainer.style.display = "flex";
    });

    // Si pasan 8 segundos y no ha aparecido el botón, mostrarlo automáticamente
    setTimeout(() => {
      if (enterContainer.style.display !== "flex") {
        enterContainer.style.display = "flex";
      }
    }, 8000);
  }

  // Transición al hacer clic en ENTRAR
  if (enterButton) {
    enterButton.addEventListener("click", () => {
      // 1. Ocultar la pantalla de intro / video
      loader.style.display = "none";

      // 2. Mostrar el contenido principal
      mainContent.style.display = "block";

      // 3. Reproducir música de fondo
      if (bgMusic) {
        bgMusic.play().catch((error) => {
          console.log("Autoplay bloqueado por el navegador:", error);
        });
      }
    });
  }

  // =========================================
  // CUENTA REGRESIVA (10 de Octubre)
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
    } else {
      document.getElementById("days").innerText = "00";
      document.getElementById("hours").innerText = "00";
      document.getElementById("minutes").innerText = "00";
      document.getElementById("seconds").innerText = "00";
    }
  };

  setInterval(updateCountdown, 1000);
  updateCountdown();
});
