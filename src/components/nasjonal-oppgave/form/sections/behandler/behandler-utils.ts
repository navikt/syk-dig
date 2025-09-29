const removePadding = (hprWithPotentialPadding: string): string => hprWithPotentialPadding.replace(/^0+/, '')

export function hprCorrectLength(hprWithPotentialPadding: string): boolean {
    const unpadded = removePadding(hprWithPotentialPadding)

    return unpadded.length >= 7 && unpadded.length <= 9
}

export function hprOnlyNumbers(hprWithPotentialPadding: string): boolean {
    const unpadded = removePadding(hprWithPotentialPadding)

    return /^\d+$/.test(unpadded)
}
