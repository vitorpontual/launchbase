// promise

function doubleNumber(number1, number2) {
    const results = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve((number1 * 2) + (number2))
        },
        Math.floor(Math.random() * 100) + 1
        )
    })
    return results
}
let result = doubleNumber(5,0).then(function(result){
   console.log(result)
   doubleNumber(12, result).then(function(result){
      console.log(result)
      doubleNumber(2, result).then(function(result){
	 console.log(result)
      })
   })
})






