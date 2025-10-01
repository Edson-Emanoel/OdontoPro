// Valor em centavos = valor em reais * 100
// Valor em reais = valor em centavos / 100


/**
 * Converte um Valor monétario de reais(BRL) para cents(centavos)
 * @param {string} amount - o Valor em BRL a ser convertido
 * @returns {number} - o Valor convertido em centavos
 * 
 * @example
 * convertRealToCents
 * 
*/
export function convertRealToCents(amount: string){
    const numericPrice = parseFloat(amount.replace(/\./g, '').replace(',', '.'))
    const priceInCents = Math.round(numericPrice * 100)

    return priceInCents;
}