
const buttons = document.querySelectorAll('button')
const hidden = document.querySelectorAll('.hide')
const cards = document.querySelectorAll('.card')

for ( let card of cards) {
    card.addEventListener("click", function(){
        const recipe = card.getAttribute("id")
       window.location.href = `http://localhost:5000/recipes/${recipe}`
    })
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {

        if (buttons[i].textContent == 'ESCONDER') {
            buttons[i].innerHTML = 'MOSTRAR'
            hidden[i].classList.add('active')
        } else {
            buttons[i].innerHTML = 'ESCONDER'
            hidden[i].classList.remove('active')
        }
    })
}
/* for (let card of cards) {
    card.addEventListener("click", function(){
       
        modalOverlay.querySelector('img').src = card.querySelector('img').src

        modalOverlay.querySelector('h3').innerHTML = card.querySelector('.card-title-id').innerHTML
       
        
        modalOverlay.querySelector('p').innerHTML = card.querySelector('.card-author').innerHTML
        

        modalOverlay.classList.add('active')
    })
}



document.querySelector('.close-modal').addEventListener('click', function(){
    modalOverlay.classList.remove('active')

}) */
