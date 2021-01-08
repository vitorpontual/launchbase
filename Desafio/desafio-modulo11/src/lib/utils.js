module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()

        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age--
        }
        return age
    },
    date: function(timestamp){
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

       return {
	  day,
	  month,
	  year,
	  iso: `${year}-${month}-${day}`,
	  birthday: `${day}/${month}`,
	  format: `${day}/${month}/${year}`
       }
    },
   grade: (year)=> {
      switch(year) {
	 case "5EF":
	    return "5º Ano Ensino Fundamenal"
	 case "6EF":
	    return "6º Ano Ensino Fundamental"
	 case "7EF":
	    return "7º Ano Ensino Fundamental"
	 case "8EF":
	    return "8º Ano Ensino Fundamental"
	 case "9EF":
	    return "9º Ano Ensino Fundamental"
	 case "1EM":
	    return "1º Ano Ensino Médio"
	 case "2EM":
	    return "2º Ano Ensino Médio"
	 case "3EM":
	    return "3º Ano Ensino Médio"
	 default:
	    return "Não informado"
      }
   }
}
