import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { withProviders } from './providers';
import UsersPage from '../pages/users';
import UserDetailPage from '../pages/users/[id]';
import CreateUserPage from '../pages/users/new';
import EditUserPage from '../pages/users/[id]/edit';

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-xl font-bold text-gray-800">User Management System</h1>
                </div>
            </header>
            <main>
                <Routes>
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/users/new" element={<CreateUserPage />} />
                    <Route path="/users/:id" element={<UserDetailPage />} />
                    <Route path="/users/:id/edit" element={<EditUserPage />} />
                    <Route path="/" element={<Navigate to="/users" replace />} />
                </Routes>
            </main>
        </div>
    );
};

export default withProviders(() => <App />);
