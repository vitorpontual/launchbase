function randomix(number, type){
   let randomizer = Math.floor(Math.random() * number)
   return type[randomizer]
}


function type_class(){
   let characters = 'DP'
   return characters.charAt(Math.floor(Math.random() * 2))
   
}

module.exports = {
   randomix,
   type_class
} 


