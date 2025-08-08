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

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("doLaterBtn");
  const excuseText = document.getElementById("excuseText");

  btn.addEventListener("click", () => {
    // Select a random excuse from the array
    const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
    
    // Show the random excuse
    excuseText.textContent = randomExcuse;
    excuseText.style.display = "block";
  });
});
