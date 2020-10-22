function printDouble(number1, number2, callback){
   setTimeout(() => {
      const total = number1 * 2 + number2
      console.log(total)
      callback(total)
   }, Math.floor(Math.random() * 100) + 1)
}

printDouble(5, 0, function(total) {
   printDouble(12, total, function(total){
	 printDouble(2, total, function(){})
   })
})
