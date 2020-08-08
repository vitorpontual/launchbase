// Soma de despesas e receitas

const usuarios = [
    {
        nome: 'Vitor',
        receitas: [115.3, 48.7, 98.3, 14.5],
        despesas: [85.3, 13.5, 19.9]
    },
    {
        nome: 'Carla',
        receitas: [24.6, 214.3, 45.3],
        despesas: [185.3, 12.1, 120.0]
    },
    {
        nome: 'Lucia',
        receitas: [9.8, 120.3, 340.2, 45.3],
        despesas: [450.2, 29.9]
    }
];

function calcularSaldo(receitas, despesas) {
    const somaReceitas = somarNumeros(receitas)
    const somarDespesas = somarNumeros(despesas)

    return somaReceitas - somarDespesas
}

function somarNumeros(numeros) {
    let soma = 0
    for ( let numero of numeros) {
        soma += numero
    }
    return soma
}

for ( let usuario of usuarios) {
    const saldo = calcularSaldo(usuario.receitas, usuario.despesas)

    if (saldo > 0) {
        console.log(`${usuario.nome} possui saldo POSITIVO de R$${saldo.toFixed(2)}`)
    } else {
        console.log(`${usuario.nome} possui saldo NEGATIVO de R$${saldo.toFixed(2)}`)
    }
}