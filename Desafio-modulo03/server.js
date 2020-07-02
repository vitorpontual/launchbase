const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const video = require('./data')

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
})

server.use(express.static('public'))


server.get('/', (req, res) => {
    const data = {
        avatar_url: "https://avatars2.githubusercontent.com/u/42771088?s=460&u=afb4d0452847fb340a507874ac521c707c69a7c1&v=4",
        name: "Vitor Pontual",
        role: "Web Developer",
        description: "Estudande de programação pela Rocketseat.",
        links: [
            {name: "Github", url:"https://github.com/vitorpontual"},
            {name: "Twitter", url:"https://twitter.com/vitorpguedes"},
            {name: "linkedIn", url:"https://www.linkedin.com/in/vitor-pontual/ "}
        ]
    }
    return res.render('about', {about: data})
})

server.get('/courses', (req, res) => {
    return res.render('courses', {items : video})
})

server.use(function(req, res){
    res.status(404).render('not-found')
})

server.listen(5000, function(){
    console.log('server is running')
})