import type { DocumentKind, EmploymentStatus, FamilyRelation, Gender, Nationality, SkillName } from './types';

export const genderLabel: Record<Gender, string> = {
    male: 'Мужской',
    female: 'Женский',
};

export const nationalityLabel: Record<Nationality, string> = {
    ru: 'РФ',
    kz: 'Казахстан',
    by: 'Беларусь',
};

export const employmentLabel: Record<EmploymentStatus, string> = {
    employed: 'Работает',
    unemployed: 'Безработный',
    part_time: 'Подработка',
    retired: 'Пенсионер',
    self_employed: 'Самозанятый',
};

export const skillLabel: Record<SkillName, string> = {
    driving: 'Вождение',
    learning: 'Обучаемость',
    programming: 'Программирование',
    management: 'Менеджмент',
    teamwork: 'Работа в команде',
};

export const documentKindLabel: Record<DocumentKind, string> = {
    passport: 'Паспорт',
    international: 'Загранпаспорт',
    driver: 'Водительское удостоверение',
};

export const relationLabel: Record<FamilyRelation, string> = {
    spouse: 'Супруг(а)',
    child: 'Ребёнок',
    parent: 'Родитель',
    sibling: 'Брат / сестра',
    other: 'Другое',
};

export const employmentTone = {
    employed: 'lime',
    part_time: 'warn',
    retired: 'secondary',
    unemployed: 'danger',
    self_employed: 'neon',
} as const;

export const employmentColor: Record<EmploymentStatus, string> = {
    employed: '#a3e635',
    part_time: '#fbbf24',
    retired: '#94a3b8',
    unemployed: '#f87171',
    self_employed: '#22d3ee',
};
