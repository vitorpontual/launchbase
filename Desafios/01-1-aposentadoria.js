// Cálculo de Aposentadoria

const nome = 'Vitor';
const sexo = 'M';
const idade = 28;
const contribuicao = 2;

const calculoContribuicao = idade + contribuicao

// essas varáveis irão true ou false
const homemPodeAposentar = sexo == 'M' && contribuicao >= 35 && calculoContribuicao >= 95
const mulherPodeAposentar = sexo == 'F' && contribuicao >= 30 && calculoContribuicao >= 85

if (homemPodeAposentar || mulherPodeAposentar) {
    console.log(`${nome}, você pode se aposentar!`)
} else {
    console.log(`${nome}, você não pode ser aposentar`)
}
