// BACKGROUND PARTICLES
const particles = document.getElementById("particles");

for (let i = 0; i < 45; i++) {
  const particle = document.createElement("span");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDuration = (7 + Math.random() * 12) + "s";
  particle.style.animationDelay = (Math.random() * 10) + "s";
  particle.style.opacity = Math.random() * 0.7;
  particles.appendChild(particle);
}


/* ROYAL PALACE OPENING */

const welcomeScreen = document.getElementById("welcomeScreen");
const openInvitation = document.getElementById("openInvitation");
const invitationIntro = document.getElementById("invitationIntro");
const petalsContainer = document.getElementById("palacePetals");

let invitationStarted = false;

// Create floating champagne-gold petals
for (let i = 0; i < 32; i++) {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.left = Math.random() * 100 + "%";
  petal.style.animationDuration = (9 + Math.random() * 12) + "s";
  petal.style.animationDelay = (Math.random() * 12) + "s";
  petal.style.opacity = 0.3 + Math.random() * 0.6;
  petalsContainer.appendChild(petal);
}

// Enter the royal invitation
openInvitation.addEventListener("click", () => {
  if (invitationStarted) return;

  invitationStarted = true;
  openInvitation.textContent = "WELCOME TO OUR CELEBRATION";

  welcomeScreen.classList.add("palace-exit");

  setTimeout(() => {
    invitationIntro.scrollIntoView({ behavior: "smooth" });
  }, 500);
});

// Continue to wedding date
const continueButton = document.getElementById("continueToDate");
const dateSection = document.getElementById("dateSection");

continueButton.addEventListener("click", () => {
  dateSection.scrollIntoView({ behavior: "smooth" });
});

// CONTINUE TO SCRATCH CARD
const continueButton = document.getElementById("continueToDate");
const dateSection = document.getElementById("dateSection");

continueButton.addEventListener("click", () => {
  dateSection.scrollIntoView({ behavior: "smooth" });
});

// SCRATCH CARD
const scratchCanvas = document.getElementById("scratchCanvas");
const scratchCard = document.getElementById("scratchCard");
const scratchContext = scratchCanvas.getContext("2d");

let isScratching = false;
let dateRevealed = false;

function setupScratchCard() {
  const rect = scratchCard.getBoundingClientRect();
  const pixelRatio = window.devicePixelRatio || 1;

  scratchCanvas.width = rect.width * pixelRatio;
  scratchCanvas.height = rect.height * pixelRatio;

  scratchContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const gradient = scratchContext.createLinearGradient(0, 0, rect.width, rect.height);
  gradient.addColorStop(0, "#d6bd82");
  gradient.addColorStop(0.5, "#f0dfb5");
  gradient.addColorStop(1, "#bd9858");

  scratchContext.globalCompositeOperation = "source-over";
  scratchContext.fillStyle = gradient;
  scratchContext.fillRect(0, 0, rect.width, rect.height);

  scratchContext.fillStyle = "#70572f";
  scratchContext.textAlign = "center";
  scratchContext.font = "600 12px Montserrat, sans-serif";
  scratchContext.fillText("✦  SCRATCH TO REVEAL  ✦", rect.width / 2, rect.height / 2 - 5);

  scratchContext.font = "10px Montserrat, sans-serif";
  scratchContext.fillText("A SPECIAL DATE AWAITS YOU", rect.width / 2, rect.height / 2 + 20);

  scratchContext.globalCompositeOperation = "destination-out";
}

function getPointerPosition(event) {
  const rect = scratchCanvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function scratchAt(event) {
  if (!isScratching || dateRevealed) return;

  const position = getPointerPosition(event);

  scratchContext.beginPath();
  scratchContext.arc(position.x, position.y, 23, 0, Math.PI * 2);
  scratchContext.fill();

  checkScratchProgress();
}

function checkScratchProgress() {
  const width = scratchCanvas.width;
  const height = scratchCanvas.height;
  const pixels = scratchContext.getImageData(0, 0, width, height).data;

  let transparentPixels = 0;
  let totalPixels = 0;

  // Check every 16th pixel to keep the calculation lightweight.
  for (let i = 3; i < pixels.length; i += 64) {
    totalPixels++;

    if (pixels[i] < 100) {
      transparentPixels++;
    }
  }

  const scratchedPercentage = transparentPixels / totalPixels;

  if (scratchedPercentage > 0.35) {
    revealDate();
  }
}

scratchCanvas.addEventListener("pointerdown", (event) => {
  if (dateRevealed) return;

  isScratching = true;
  scratchCanvas.setPointerCapture(event.pointerId);
  scratchAt(event);
});

scratchCanvas.addEventListener("pointermove", scratchAt);

scratchCanvas.addEventListener("pointerup", () => {
  isScratching = false;
});

scratchCanvas.addEventListener("pointercancel", () => {
  isScratching = false;
});

// REVEAL DATE BUTTON
const revealDateButton = document.getElementById("revealDateButton");

function revealDate() {
  if (dateRevealed) return;

  dateRevealed = true;
  isScratching = false;

  scratchContext.clearRect(
    0,
    0,
    scratchCanvas.width,
    scratchCanvas.height
  );

  scratchCanvas.style.display = "none";
  revealDateButton.style.display = "none";

  document.getElementById("countdownArea").classList.add("visible");

  startCountdown();
}

revealDateButton.addEventListener("click", revealDate);

// COUNTDOWN
const weddingDate = new Date("2027-01-28T19:00:00+05:30").getTime();

let countdownInterval;

function startCountdown() {
  updateCountdown();

  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const now = Date.now();
  const difference = weddingDate - now;

  if (difference <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

// INITIALIZE SCRATCH CARD AFTER PAGE LOAD
window.addEventListener("load", () => {
  setupScratchCard();
});

window.addEventListener("resize", () => {
  if (!dateRevealed) {
    setupScratchCard();
  }
});
