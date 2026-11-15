
/* =====================================
   HARSHITA & SHISHIR
   MAIN INTERACTIONS
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Generate floating golden particles

    const particleContainer = document.getElementById("particles");

    for (let i = 0; i < 45; i++) {

        const particle = document.createElement("span");

        particle.classList.add("particle");

        particle.style.left = Math.random() * 100 + "%";

        particle.style.animationDuration =
            (Math.random() * 8 + 7) + "s";

        particle.style.animationDelay =
            (Math.random() * 10) + "s";

        particle.style.opacity = Math.random();

        particleContainer.appendChild(particle);
    }

    // Envelope interaction

    const envelope = document.getElementById("envelope");
    const openButton = document.getElementById("openInvitation");
    const openText = document.getElementById("openText");

    function openEnvelope() {

        if (envelope.classList.contains("opening")) return;

        envelope.classList.add("opening");

        openText.textContent = "YOUR INVITATION AWAITS...";

        openButton.disabled = true;
    }

    openButton.addEventListener("click", openEnvelope);
    openText.addEventListener("click", openEnvelope);

    console.log("Wedding invitation loaded successfully ❤️");

});
