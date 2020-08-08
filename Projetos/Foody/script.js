const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener("click", function(){
       
        modalOverlay.querySelector('img').src = card.querySelector('img').src

        modalOverlay.querySelector('h3').innerHTML = card.querySelector('.card-title-id').innerHTML
       
        
        modalOverlay.querySelector('p').innerHTML = card.querySelector('.card-author').innerHTML
        

        modalOverlay.classList.add('active')
    })
}



document.querySelector('.close-modal').addEventListener('click', function(){
    modalOverlay.classList.remove('active')

})
