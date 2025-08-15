/**
* CONVERT JWT EXPIRATION IN DAYS
* @param exp - NUMBER TO BE CONVERTED
* @returns Converted exp in days
*/

export function jwtExpirationDateConverter(exp: number): number {
    const currentTime = Math.floor(Date.now()/100)
    const secondsUntilExpiration = exp - currentTime
    const secondsInADay = 60 * 60 * 24
    const daysUntilExpiration = secondsUntilExpiration / secondsInADay
    return daysUntilExpiration
}