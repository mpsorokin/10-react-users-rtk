import React from 'react';
import { Link } from 'react-router-dom';
import {
    useGetUsersQuery,
    useDeleteUserMutation
} from '../../features/user-management/api/userApi';
import { UserCard } from '../../features/user-management/components/UserCard';
import { Button } from '../../shared/ui/Button';

export const UserList: React.FC = () => {
    const { data: users, isLoading, error } = useGetUsersQuery();
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await deleteUser(id);
        }
    };

    if (isLoading) return <div className="text-center py-8">Loading users...</div>;
    if (error) return <div className="text-center text-red-500 py-8">Error loading users</div>;
    if (!users || users.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="mb-4">No users found</p>
                <Link to="/users/new">
                    <Button>Create New User</Button>
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Users</h2>
                <Link to="/users/new">
                    <Button>Create New User</Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onDelete={handleDelete}
                        isDeleting={isDeleting}
                    />
                ))}
            </div>
        </div>
    );
};