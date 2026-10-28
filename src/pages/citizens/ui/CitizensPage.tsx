import { useMemo, useState } from 'react';

import { CitizenFiltersBar, emptyFilters, filterCitizens } from '@/features/filter-citizens';

import { type CitizenFilters, useCitizenStore } from '@/entities/citizen';

import { Panel } from '@/shared/ui/Panel';

import { CitizensTable } from './CitizensTable';

export function CitizensPage() {
    const citizens = useCitizenStore(state => state.citizens);
    const [filters, setFilters] = useState<CitizenFilters>(emptyFilters);
    const filtered = useMemo(() => filterCitizens(citizens, filters), [citizens, filters]);

    return (
        <div className="flex flex-col gap-4 lg:h-full lg:min-h-0">
            <header className="shrink-0">
                <h1 className="text-main text-2xl font-medium">Список граждан</h1>
                <p className="text-secondary mt-1 text-sm">
                    Показано <span className="text-neon">{filtered.length.toLocaleString('ru-RU')}</span> элементов
                </p>
            </header>

            <Panel className="shrink-0">
                <CitizenFiltersBar value={filters} onChange={setFilters} />
            </Panel>

            <Panel className="flex flex-1 flex-col" bodyClassName="flex flex-1 flex-col">
                {filtered.length === 0 ? (
                    <p className="text-secondary text-sm">Список пуст.</p>
                ) : (
                    <CitizensTable data={filtered} />
                )}
            </Panel>
        </div>
    );
}
