import { useEffect, useState } from 'react';

import { QUOTA_STORAGE_LIMIT } from '@/shared/consts/localStorage';
import { Button } from '@/shared/ui/Button';

import { useCitizenStore } from '../api/storage';

export function CitizenCountControl() {
    const citizenCount = useCitizenStore(state => state.citizenCount);
    const setCitizenCount = useCitizenStore(state => state.setCitizenCount);
    const resetCitizens = useCitizenStore(state => state.resetCitizens);
    const [value, setValue] = useState(String(citizenCount));

    useEffect(() => {
        setValue(String(citizenCount));
    }, [citizenCount]);

    const updateCount = () => {
        const next = Number(value);
        setCitizenCount(next);
    };

    return (
        <div className="border-line flex flex-wrap items-end gap-2 border-t p-3">
            <label className="text-secondary flex flex-1 flex-col gap-1 text-xs">
                Записей
                <input
                    type="number"
                    min={1}
                    value={value}
                    onChange={event => setValue(event.target.value)}
                    onBlur={updateCount}
                    onKeyDown={event => {
                        if (event.key === 'Enter') event.currentTarget.blur();
                    }}
                    className="border-line bg-panel-2 text-main focus:border-neon rounded-md border px-2 py-2 text-sm"
                />
            </label>
            <Button variant="ghost" onClick={resetCitizens}>
                Сбросить
            </Button>
            {citizenCount > QUOTA_STORAGE_LIMIT && (
                <p className="text-secondary basis-full text-xs">
                    Слишком много данных для localStorage (лимит - {QUOTA_STORAGE_LIMIT} )
                </p>
            )}
        </div>
    );
}
