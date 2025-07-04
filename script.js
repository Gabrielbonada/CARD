window.addEventListener("DOMContentLoaded", function () {
  const hand = document.getElementById("hand");
  const cards = document.querySelectorAll(".card");
  const boards = document.querySelectorAll(".board");
  const btnBatalha = document.getElementById("btnBatalha");
  let dragged = null;
  let origin = null;

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

  boards.forEach((board) => allowDropZone(board));
  allowDropZone(hand);

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
        if (zone.classList.contains("board") && zone.children.length > 0) {
          alert("Este campo já tem uma carta!");
          return;
        }

        zone.appendChild(dragged);
        dragged = null;
      }
    });
  }

  // 🎯 Clica no botão para iniciar batalha
  btnBatalha.addEventListener("click", () => {
    const [board1, board2] = boards;

    if (board1.children.length === 0 || board2.children.length === 0) {
      alert("Ambos os campos precisam ter uma carta para batalhar!");
      return;
    }

    iniciarBatalha(board1, board2);
  });

  // ⚔️ Função de batalha
  function iniciarBatalha(board1, board2) {
    const carta1 = board1.querySelector(".card");
    const carta2 = board2.querySelector(".card");

    const poder1 = parseInt(carta1.dataset.power);
    const poder2 = parseInt(carta2.dataset.power);

    let resultado = "";

    if (poder1 > poder2) {
      resultado = `🛡️ ${carta1.querySelector("strong").textContent} venceu!`;
      carta2.remove();
    } else if (poder2 > poder1) {
      resultado = `🛡️ ${carta2.querySelector("strong").textContent} venceu!`;
      carta1.remove();
    } else {
      resultado = "⚔️ Empate!";
      carta1.remove();
      carta2.remove();
    }

    setTimeout(() => alert(resultado), 200);
  }
});
const track = document.querySelector(".carousel-track");
const btnPrev = document.getElementById("prevBtn");
const btnNext = document.getElementById("nextBtn");

let scrollAmount = 0;
const scrollStep = 300; // quanto andar por clique

btnNext.addEventListener("click", () => {
  scrollAmount += scrollStep;
  track.scrollTo({
    left: scrollAmount,
    behavior: "smooth"
  });
});

btnPrev.addEventListener("click", () => {
  scrollAmount -= scrollStep;
  if (scrollAmount < 0) scrollAmount = 0;
  track.scrollTo({
    left: scrollAmount,
    behavior: "smooth"
  });
});
const container = document.querySelector(".carousel-container");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

nextBtn.addEventListener("click", () => {
  container.scrollBy({ left: 400, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  container.scrollBy({ left: -400, behavior: "smooth" });
});
