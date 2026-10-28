import { z } from 'zod';

export const familyMemberSchema = z.object({
    relation: z.enum(['spouse', 'child', 'parent', 'sibling', 'other']),
    lastName: z.string().min(1, 'Фамилия'),
    firstName: z.string().min(1, 'Имя'),
    middleName: z.string(),
    birthDate: z.string().min(1, 'Дата рождения'),
    phone: z.string().min(10, 'Телефон'),
});

export type FamilyMemberForm = z.infer<typeof familyMemberSchema>;
