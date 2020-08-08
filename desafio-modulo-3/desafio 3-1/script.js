const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card1')

const maximize = document.querySelector('.maximize-modal')
const minimize = document.querySelector('.minimize-modal')
const modal = document.querySelector('.modal')

for (let card of cards) {
    card.addEventListener('click', function(){
        const cursoId = card.getAttribute('id')
        modalOverlay.classList.add('active')
        modalOverlay.querySelector('iframe').src = `https://rocketseat.com.br/${cursoId}`
    })
}



maximize.addEventListener('click', function(){
    modal.classList.add('maximize')
    const cards = card.getAttribute('id')
    if(modal.classList.contains('maximize')){
        modal.querySelector('iframe').src = `https://rocketseat.com.br/${cards}`
    }
})

minimize.addEventListener('click', function(){
    modal.classList.remove('maximize')
    const cards = card.getAttribute('id')
    modal.querySelector('iframe').src = `https://rocketseat.com.br/${cards}`
})


document.querySelector('.close-modal').addEventListener('click', function(){
    modalOverlay.classList.remove('active')
    modal.classList.remove('maximize')
})

