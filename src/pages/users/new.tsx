import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation } from '../../features/user-management/api/userApi';
import { UserForm } from '../../features/user-management/components/UserForm';

const CreateUserPage: React.FC = () => {
    const [createUser, { isLoading }] = useCreateUserMutation();
    const navigate = useNavigate();

    const handleSubmit = async (name: string, description: string) => {
        try {
            await createUser({ name, description }).unwrap();
            navigate('/users');
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6">Create New User</h1>
                <UserForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default CreateUserPage;