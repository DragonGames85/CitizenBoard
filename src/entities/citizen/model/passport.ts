import type { Nationality } from './types';

export const passportMask: Record<Nationality, number[]> = {
    ru: [2, 2, 6],
    kz: [3, 6],
    by: [2, 7],
};

export function maskDigitCount(groups: number[]) {
    return groups.reduce((sum, size) => sum + size, 0);
}

export function applyDigitMask(raw: string, groups: number[]) {
    const digits = raw.replace(/\D/g, '').slice(0, maskDigitCount(groups));
    const parts: string[] = [];
    let offset = 0;
    for (const size of groups) {
        const part = digits.slice(offset, offset + size);
        if (!part) break;
        parts.push(part);
        offset += size;
    }
    return parts.join(' ');
}

export function passportPlaceholder(groups: number[]) {
    return groups.map(size => '0'.repeat(size)).join(' ');
}
