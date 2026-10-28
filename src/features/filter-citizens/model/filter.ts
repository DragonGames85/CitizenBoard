import type { Citizen, CitizenFilters } from '@/entities/citizen';

import { fullName } from '@/shared/lib/format';

export const emptyFilters: CitizenFilters = {
    query: '',
    employment: '',
    nationality: '',
    gender: '',
};

export function filterCitizens(citizens: Citizen[], filters: CitizenFilters): Citizen[] {
    const query = filters.query.trim().toLowerCase();

    return citizens.filter(citizen => {
        if (filters.employment && citizen.employmentStatus !== filters.employment) return false;
        if (filters.nationality && citizen.nationality !== filters.nationality) return false;
        if (filters.gender && citizen.gender !== filters.gender) return false;
        if (!query) return true;

        const haystack = [fullName(citizen), citizen.id, citizen.phone, citizen.email].join(' ').toLowerCase();
        return haystack.includes(query);
    });
}
