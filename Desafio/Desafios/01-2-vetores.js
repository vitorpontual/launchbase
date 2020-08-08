// Vetores e Objetos

const usuario = {
    nome: 'Vitor',
    idade: 28,
    propriedade: [
        {nome: 'Javascript', especialidade: 'Web Developer'},
        {nome: 'Python', especialidade: 'Database'}
    ]
}

console.log(`O usúario ${usuario.nome} tem ${usuario.idade} anos e usa a tecnologia ${usuario.propriedade[0].nome} com especilidade ${usuario.propriedade[0].especialidade}`)