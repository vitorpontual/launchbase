// async/await
async function doubleNumber(number1, number2){
   return await new Promise( (resolve, reject) => {
      setTimeout(() => {
	 resolve((number1 * 2) + number2)
      },
	 Math.floor(Math.random() * 100) + 1000
      )
   } )
}

const results = async () => {
   let result = await doubleNumber(5, 0)
   console.log(result)
   result = await doubleNumber(12, result)
   console.log(result)
   result =await doubleNumber(2, result)
   console.log(result)

}

results()
