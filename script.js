const excuses = [
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

const btn = document.getElementById('doLaterBtn');
const excuseText = document.getElementById('excuseText');
const popSound = document.getElementById('popSound');

btn.addEventListener('click', () => {
  // Play click sound
  popSound.currentTime = 0;
  popSound.play();

  // Generate random excuse
  const excuse = excuses[Math.floor(Math.random() * excuses.length)];
  excuseText.textContent = excuse;
});
