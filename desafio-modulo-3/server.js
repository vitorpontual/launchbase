const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
const courses = require('./data')


app.set('view engine', 'njk')

app.use(express.static('public'))

nunjucks.configure('views', {
    express: app,
    autoescape: false,
    noCache: true
})

app.get('/', (req, res) => {
const data = {
    image: "https://avatars1.githubusercontent.com/u/28929274?s=280&v=4",
    company: "Rocketseat",
    title: "As melhores tecnologias em programação, direto ao ponto e do jeito certo",
    description: "No meio de tanta informação e da quantidade de ferramentas que surgem todos os dias, você precisa de alguém que te leve na direção certa.",
    cards: [
        {lang:"Javascript", img:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"},
        {lang:"NodeJs" , img: "https://walde.co/wp-content/uploads/2016/09/nodejs_logo.png"},
        {lang:"React", img: "https://www.pngitem.com/pimgs/m/664-6644509_icon-react-js-logo-hd-png-download.png"}
    ]
}
   return res.render('about', {about : data})
})

app.get('/courses', (req, res) => {
    return res.render('courses', {items: courses})
})

app.get('/courses/:id', (req, res) => {
    const id = req.params.id;

    const course = courses.find(function(course){
        return course.id == id
    })
    if(!course){
        return res.render('not-found')
    }
    return res.render('/course', {item: course})
})


app.use(function(req, res){
    res.status(404).render('not-found')
})

app.listen(5000, function(){
    console.log("Server is running")
})