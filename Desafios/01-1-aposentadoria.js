// Cálculo de Aposentadoria

const nome = 'Vitor';
const sexo = 'M';
const idade = 55;
const contribuicao = 30;

const tempoDeContribuicao = idade + contribuicao

if (sexo === 'M'){
    console.log('O tempo de de contribuição mínima é de 35 anos')
    if ( tempoDeContribuicao >= 95) {
        console.log(`${nome} pode ser aposentar`)
    } else {
        console.log(`Faltam ${95 - tempoDeContribuicao} anos para se aposentar`)
    }
} else {
    console.log('O tempo de contribuição mínima é de 30 anos')
    if ( tempoDeContribuicao >= 85) {
        console.log(`${nome} pode se aposentar`)
    } else {
        console.log(`Falta ${85 - tempoDeContribuicao} anos para se aposentar`)
    }
}
