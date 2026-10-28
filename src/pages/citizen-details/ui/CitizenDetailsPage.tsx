import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Link, useParams } from 'react-router-dom';

import { EditCitizenForm } from '@/features/edit-citizen';
import { FamilyMembersPanel } from '@/features/manage-family-members';

import { employmentLabel, genderLabel, nationalityLabel, useCitizenStore } from '@/entities/citizen';
import { fullName } from '@/shared/lib/format';
import { Button } from '@/shared/ui/Button';
import { Panel } from '@/shared/ui/Panel';

export function CitizenDetailsPage() {
    const { id = '' } = useParams();
    const citizen = useCitizenStore(state => state.citizens.find(item => item.id === id));

    if (!citizen) {
        return (
            <Panel>
                <h1 className="text-main text-lg">Гражданин не найден</h1>
                <p className="text-secondary mt-2 text-sm">В реестре нет записи с таким идентификатором.</p>
                <Link to="/citizens" className="mt-4 inline-block">
                    <Button variant="ghost">К списку</Button>
                </Link>
            </Panel>
        );
    }

    return (
        <article className="space-y-4">
            <Link to="/citizens">
                <Button variant="ghost">← К списку</Button>
            </Link>

            <Panel className="mt-4">
                <h1 className="text-main text-xl font-medium sm:text-2xl">{fullName(citizen)}</h1>
            </Panel>

            <TabGroup>
                <TabList className="flex flex-wrap gap-2">
                    {['Главная информация', 'Редактирование', 'Семья'].map(label => (
                        <Tab
                            key={label}
                            className="border-line text-secondary data-selected:border-neon/50 data-selected:bg-neon/10 data-selected:text-neon cursor-pointer rounded-md border px-3 py-2 text-sm outline-none"
                        >
                            {label}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels className="mt-4">
                    <TabPanel>
                        <Panel title="Детали">
                            <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                                <InfoBlock label="Телефон" value={citizen.phone} />
                                <InfoBlock label="Email" value={citizen.email} />
                                <InfoBlock label="Пол" value={genderLabel[citizen.gender]} />
                                <InfoBlock label="Гражданство" value={nationalityLabel[citizen.nationality]} />
                                <InfoBlock label="Занятость" value={employmentLabel[citizen.employmentStatus]} />
                                <InfoBlock label="Членов семьи" value={String(citizen.familyMembers.length)} />
                            </div>
                        </Panel>
                    </TabPanel>
                    <TabPanel>
                        <EditCitizenForm citizen={citizen} />
                    </TabPanel>
                    <TabPanel>
                        <FamilyMembersPanel citizen={citizen} />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </article>
    );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
    return (
        <div className="border-line bg-panel-2 rounded-md border px-3 py-2">
            <div className="text-secondary text-xs">{label}</div>
            <div className="text-main mt-1 break-all">{value || '—'}</div>
        </div>
    );
}
