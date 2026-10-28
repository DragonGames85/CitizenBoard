import { z } from 'zod';

export const citizenFormSchema = z.object({
    lastName: z.string().trim().min(1, 'Обязательное поле'),
    firstName: z.string().trim().min(1, 'Обязательное поле'),
    middleName: z.string(),
    gender: z.enum(['male', 'female']),
    birthDate: z.string().min(1, 'Укажите дату'),
    nationality: z.enum(['ru', 'kz', 'by'], { error: 'Выберите гражданство' }),
    employmentStatus: z.enum(['employed', 'unemployed', 'part_time', 'retired', 'self_employed'], {
        error: 'Выберите занятость',
    }),
    phone: z
        .string()
        .trim()
        .regex(/^\+\d{11,15}$/, 'Телефон в формате +79991234567'),
    email: z.email('Некорректный email'),
});

export type CitizenFormValues = z.infer<typeof citizenFormSchema>;
