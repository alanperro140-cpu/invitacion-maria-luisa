const video = document.getElementById("introVideo");
const loader = document.getElementById("loader");
const enterContainer = document.getElementById("enterContainer");
const enterButton = document.getElementById("enterButton");
const mainContent = document.getElementById("mainContent");
const music = document.getElementById("introMusic");

let countdownStarted = false;

/* =========================================
MÚSICA
========================================= */

function intentarMusica() {

```
if (!music) return;

music.volume = 0.35;

const promesa = music.play();

if (promesa !== undefined) {

    promesa.catch(() => {

        console.log("El navegador bloqueó el autoplay.");

    });

}
```

}

/* =========================================
INICIO
========================================= */

window.addEventListener("load", () => {

```
intentarMusica();

/*
 * Intentamos iniciar el video.
 * Si el navegador lo bloquea, el usuario
 * todavía podrá interactuar con la página.
 */

if (video) {

    const videoPromise = video.play();

    if (videoPromise !== undefined) {

        videoPromise.catch(() => {

            console.log("El navegador bloqueó el autoplay del video.");

        });

    }

}
```

});

/* =========================================
CUANDO TERMINA EL VIDEO
========================================= */

if (video) {

```
video.addEventListener("ended", () => {

    mostrarBotonEntrada();

});
```

}

/* =========================================
ERROR DEL VIDEO
========================================= */

if (video) {

```
video.addEventListener("error", () => {

    console.log("No se pudo cargar video.mp4.");

    mostrarBotonEntrada();

});
```

}

/* =========================================
MOSTRAR BOTÓN
========================================= */

function mostrarBotonEntrada() {

```
if (!enterContainer) return;

enterContainer.style.display = "flex";
```

}

/* =========================================
ENTRAR A LA INVITACIÓN
========================================= */

if (enterButton) {

```
enterButton.addEventListener("click", () => {

    /*
     * La interacción del usuario permite
     * intentar reproducir la música.
     */

    intentarMusica();


    /*
     * Animación de salida
     */

    loader.style.transition = "opacity .8s ease";
    loader.style.opacity = "0";


    setTimeout(() => {

        loader.style.display = "none";

        mainContent.style.display = "block";

        iniciarCuentaRegresiva();

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, 800);

});
```

}

/* =========================================
CUENTA REGRESIVA
========================================= */

function iniciarCuentaRegresiva() {

```
if (countdownStarted) return;

countdownStarted = true;


/*
 * Evento:
 * Sábado 10 de octubre de 2026
 * 2:00 PM
 *
 * La fecha utiliza la hora local
 * del dispositivo del visitante.
 */

const fechaEvento = new Date(
    "October 10, 2026 14:00:00"
).getTime();


function actualizarCuentaRegresiva() {

    const ahora = new Date().getTime();

    const diferencia = fechaEvento - ahora;


    if (diferencia <= 0) {

        actualizarNumero("days", 0);
        actualizarNumero("hours", 0);
        actualizarNumero("minutes", 0);
        actualizarNumero("seconds", 0);

        return;

    }


    const dias = Math.floor(
        diferencia /
        (1000 * 60 * 60 * 24)
    );


    const horas = Math.floor(
        (diferencia %
        (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );


    const minutos = Math.floor(
        (diferencia %
        (1000 * 60 * 60)) /
        (1000 * 60)
    );


    const segundos = Math.floor(
        (diferencia %
        (1000 * 60)) /
        1000
    );


    actualizarNumero("days", dias);
    actualizarNumero("hours", horas);
    actualizarNumero("minutes", minutos);
    actualizarNumero("seconds", segundos);

}


actualizarCuentaRegresiva();

setInterval(actualizarCuentaRegresiva, 1000);
```

}

/* =========================================
ACTUALIZAR NÚMEROS
========================================= */

function actualizarNumero(id, numero) {

```
const elemento = document.getElementById(id);

if (!elemento) return;

elemento.textContent =
    String(numero).padStart(2, "0");
```

}

/* =========================================
ACTIVAR MÚSICA AL PRIMER TOQUE
========================================= */

document.addEventListener("pointerdown", () => {

```
if (music && music.paused) {

    intentarMusica();

}
```

}, { once: true });

