/**
* CONVERT TO BRL CURRENCY FORMAT
* @param value - number to be converted
* @returns Converted BRL string
*/

export function currencyConverter (value: number): string {
    return new Intl.NumberFormat('pt-BR', {
       style: 'currency',
       currency: 'BRL'
    }).format(value)
}