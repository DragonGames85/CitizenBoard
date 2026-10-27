export type Gender = 'male' | 'female';
export type Nationality = 'ru' | 'kz' | 'by';
export type EmploymentStatus = 'employed' | 'unemployed' | 'part_time' | 'retired' | 'self_employed';
export type FamilyRelation = 'spouse' | 'child' | 'parent' | 'sibling' | 'other';

export type FamilyMember = {
    id: string;
    relation: FamilyRelation;
    lastName: string;
    firstName: string;
    middleName: string;
    birthDate: string;
    phone: string;
};

export type Citizen = {
    id: string;
    lastName: string;
    firstName: string;
    middleName: string;
    gender: Gender;
    birthDate: string;
    nationality: Nationality;
    phone: string;
    email: string;
    employmentStatus: EmploymentStatus;
    familyMembers: FamilyMember[];
};

export type CitizenFilters = {
    query: string;
    employment: EmploymentStatus | '';
    nationality: Nationality | '';
    gender: Gender | '';
};
