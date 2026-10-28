import { ageFromBirth } from '@/shared/lib/format';

import { employmentColor, employmentLabel, nationalityLabel } from './labels';
import type { Citizen, EmploymentStatus, Nationality } from './types';

const employmentOrder: EmploymentStatus[] = ['employed', 'part_time', 'retired', 'unemployed', 'self_employed'];
const nationalityOrder: Nationality[] = ['ru', 'kz', 'by'];

export function buildDashboardStats(citizens: Citizen[]) {
    const byEmployment: Record<string, number> = {};
    const byGender = { male: 0, female: 0 };
    const byNationality: Record<string, number> = {};
    const byAgeBucket: Record<string, number> = {
        '18-30': 0,
        '31-45': 0,
        '46-60': 0,
        '60+': 0,
    };

    for (const citizen of citizens) {
        byEmployment[citizen.employmentStatus] = (byEmployment[citizen.employmentStatus] ?? 0) + 1;
        byGender[citizen.gender] += 1;
        byNationality[citizen.nationality] = (byNationality[citizen.nationality] ?? 0) + 1;

        const age = ageFromBirth(citizen.birthDate);
        if (age <= 30) byAgeBucket['18-30']! += 1;
        else if (age <= 45) byAgeBucket['31-45']! += 1;
        else if (age <= 60) byAgeBucket['46-60']! += 1;
        else byAgeBucket['60+']! += 1;
    }

    return {
        total: citizens.length,
        employed: byEmployment.employed ?? 0,
        unemployed: byEmployment.unemployed ?? 0,
        withFamily: citizens.filter(citizen => citizen.familyMembers.length > 0).length,
        employmentChart: employmentOrder.map(key => ({
            name: employmentLabel[key],
            value: byEmployment[key] ?? 0,
            color: employmentColor[key],
        })),
        genderChart: [
            { name: 'Мужчины', value: byGender.male },
            { name: 'Женщины', value: byGender.female },
        ],
        ageChart: Object.entries(byAgeBucket).map(([name, value]) => ({ name, value })),
        nationalityChart: nationalityOrder.map(key => ({
            name: nationalityLabel[key],
            value: byNationality[key] ?? 0,
        })),
    };
}
