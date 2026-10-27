import { faker } from '@faker-js/faker/locale/ru';

import { SEED_COUNT } from '@/shared/consts/citizen';
import { toIsoDate } from '@/shared/lib/format';

import type { Citizen, EmploymentStatus, FamilyMember, FamilyRelation, Gender, Nationality } from '../model/types';

const EMPLOY: EmploymentStatus[] = ['employed', 'unemployed', 'part_time', 'retired', 'self_employed'];
const NATIONALITIES: Nationality[] = ['ru', 'kz', 'by'];
const RELATIONS: FamilyRelation[] = ['spouse', 'child', 'parent', 'sibling', 'other'];

function phone() {
    return faker.helpers.fromRegExp('+79[0-9]{9}');
}

function familyFor(lastName: string, index: number): FamilyMember[] {
    const count = faker.number.int({ min: 0, max: 3 });
    return Array.from({ length: count }, (_, memberIndex) => {
        const sex = faker.helpers.arrayElement(['male', 'female'] as const);
        return {
            id: `f-${index}-${memberIndex}`,
            relation: faker.helpers.arrayElement(RELATIONS),
            lastName: faker.datatype.boolean(0.6) ? lastName : faker.person.lastName(sex),
            firstName: faker.person.firstName(sex),
            middleName: faker.person.middleName(sex),
            birthDate: toIsoDate(faker.date.birthdate({ min: 6, max: 80, mode: 'age' })),
            phone: phone(),
        };
    });
}

export function generateCitizens(count = SEED_COUNT): Citizen[] {
    const citizens: Citizen[] = [];

    for (let i = 0; i < count; i++) {
        const gender: Gender = faker.helpers.arrayElement(['male', 'female']);
        const lastName = faker.person.lastName(gender);
        const firstName = faker.person.firstName(gender);

        citizens.push({
            id: String(i + 1).padStart(5, '0'),
            lastName,
            firstName,
            middleName: faker.person.middleName(gender),
            gender,
            birthDate: toIsoDate(faker.date.birthdate({ min: 18, max: 80, mode: 'age' })),
            nationality: faker.helpers.arrayElement(NATIONALITIES),
            phone: phone(),
            email: faker.internet.email({ firstName, lastName }).toLowerCase(),
            employmentStatus: faker.helpers.arrayElement(EMPLOY),
            familyMembers: familyFor(lastName, i),
        });
    }

    return citizens;
}
