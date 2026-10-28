export type Gender = 'male' | 'female';
export type Nationality = 'ru' | 'kz' | 'by';
export type EmploymentStatus = 'employed' | 'unemployed' | 'part_time' | 'retired' | 'self_employed';
export type FamilyRelation = 'spouse' | 'child' | 'parent' | 'sibling' | 'other';
export type DocumentKind = 'passport' | 'international' | 'driver';
export type SkillName = 'driving' | 'learning' | 'programming' | 'management' | 'teamwork';

export type FamilyMember = {
    id: string;
    relation: FamilyRelation;
    lastName: string;
    firstName: string;
    middleName: string;
    birthDate: string;
    phone: string;
};

export type CitizenDocument = {
    id: string;
    kind: DocumentKind;
    series: string;
    number: string;
    givenAt: string;
    passportGiver: string;
};

export type CitizenSkill = {
    name: SkillName;
    level: number;
};

export type Citizen = {
    id: string;
    lastName: string;
    firstName: string;
    middleName: string;
    gender: Gender;
    birthDate: string;
    nationality: Nationality;
    passport: string;
    phone: string;
    email: string;
    employmentStatus: EmploymentStatus;
    hasRegistration: boolean;
    skills: CitizenSkill[];
    familyMembers: FamilyMember[];
    documents: CitizenDocument[];
};

export type CitizenFilters = {
    query: string;
    employment: EmploymentStatus | '';
    nationality: Nationality | '';
    gender: Gender | '';
};
