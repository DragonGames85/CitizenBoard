import { HiOutlineChartBar, HiOutlineUsers } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

import { classNames } from '../shared/lib/classNames';

const links = [
    { to: '/', label: 'Dashboard', icon: HiOutlineChartBar },
    { to: '/citizens', label: 'Список граждан', icon: HiOutlineUsers },
];

export function AppNav({ className }: { className?: string }) {
    return (
        <nav className={classNames('flex gap-1', className)} aria-label="Основное меню">
            {links.map(({ to, label, icon: Icon }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                        classNames(
                            'flex items-center gap-2 rounded-md px-3 py-3 text-sm transition',
                            isActive
                                ? 'border-neon/40 bg-neon/10 text-neon'
                                : 'text-secondary hover:border-line hover:bg-panel-2 hover:text-main',
                        )
                    }
                >
                    <Icon size={18} aria-hidden />
                    {label}
                </NavLink>
            ))}
        </nav>
    );
}

export function Sidebar() {
    return (
        <aside className="border-line bg-panel/95 top-4 my-4 ml-4 hidden h-[calc(100vh-2rem)] w-64 shrink-0 flex-col overflow-hidden rounded-xl border lg:flex">
            <div className="border-line border-b px-4 py-4">
                <p className="text-main text-xl font-medium">Citizen Board</p>
            </div>
            <AppNav className="flex-col p-3" />
        </aside>
    );
}
