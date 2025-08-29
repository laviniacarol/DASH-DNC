/**
* CONVERT Text frpm hilight api
* @param Text - text from highlights api
* @returns The converted text
*/

export function highlightTextConverter (text: string): string {
    switch (text) {
        case 'alert':
            return '* Meta longe de ser atingida'
        
        case 'success':
        return '*A meta do mês foi atingida! Paranbéns'

        case 'warning':
            return '*Falta pouco, vamos lá!'
            default:
                return '*Sem dados no momentos'
    }
}