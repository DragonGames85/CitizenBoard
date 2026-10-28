import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import {
    type Citizen,
    type Nationality,
    SkillSelect,
    applyDigitMask,
    employmentLabel,
    genderLabel,
    nationalityLabel,
    passportMask,
    passportPlaceholder,
    useCitizenStore,
} from '@/entities/citizen';

import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Input } from '@/shared/ui/Input';
import { Panel } from '@/shared/ui/Panel';
import { Select } from '@/shared/ui/Select';

import { type CitizenFormValues, citizenFormSchema } from '../model/schema';

type Props = {
    citizen: Citizen;
    onSaved?: (citizen: Citizen) => void;
};

function toForm(citizen: Citizen): CitizenFormValues {
    return {
        lastName: citizen.lastName,
        firstName: citizen.firstName,
        middleName: citizen.middleName,
        gender: citizen.gender,
        birthDate: citizen.birthDate,
        nationality: citizen.nationality,
        passport: citizen.passport,
        employmentStatus: citizen.employmentStatus,
        phone: citizen.phone,
        email: citizen.email,
        hasRegistration: citizen.hasRegistration,
        skills: citizen.skills,
    };
}

function optionsOf(record: Record<string, string>) {
    return Object.entries(record).map(([value, label]) => ({ value, label }));
}

export function EditCitizenForm({ citizen, onSaved }: Props) {
    const updateCitizens = useCitizenStore(state => state.updateCitizen);
    const {
        register,
        control,
        handleSubmit,
        watch,
        getValues,
        setValue,
        formState: { errors, isSubmitting, isDirty },
        reset,
    } = useForm<CitizenFormValues>({
        resolver: zodResolver(citizenFormSchema),
        defaultValues: toForm(citizen),
        values: toForm(citizen),
    });

    const nationality = watch('nationality');
    const mask = passportMask[nationality];

    const onNationality = (value: string) => {
        const next = value as Nationality;
        setValue('nationality', next, { shouldDirty: true, shouldValidate: true });
        setValue('passport', applyDigitMask(getValues('passport'), passportMask[next]), {
            shouldDirty: true,
            shouldValidate: true,
        });
    };

    const onSubmit = handleSubmit(values => {
        const saved = updateCitizens(citizen.id, values);
        if (saved) {
            reset(toForm(saved));
            onSaved?.(saved);
        }
    });

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <Panel title="Личные данные">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <Input label="Фамилия" error={errors.lastName?.message} {...register('lastName')} />
                    <Input label="Имя" error={errors.firstName?.message} {...register('firstName')} />
                    <Input label="Отчество" error={errors.middleName?.message} {...register('middleName')} />
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Пол"
                                value={field.value}
                                onChange={field.onChange}
                                options={optionsOf(genderLabel)}
                                error={errors.gender?.message}
                            />
                        )}
                    />
                    <Input
                        type="date"
                        label="Дата рождения"
                        error={errors.birthDate?.message}
                        {...register('birthDate')}
                    />
                    <Controller
                        name="nationality"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Гражданство"
                                value={field.value}
                                onChange={onNationality}
                                options={optionsOf(nationalityLabel)}
                                error={errors.nationality?.message}
                            />
                        )}
                    />
                    <Controller
                        name="employmentStatus"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Занятость"
                                value={field.value}
                                onChange={field.onChange}
                                options={optionsOf(employmentLabel)}
                                error={errors.employmentStatus?.message}
                            />
                        )}
                    />
                    <Controller
                        name="passport"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="Серия и номер паспорта"
                                inputMode="numeric"
                                autoComplete="off"
                                placeholder={passportPlaceholder(mask)}
                                error={errors.passport?.message}
                                value={field.value}
                                onChange={event => field.onChange(applyDigitMask(event.target.value, mask))}
                                onBlur={field.onBlur}
                                name={field.name}
                            />
                        )}
                    />
                    <Checkbox label="Имеется прописка" {...register('hasRegistration')} />
                </div>
            </Panel>

            <Panel title="Контакты">
                <div className="grid gap-3 sm:grid-cols-2">
                    <Input label="Телефон" error={errors.phone?.message} {...register('phone')} />
                    <Input label="Email" error={errors.email?.message} {...register('email')} />
                </div>
            </Panel>

            <Panel title="Навыки">
                <Controller
                    name="skills"
                    control={control}
                    render={({ field }) => (
                        <SkillSelect value={field.value} onChange={field.onChange} error={errors.skills?.message} />
                    )}
                />
            </Panel>

            <div className="flex flex-wrap gap-2">
                <Button type="submit" disabled={isSubmitting || !isDirty}>
                    Сохранить
                </Button>
                <Button type="button" variant="ghost" disabled={!isDirty} onClick={() => reset(toForm(citizen))}>
                    Отменить
                </Button>
            </div>
        </form>
    );
}
