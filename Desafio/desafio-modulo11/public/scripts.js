const currentPage = location.pathname
const menuItems = document.querySelectorAll(" header .links a")

for (item of menuItems) {
   if (currentPage.includes(item.getAttribute('href'))){
      item.classList.add('active')
   }
}

function paginate(selectedPage, totalPage) {
   let pages = [],
      oldPage

   for (let currentPage = 1; currentPage <= totalPage; currentPage++ ){
      const firstAndLastPage = currentPage == 1 || currentPage == 2 || currentPage == totalPage || currentPage == totalPage -1
      const pagesAfterSelectedPage = currentPage <= selectedPage + 1
      const pagesBeforeSelectedPage = currentPage >= selectedPage - 1

      if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
	 if( oldPage && currentPage - oldPage > 2 ){
	    pages.push('...')
	 }
	 if(oldPage && currentPage - oldPage == 2){
	    pages.push(oldPage + 1)
	 }
	 pages.push(currentPage)

	 oldPage = currentPage
      }
   }
   return pages
}

const pagination = document.querySelector('.pagination')

const filter = pagination.dataset.filter
const page = +pagination.dataset.page
const total = +pagination.dataset.total
const pages = paginate(page, total)

let elements = ""

function createPagination(pagination){
   for(let page of pages){
	 if(String(page).includes("...")){
	 elements += `<span>${page}</span>`
      } else {
	 if(filter){
	    elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
	 } else {
	    elements += `<a href="?page=${page}">${page}</a>`
	 }
      }
   }
   pagination.innerHTML = elements
}
const ok = paginate(5, 10)

console.log(ok)
if(pagination){
   createPagination(pagination)
}
