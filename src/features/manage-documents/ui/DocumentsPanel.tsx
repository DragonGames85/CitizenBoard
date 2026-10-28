import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { type Citizen, type CitizenDocument, documentKindLabel, useCitizenStore } from '@/entities/citizen';

import { formatDate } from '@/shared/lib/format';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Panel } from '@/shared/ui/Panel';
import { Select } from '@/shared/ui/Select';

import { type DocumentForm, documentSchema } from '../model/schema';

type Props = {
    citizen: Citizen;
    onChange?: (citizen: Citizen) => void;
};

const emptyDocument: DocumentForm = {
    kind: 'passport',
    series: '',
    number: '',
    givenAt: '',
    passportGiver: '',
};

export function DocumentsPanel({ citizen, onChange }: Props) {
    const [open, setOpen] = useState(false);
    const updateCitizen = useCitizenStore(state => state.updateCitizen);
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<DocumentForm>({
        resolver: zodResolver(documentSchema),
        defaultValues: emptyDocument,
    });

    const saveDocuments = (documents: CitizenDocument[]) => {
        const saved = updateCitizen(citizen.id, { documents });
        if (saved) onChange?.(saved);
    };

    const add = handleSubmit(values => {
        const document: CitizenDocument = { id: `d-${citizen.id}-${Date.now()}`, ...values };
        saveDocuments([...citizen.documents, document]);
        reset(emptyDocument);
        setOpen(false);
    });

    return (
        <Panel
            title="Документы"
            action={
                <Button variant="ghost" onClick={() => setOpen(value => !value)}>
                    {open ? 'Отменить' : 'Добавить'}
                </Button>
            }
        >
            {citizen.documents.length === 0 && !open && <p className="text-secondary text-sm">Документов нет.</p>}

            <ul className="space-y-2">
                {citizen.documents.map(document => (
                    <li
                        key={document.id}
                        className="border-line bg-panel-2 flex flex-col gap-2 rounded-md border px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div>
                            <div className="text-main text-sm font-medium">
                                {documentKindLabel[document.kind]} · {document.series} {document.number}
                            </div>
                            <div className="text-secondary text-xs">
                                {formatDate(document.givenAt)} · {document.passportGiver}
                            </div>
                        </div>
                        <Button
                            variant="danger"
                            onClick={() => saveDocuments(citizen.documents.filter(item => item.id !== document.id))}
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
                        name="kind"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Вид"
                                value={field.value}
                                onChange={field.onChange}
                                options={Object.entries(documentKindLabel).map(([value, label]) => ({ value, label }))}
                                error={errors.kind?.message}
                            />
                        )}
                    />
                    <Input label="Серия" error={errors.series?.message} {...register('series')} />
                    <Input label="Номер" error={errors.number?.message} {...register('number')} />
                    <Input type="date" label="Дата выдачи" error={errors.givenAt?.message} {...register('givenAt')} />
                    <div className="sm:col-span-2">
                        <Input label="Кем выдан" error={errors.passportGiver?.message} {...register('passportGiver')} />
                    </div>
                    <div className="sm:col-span-2 lg:col-span-3">
                        <Button type="submit">Сохранить</Button>
                    </div>
                </form>
            )}
        </Panel>
    );
}
