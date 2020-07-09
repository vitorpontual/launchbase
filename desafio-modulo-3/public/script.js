const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener('click', function(){
        const cursoId = card.getAttribute('id')
        /* modalOverlay.classList.add('active') */
        window.location.href = `https://rocketseat.com.br/${cursoId}`
    })
}





