import { z } from 'zod';

export const documentSchema = z.object({
    kind: z.enum(['passport', 'international', 'driver']),
    series: z
        .string()
        .trim()
        .regex(/^\d{4}$/, 'Серия из 4 цифр'),
    number: z
        .string()
        .trim()
        .regex(/^\d{6}$/, 'Номер из 6 цифр'),
    givenAt: z.string().min(1, 'Дата выдачи'),
    passportGiver: z.string().trim().min(1, 'Кем выдан'),
});

export type DocumentForm = z.infer<typeof documentSchema>;
