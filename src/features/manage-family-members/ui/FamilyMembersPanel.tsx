import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { type Citizen, type FamilyMember, relationLabel, useCitizenStore } from '@/entities/citizen';

import { formatDate, fullName } from '@/shared/lib/format';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Panel } from '@/shared/ui/Panel';
import { Select } from '@/shared/ui/Select';

import { type FamilyMemberForm, familyMemberSchema } from '../model/schema';

type Props = {
    citizen: Citizen;
    onChange?: (citizen: Citizen) => void;
};

const emptyMember: FamilyMemberForm = {
    relation: 'spouse',
    lastName: '',
    firstName: '',
    middleName: '',
    birthDate: '',
    phone: '',
};

export function FamilyMembersPanel({ citizen, onChange }: Props) {
    const [open, setOpen] = useState(false);
    const updateCitizens = useCitizenStore(state => state.updateCitizen);
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FamilyMemberForm>({
        resolver: zodResolver(familyMemberSchema),
        defaultValues: emptyMember,
    });

    const saveMembers = (members: FamilyMember[]) => {
        const saved = updateCitizens(citizen.id, { familyMembers: members });
        if (saved) onChange?.(saved);
    };

    const add = handleSubmit(values => {
        const member: FamilyMember = { id: `f-${citizen.id}-${Date.now()}`, ...values };
        saveMembers([...citizen.familyMembers, member]);
        reset(emptyMember);
        setOpen(false);
    });

    return (
        <Panel
            title="Члены семьи"
            action={
                <Button variant="ghost" onClick={() => setOpen(value => !value)}>
                    {open ? 'Отменить' : 'Добавить'}
                </Button>
            }
        >
            {citizen.familyMembers.length === 0 && !open && (
                <p className="text-secondary text-sm">Члены семьи отсутствуют.</p>
            )}

            <ul className="space-y-2">
                {citizen.familyMembers.map(member => (
                    <li
                        key={member.id}
                        className="border-line bg-panel-2 flex flex-col gap-2 rounded-md border px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div>
                            <div className="text-main text-sm font-medium">{fullName(member)}</div>
                            <div className="text-secondary text-xs">
                                {relationLabel[member.relation]} · {formatDate(member.birthDate)} · {member.phone}
                            </div>
                        </div>
                        <Button
                            variant="danger"
                            onClick={() => saveMembers(citizen.familyMembers.filter(item => item.id !== member.id))}
                        >
                            Удалить
                        </Button>
                    </li>
                ))}
            </ul>

            {open && (
                <form
                    onSubmit={add}
                    className="border-line mt-4 grid gap-3 border-t pt-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                    <Controller
                        name="relation"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Родство"
                                value={field.value}
                                onChange={field.onChange}
                                options={Object.entries(relationLabel).map(([value, label]) => ({ value, label }))}
                                error={errors.relation?.message}
                            />
                        )}
                    />
                    <Input label="Фамилия" error={errors.lastName?.message} {...register('lastName')} />
                    <Input label="Имя" error={errors.firstName?.message} {...register('firstName')} />
                    <Input label="Отчество" error={errors.middleName?.message} {...register('middleName')} />
                    <Input
                        type="date"
                        label="Дата рождения"
                        error={errors.birthDate?.message}
                        {...register('birthDate')}
                    />
                    <Input label="Телефон" error={errors.phone?.message} {...register('phone')} />
                    <div className="sm:col-span-2 lg:col-span-3">
                        <Button type="submit">Сохранить</Button>
                    </div>
                </form>
            )}
        </Panel>
    );
}
