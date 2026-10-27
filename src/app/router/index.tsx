import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage } from '@/pages/dashboard';
import { CitizensPage } from '@/pages/citizens';
import { CitizenDetailsPage } from '@/pages/citizen-details';
import { AppLayout } from '@/app/providers/AppLayout';

export function AppRouter() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="citizens" element={<CitizensPage />} />
                <Route path="citizens/:id" element={<CitizenDetailsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}
