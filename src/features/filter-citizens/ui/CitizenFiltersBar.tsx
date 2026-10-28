import { type CitizenFilters, employmentLabel, genderLabel, nationalityLabel } from '@/entities/citizen';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Select } from '@/shared/ui/Select';

import { emptyFilters } from '../model/filter';

type Props = {
    value: CitizenFilters;
    onChange: (next: CitizenFilters) => void;
};

function setOptions(record: Record<string, string>) {
    return [{ value: '', label: 'Все' }, ...Object.entries(record).map(([value, label]) => ({ value, label }))];
}

export function CitizenFiltersBar({ value, onChange }: Props) {
    return (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <div className="xl:col-span-2">
                <Input
                    label="Поиск"
                    placeholder="ФИО, ID, телефон, email…"
                    value={value.query}
                    onChange={event => onChange({ ...value, query: event.target.value })}
                />
            </div>
            <Select
                label="Занятость"
                value={value.employment}
                onChange={employment => onChange({ ...value, employment: employment as CitizenFilters['employment'] })}
                options={setOptions(employmentLabel)}
            />
            <Select
                label="Гражданство"
                value={value.nationality}
                onChange={nationality =>
                    onChange({ ...value, nationality: nationality as CitizenFilters['nationality'] })
                }
                options={setOptions(nationalityLabel)}
            />
            <div className="flex items-end gap-2">
                <div className="min-w-0 flex-1">
                    <Select
                        label="Пол"
                        value={value.gender}
                        onChange={gender => onChange({ ...value, gender: gender as CitizenFilters['gender'] })}
                        options={setOptions(genderLabel)}
                    />
                </div>
                <Button variant="ghost" className="shrink-0" onClick={() => onChange(emptyFilters)}>
                    Сброс
                </Button>
            </div>
        </div>
    );
}
