const hide = document.querySelectorAll(".hide")
const info = document.querySelectorAll(".info")
const card = document.querySelectorAll(".card")

for (let i = 0; i < card.length; i++){
   card[i].addEventListener("click", function(){
      window.location.href = `/recipes/${i}`
   })
}

for ( let hidden in hide ) {
   hidden.addEventListener("click", function(){
      if(hidden.textContent == "Esconder"){
	 hidden.textContent = "Mostrar"
	 info.classList.add("off")
      }
      else {
	 hidden.textContent = "Escodner"
	 info.classList.remove("off")
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
