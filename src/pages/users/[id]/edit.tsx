import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    useGetUserQuery,
    useUpdateUserMutation
} from '../../../features/user-management/api/userApi';
import { UserForm } from '../../../features/user-management/components/UserForm';

const EditUserPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: user, isLoading: isLoadingUser } = useGetUserQuery(Number(id));
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    const handleSubmit = async (name: string, description: string) => {
        if (!id) return;

        try {
            await updateUser({
                id: Number(id),
                name,
                description,
            }).unwrap();
            navigate(`/users/${id}`);
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    if (isLoadingUser) return <div className="text-center py-8">Loading user...</div>;
    if (!user) return <div className="text-center text-red-500 py-8">User not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6">Edit User: {user.name}</h1>
                <UserForm
                    user={user}
                    onSubmit={handleSubmit}
                    isLoading={isUpdating}
                />
            </div>
        </div>
    );
};

export default EditUserPage;