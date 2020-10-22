const Mask = { 
   apply(input, foo) {
      input.value = input.value.replace(/\D/g, '')
      setTimeout(function(){
	 input.value = Mask[foo](input.value)
      }, 1)
   },
   formatPercentage(value){
      let divide

      if (value % 1000000 >= 10000){
	 divide = 1000000
      } else {
	 divide = 10000
      }

      console.log(divide)


      value = value.replace(/\D/g, '')
      return new Intl.NumberFormat('pt-BR', {
	 style: 'percent',
	 minimumFractionDigits: 2, 
	 maximumFractionDigits: 5,
      }).format(value/divide)
   },
   formatCPF(cpf){
      cpf = cpf.replace(/\D/g, '')
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      return cpf
   }
}
