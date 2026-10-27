import { Outlet } from 'react-router-dom';
import { AppNav, Sidebar } from '../ui/Sidebar';

export function AppLayout() {
    return (
        <div className="mx-auto flex min-h-screen max-w-[1600px]">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <header className="border-line bg-panel sticky top-0 border-b lg:hidden">
                    <div className="flex items-center justify-between gap-3 px-4 py-3">
                        <p className="text-main text-sm font-medium">Citizen Board</p>
                        <AppNav />
                    </div>
                </header>
                <main className="flex flex-1 flex-col px-4 py-5">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
