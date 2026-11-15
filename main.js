/* =====================================
   HARSHITA & SHISHIR
   MAIN INTERACTIONS
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Background golden particles

    const particleContainer = document.getElementById("particles");

    for (let i = 0; i < 45; i++) {
        const particle = document.createElement("span");

        particle.classList.add("particle");
        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDuration = (Math.random() * 8 + 7) + "s";
        particle.style.animationDelay = (Math.random() * 10) + "s";
        particle.style.opacity = Math.random();

        particleContainer.appendChild(particle);
    }

    // Elements

    const envelope = document.getElementById("envelope");
    const openButton = document.getElementById("openInvitation");
    const openText = document.getElementById("openText");

    const transition = document.getElementById("goldenTransition");
    const sparkleContainer = document.getElementById("transitionSparkles");
    const intro = document.getElementById("invitationIntro");

    let invitationOpened = false;

    // Create golden sparkle explosion

    function createSparkles() {

        sparkleContainer.innerHTML = "";

        for (let i = 0; i < 110; i++) {

            const sparkle = document.createElement("span");

            sparkle.classList.add("transition-sparkle");

            const angle = Math.random() * Math.PI * 2;
            const distance = 150 + Math.random() * 650;

            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            sparkle.style.setProperty("--move-x", `${x}px`);
            sparkle.style.setProperty("--move-y", `${y}px`);

            sparkle.style.animationDelay = Math.random() * 0.35 + "s";

            sparkleContainer.appendChild(sparkle);
        }
    }

    // Open invitation

    function openEnvelope() {

        if (invitationOpened) return;

        invitationOpened = true;

        envelope.classList.add("opening");

        openText.textContent = "OPENING YOUR INVITATION...";

        openButton.disabled = true;

        // Start golden transition

        setTimeout(() => {

            createSparkles();
            transition.classList.add("active");

        }, 700);

        // Reveal next screen

        setTimeout(() => {

            intro.classList.add("revealed");

            transition.classList.remove("active");

            window.scrollTo({
                top: intro.offsetTop,
                behavior: "smooth"
            });

        }, 2600);

    }

    openButton.addEventListener("click", openEnvelope);
    openText.addEventListener("click", openEnvelope);

    console.log("Wedding invitation loaded successfully ❤️");

});
