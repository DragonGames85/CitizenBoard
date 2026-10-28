import { faker } from '@faker-js/faker/locale/ru';

import { CITIZEN_COUNT } from '@/shared/consts/citizen';
import { toIsoDate } from '@/shared/lib/format';

import { applyDigitMask, passportMask } from '../model/passport';
import type {
    Citizen,
    CitizenDocument,
    CitizenSkill,
    DocumentKind,
    EmploymentStatus,
    FamilyMember,
    FamilyRelation,
    Gender,
    Nationality,
    SkillName,
} from '../model/types';

const EMPLOY: EmploymentStatus[] = ['employed', 'unemployed', 'part_time', 'retired', 'self_employed'];
const NATIONALITIES: Nationality[] = ['ru', 'kz', 'by'];
const RELATIONS: FamilyRelation[] = ['spouse', 'child', 'parent', 'sibling', 'other'];
const DOCUMENTS: DocumentKind[] = ['passport', 'international', 'driver'];
const SKILLS: SkillName[] = ['driving', 'learning', 'programming', 'management', 'teamwork'];
const PASSPORT_GIVERS = ['МВД', 'ГИБДД', 'МФЦ'];

function phone() {
    return faker.helpers.fromRegExp('+79[0-9]{9}');
}

function skillsFor(): CitizenSkill[] {
    return faker.helpers.arrayElements(SKILLS, { min: 0, max: 3 }).map(name => ({
        name,
        level: faker.number.int({ min: 1, max: 10 }),
    }));
}

function documentsFor(index: number): CitizenDocument[] {
    const count = faker.number.int({ min: 1, max: 2 });
    return Array.from({ length: count }, (_, documentIndex) => ({
        id: `d-${index}-${documentIndex}`,
        kind: faker.helpers.arrayElement(DOCUMENTS),
        series: faker.string.numeric(4),
        number: faker.string.numeric(6),
        givenAt: toIsoDate(faker.date.past({ years: 12 })),
        passportGiver: faker.helpers.arrayElement(PASSPORT_GIVERS),
    }));
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

export function generateCitizens(count = CITIZEN_COUNT): Citizen[] {
    const citizens: Citizen[] = [];

    for (let i = 0; i < count; i++) {
        const gender: Gender = faker.helpers.arrayElement(['male', 'female']);
        const lastName = faker.person.lastName(gender);
        const firstName = faker.person.firstName(gender);
        const nationality = faker.helpers.arrayElement(NATIONALITIES);
        const mask = passportMask[nationality];

        citizens.push({
            id: String(i + 1).padStart(5, '0'),
            lastName,
            firstName,
            middleName: faker.person.middleName(gender),
            gender,
            birthDate: toIsoDate(faker.date.birthdate({ min: 18, max: 80, mode: 'age' })),
            nationality,
            passport: applyDigitMask(faker.string.numeric(12), mask),
            phone: phone(),
            email: faker.internet.email({ firstName, lastName }).toLowerCase(),
            employmentStatus: faker.helpers.arrayElement(EMPLOY),
            hasRegistration: faker.datatype.boolean({ probability: 0.82 }),
            skills: skillsFor(),
            familyMembers: familyFor(lastName, i),
            documents: documentsFor(i),
        });
    }

    return citizens;
}
