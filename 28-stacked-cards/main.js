"use strict";

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const colors = [
  { name: "cloud", hex: "#FDF5EE" },
  { name: "violet", hex: "#190933" },
  { name: "blush", hex: "#F0B4DF" },
  { name: "lavender", hex: "#BBBBFF" },
  { name: "violet", hex: "#190933" },
  { name: "blush", hex: "#F0B4DF" },
  { name: "lavender", hex: "#BBBBFF" },
  { name: "violet", hex: "#190933" },
  { name: "blush", hex: "#F0B4DF" },
  { name: "lavender", hex: "#BBBBFF" },
  { name: "violet", hex: "#190933" },
  { name: "blush", hex: "#F0B4DF" },
  { name: "lavender", hex: "#BBBBFF" },
];

const cards = document.querySelector(".cards");

// top of the file: declared once, outside everything
let mouseX = window.innerWidth / 2;
// start in the center, before the mouse moves
let mouseY = window.innerHeight / 2;

const positions = colors.map(() => ({
  x: mouseX,
  y: mouseY,
}));

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

cards.innerHTML = colors
  .map((color, index) => {
    return `<div class="card is-${color.name}" style="--i: ${index}">
        <div class="label">
          <p>${color.name}</p>
          <p>${color.hex}</p>
        </div>
      </div>`;
  })
  .join("");

const cardEls = document.querySelectorAll(".card");

// puts every card's center on its position (half the card: 360 / 2, 300 / 2)
const drawCards = () => {
  cardEls.forEach((card, index) => {
    card.style.transform = `translate(${positions[index].x - 180}px, ${positions[index].y - 150}px)`;
  });
};

const tick = () => {
  positions[0].x += (mouseX - positions[0].x) * 0.25;
  positions[0].y += (mouseY - positions[0].y) * 0.25;

  for (let i = 1; i < positions.length; i++) {
    positions[i].x += (positions[i - 1].x - positions[i].x) * 0.25;
    positions[i].y += (positions[i - 1].y - positions[i].y) * 0.25;
  }

  drawCards();
  requestAnimationFrame(tick);
};

if (!prefersReducedMotion) {
  requestAnimationFrame(tick);
} else {
  positions.forEach((position, index) => {
    position.x = window.innerWidth / 2 + index * -24;
    position.y = window.innerHeight / 2 + index * 32;
  });
  drawCards();
}
