document.addEventListener('DOMContentLoaded', function() {

    // --- CRONÓMETRO ---
    // 1. Establece la fecha de la boda
    const fechaBoda = new Date("Dec 20, 2025 17:00:00").getTime();

    // 2. Actualiza el contador cada segundo
    const intervalo = setInterval(function() {
        const ahora = new Date().getTime();
        const distancia = fechaBoda - ahora;

        // 3. Cálculos de tiempo
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        // 4. Muestra el resultado en los elementos del HTML
        document.getElementById("dias").innerText = dias.toString().padStart(2, '0');
        document.getElementById("horas").innerText = horas.toString().padStart(2, '0');
        document.getElementById("minutos").innerText = minutos.toString().padStart(2, '0');
        document.getElementById("segundos").innerText = segundos.toString().padStart(2, '0');

        // 5. Si la cuenta atrás termina
        if (distancia < 0) {
            clearInterval(intervalo);
            document.getElementById("countdown").innerHTML = "<div class='col-12'><h3>¡Llegó el gran día!</h3></div>";
        }
    }, 1000);

    // --- NOMBRE DEL INVITADO (desde la URL) ---
    // Ejemplo de URL: index.html?invitado=Familia+Perez
    const urlParams = new URLSearchParams(window.location.search);
    const nombreInvitado = urlParams.get('invitado');

    if (nombreInvitado) {
        // Reemplaza los "+" con espacios y lo muestra en la página
        document.getElementById("nombre-invitado").innerText = nombreInvitado.replace(/\+/g, ' ');
    } else {
        // Si no hay nombre en la URL, puedes dejar un texto genérico
        document.getElementById("nombre-invitado").innerText = "Familia & Amigos";
    }
});
