function checkAllFields(body){
   const keys = Object.keys(body)
   for (key of keys){
      if(body[key] == ''){
	 return{
	    teacher:body,
	    error: 'Por favor, preencha os campos!'
	 }
      }
   }
}

async function post(req, res, next){
   const fillAllFields = checkAllFields(req.body)
   if(fillAllFields){
      return res.render('teachers/create', fillAllFields)
   }

   next()
}

async function put(req, res, next){
   const fillAllFields = checkAllFields(req.body)
   if(fillAllFields){
      return res.render('teachers/edit', fillAllFields)
   }

   next()
}

module.exports = {
   post,
   put
}
