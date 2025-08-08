const allExcuses = [
  "Need to reorganize my sock drawer.",
  "Let me just make one more cup of tea.",
  "My goldfish needs emotional support.",
  "I forgot how to start.",
  "Polishing my procrastination skills.",
  "Am I even human without this?",
  "I’m currently in a deep thought spiral.",
  "Waiting for a sign from the universe.",
  "Just five more minutes of scrolling.",
  "I need to find the perfect playlist first."
];

// Select the button and excuse elements
const btn = document.getElementById("doLaterBtn");
const excuseText = document.getElementById("excuseText");

// Confetti settings
const confettiSettings = {
  target: 'confetti-canvas',
  max: 150, // Maximum number of confetti pieces
  size: 1.2, // Size of confetti
  animate: true,
  props: ['circle', 'square', 'triangle', 'line'], // Shapes of confetti
  colors: [[255, 78, 138], [255, 142, 179], [255, 255, 255]], // Pink and white colors
  clock: 25,
  rotate: true,
  width: window.innerWidth,
  height: window.innerHeight,
  start_from_edge: false,
  respawn: true
};

const confetti = new ConfettiGenerator(confettiSettings);

// Button click logic
btn.addEventListener('click', () => {
  // Select a random excuse
  const randomExcuse = allExcuses[Math.floor(Math.random() * allExcuses.length)];

  // Display the excuse
  excuseText.textContent = randomExcuse;
  excuseText.style.display = "block";

  // Trigger confetti
  confetti.render();

  // Stop confetti after 3 seconds
  setTimeout(() => confetti.clear(), 3000);
});
