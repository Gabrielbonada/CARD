// Espera o carregamento completo do DOM
window.addEventListener("DOMContentLoaded", function () {

  // ======= SELETORES ==========
  const hand = document.getElementById("hand");
  const cards = document.querySelectorAll(".card");
  const boards = document.querySelectorAll(".board");
  const btnBatalha = document.getElementById("btnBatalha");
  const loginBtn = document.getElementById("btnLogin");
  const loginModal = document.getElementById("loginModal");
  const battleModal = document.getElementById("battleModal");
  const closeLogin = loginModal?.querySelector(".close");
  const closeBattle = battleModal?.querySelector(".close");

  // ========= VARIÁVEIS =========
  let dragged = null;
  let origin = null;

  // ====== LÓGICA DE ARRASTAR E SOLTAR =======
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

  // Ativa áreas dropáveis
  boards.forEach((board) => allowDropZone(board));
  allowDropZone(hand);

  // ========= FUNÇÃO PARA ZONAS DROPÁVEIS =========
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
        // Impede que duas cartas fiquem no mesmo campo de batalha
        if (zone.classList.contains("board") && zone.children.length > 0) {
          alert("Este campo já tem uma carta!");
          return;
        }

        // Animação ao soltar a carta
        zone.appendChild(dragged);
        dragged.style.transition = "transform 0.3s ease";
        dragged.style.transform = "scale(1.1)";
        setTimeout(() => {
          dragged.style.transform = "scale(1)";
          dragged = null;
        }, 300);
      }
    });
  }

  // ========= BOTÃO DE BATALHA =========
  btnBatalha.addEventListener("click", () => {
    const [board1, board2] = boards;

    // Garante que ambos os lados tenham cartas
    if (board1.children.length === 0 || board2.children.length === 0) {
      alert("Ambos os campos precisam ter uma carta para batalhar!");
      return;
    }

    iniciarBatalha(board1, board2);
  });

  // ========= FUNÇÃO PRINCIPAL DE BATALHA =========
  function iniciarBatalha(board1, board2) {
    const carta1 = board1.querySelector(".card");
    const carta2 = board2.querySelector(".card");

    // Extrai os atributos da carta e calcula a média
    function calcularMedia(carta) {
      const texto = carta.querySelector(".desc").textContent;
      const ataque = parseInt(texto.match(/🗡️Ataque:\s*(\d+)/)[1]);
      const defesa = parseInt(texto.match(/🛡️defesa:\s*(\d+)/)[1]);
      const agilidade = parseInt(texto.match(/🏃Agilidade:\s*(\d+)/)[1]);
      const mana = parseInt(texto.match(/🔵 Mana:\s*(\d+)/)[1]);
      return (ataque + defesa + agilidade + mana) / 4;
    }

    const media1 = calcularMedia(carta1);
    const media2 = calcularMedia(carta2);

    let titulo = "";
    let texto = "";
    let icone = "";

    // Verifica vencedor ou empate
    if (media1 > media2) {
      titulo = "Vitória!";
      texto = `${carta1.querySelector("strong").textContent} venceu com média ${media1.toFixed(1)}!`;
      icone = "🏆";
      carta2.classList.add("derrotada");
      setTimeout(() => carta2.remove(), 400);
    } else if (media2 > media1) {
      titulo = "Vitória!";
      texto = `${carta2.querySelector("strong").textContent} venceu com média ${media2.toFixed(1)}!`;
      icone = "🏆";
      carta1.classList.add("derrotada");
      setTimeout(() => carta1.remove(), 400);
    } else {
      titulo = "Empate!";
      texto = `⚔️ Ambas as cartas têm média ${media1.toFixed(1)}.`;
      icone = "⚔️";
      carta1.classList.add("derrotada");
      carta2.classList.add("derrotada");
      setTimeout(() => {
        carta1.remove();
        carta2.remove();
      }, 400);
    }

    // Mostra modal com o resultado
    exibirModal(titulo, texto, icone);
  }

  // ========= EXIBIR MODAL DE BATALHA =========
  function exibirModal(titulo, texto, icone) {
    document.getElementById("modalTitle").textContent = titulo;
    document.getElementById("modalText").textContent = texto;
    document.getElementById("iconResult").textContent = icone;
    battleModal.style.display = "flex";
  }

  // ========= MODAL DE LOGIN =========
  closeLogin?.addEventListener("click", () => {
    loginModal.style.display = "none";
  });

  loginBtn?.addEventListener("click", () => {
    loginModal.style.display = "block";
  });

  // ========= FECHAMENTO DE MODAIS AO CLICAR FORA =========
  window.addEventListener("click", (e) => {
    if (e.target === loginModal) loginModal.style.display = "none";
    if (e.target === battleModal) battleModal.style.display = "none";
  });

});
