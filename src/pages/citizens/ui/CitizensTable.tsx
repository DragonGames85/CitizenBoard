import { createColumnHelper } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { type Citizen, EmploymentBadge, genderLabel, nationalityLabel } from '@/entities/citizen';

import { formatDate, fullName } from '@/shared/lib/format';
import { Table, tableFeaturesSet } from '@/shared/ui/Table';

const helper = createColumnHelper<typeof tableFeaturesSet, Citizen>();

const columns = helper.columns([
    helper.accessor('id', { header: 'ID', size: 100 }),
    helper.accessor(row => fullName(row), { id: 'fio', header: 'ФИО', size: 260 }),
    helper.accessor('gender', {
        header: 'Пол',
        size: 110,
        cell: info => genderLabel[info.getValue()],
    }),
    helper.accessor('birthDate', {
        header: 'Дата рождения',
        size: 140,
        cell: info => formatDate(info.getValue()),
    }),
    helper.accessor('nationality', {
        header: 'Гражданство',
        size: 140,
        cell: info => nationalityLabel[info.getValue()],
    }),
    helper.accessor('phone', { header: 'Телефон', size: 150 }),
    helper.accessor('email', { header: 'Email', size: 240 }),
    helper.accessor('employmentStatus', {
        header: 'Занятость',
        size: 150,
        cell: info => <EmploymentBadge status={info.getValue()} />,
    }),
]);

export function CitizensTable({ data }: { data: Citizen[] }) {
    const navigate = useNavigate();

    return <Table data={data} columns={columns} onRowClick={citizen => navigate(`/citizens/${citizen.id}`)} />;
}
