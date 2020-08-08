// Construção e impressão de objetos

const empresa = {
    nome: 'Rocketseat',
    cor: 'Roxo',
    foco: 'Programação',
    adress: {
        rua: 'Rua Guilherme Gembala,',
        number: 260
    }
}

console.log(`A empresa ${empresa.nome} está localizada em ${empresa.adress.rua} ${empresa.adress.number}`)