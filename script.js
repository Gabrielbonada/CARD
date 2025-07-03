window.addEventListener("DOMContentLoaded", function () {
  const hand = document.getElementById("hand");
  const cards = document.querySelectorAll(".card");
  const boards = document.querySelectorAll(".board");
  let dragged = null;
  let origin = null;

  // Aplica a função de drop para todos os boards
  boards.forEach((board) => allowDropZone(board));
  allowDropZone(hand); // Também deixa a mão como zona de drop

  cards.forEach((card) => {
    card.addEventListener("dragstart", () => {
      dragged = card;
      origin = card.parentElement;
      card.classList.add("dragging");
    });
    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });
  });

  function allowDropZone(zone) {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault(); // Necessário para permitir o drop
    });
    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      if (dragged) {
        zone.appendChild(dragged);
        dragged = null;
      }
    });
  }
});
function allowDropZone(zone) {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.classList.add("hovered");
  });
  zone.addEventListener("dragleave", () => {
    zone.classList.remove("hovered");
  });
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("hovered");
    if (dragged) {
      zone.appendChild(dragged);
      dragged = null;
    }
  });
}
