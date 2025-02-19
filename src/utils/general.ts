export function concatenateAndRemoveSpaces(strings: string[]): string {
    return strings.join('').replace(/\s+/g, '');
}