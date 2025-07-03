// Lógica de arrastar e soltar para o jogo de cards
window.addEventListener('DOMContentLoaded', function() {
    const hand = document.getElementById('hand');
    const cards = document.querySelectorAll('.card');
    const board = document.getElementById('board');
    let dragged = null;
    let origin = null;

    cards.forEach(card => {
        card.addEventListener('dragstart', (e) => {
            dragged = card;
            // Salva a zona de origem
            origin = card.parentElement;
            card.classList.add('dragging');
        });
        card.addEventListener('dragend', (e) => {
            card.classList.remove('dragging');
        });
    });

    function allowDropZone(zone) {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            if (dragged) {
                zone.appendChild(dragged);
                dragged = null;
            }
        });
    }

    allowDropZone(board);
    allowDropZone(hand);
});
