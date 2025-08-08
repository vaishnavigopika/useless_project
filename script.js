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

let remainingExcuses = [...allExcuses];

const btn = document.getElementById('doLaterBtn');
const excuseText = document.getElementById('excuseText');

// 👇 Add this exactly as it is — this sets up the Hello Kitty confetti
const confettiSettings = {
  target: 'confetti-canvas',
  max: 40,
  size: 1.2,
  animate: true,
  props: ['image'],
  clock: 20,
  rotate: true,
  width: window.innerWidth,
  height: window.innerHeight,
  start_from_edge: true,
  respawn: false,
  images: [
    {
      src: 'assets/hello-kitty.png', // Make sure this image is placed in assets/
      width: 32,
      height: 32
    }
  ]
};

const confetti = new ConfettiGenerator(confettiSettings);

// 👇 Main button click logic
btn.addEventListener('click', () => {
  if (remainingExcuses.length === 0) {
    excuseText.textContent = "You’ve run out of excuses. Time to actually work!";
    btn.disabled = true;
    btn.textContent = "No More Excuses";
    return;
  }

  // Get a random excuse that hasn't been used
  const randomIndex = Math.floor(Math.random() * remainingExcuses.length);
  const excuse = remainingExcuses.splice(randomIndex, 1)[0];
  excuseText.textContent = excuse;

  // Trigger confetti
  confetti.render();

  // Stop it after a short delay
  setTimeout(() => confetti.clear(), 1000);
});
