import { z } from 'zod';

import { maskDigitCount, passportMask, passportPlaceholder } from '@/entities/citizen';

export const citizenFormSchema = z
    .object({
        lastName: z.string().trim().min(1, 'Обязательное поле'),
        firstName: z.string().trim().min(1, 'Обязательное поле'),
        middleName: z.string(),
        gender: z.enum(['male', 'female']),
        birthDate: z.string().min(1, 'Укажите дату'),
        nationality: z.enum(['ru', 'kz', 'by'], { error: 'Выберите гражданство' }),
        passport: z.string(),
        employmentStatus: z.enum(['employed', 'unemployed', 'part_time', 'retired', 'self_employed'], {
            error: 'Выберите занятость',
        }),
        phone: z
            .string()
            .trim()
            .regex(/^\+\d{11,15}$/, 'Телефон в формате +79991234567'),
        email: z.email('Некорректный email'),
        hasRegistration: z.boolean(),
        skills: z.array(
            z.object({
                name: z.enum(['driving', 'learning', 'programming', 'management', 'teamwork']),
                level: z.number().int().min(1).max(10),
            }),
        ),
    })
    .superRefine((values, ctx) => {
        const mask = passportMask[values.nationality];
        if (values.passport.replace(/\D/g, '').length !== maskDigitCount(mask)) {
            ctx.addIssue({
                code: 'custom',
                path: ['passport'],
                message: `Формат ${passportPlaceholder(mask)}`,
            });
        }
    });

export type CitizenFormValues = z.infer<typeof citizenFormSchema>;
