import moment from 'moment';

export function fullName(parts: { lastName: string; firstName: string; middleName?: string }) {
    return [parts.lastName, parts.firstName, parts.middleName].filter(Boolean).join(' ');
}

export function formatDate(iso: string) {
    if (!iso) return '—';
    const value = moment(iso, 'YYYY-MM-DD', true);
    return value.isValid() ? value.format('DD.MM.YYYY') : iso;
}

export function ageFromBirth(iso: string) {
    const birth = moment(iso, 'YYYY-MM-DD', true);
    if (!birth.isValid()) return 0;
    return moment().diff(birth, 'years');
}

export function toIsoDate(date: Date) {
    return moment(date).format('YYYY-MM-DD');
}
