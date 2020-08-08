// Cálculo de IMC

const nome = 'Vitor';
const peso = 94;
const altura = 1.81;

const imc = peso / (altura * altura);


console.log(`Seu IMC é de ${imc.toFixed(2)}`)

if (imc >= 30) {
    console.log(`${nome} você está acima do peso`)
} else {
    console.log(`${nome} você não está acima do peso`)
}