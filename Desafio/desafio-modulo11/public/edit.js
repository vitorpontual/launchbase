const formDelete = document.querySelector("#form-delete")
  formDelete.addEventListener("submit", (event) => {
     const confirmation = confirm("Deseja apagar?")
     if (!confirmation) {
	event.preventDefault()
     }
  })
