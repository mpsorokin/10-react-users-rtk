import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    useGetUserQuery,
    useDeleteUserMutation
} from '../../features/user-management/api/userApi';
import { Button } from '../../shared/ui/Button';

const UserDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: user, isLoading, error } = useGetUserQuery(Number(id));
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await deleteUser(Number(id));
            navigate('/users');
        }
    };

    if (isLoading) return <div className="text-center py-8">Loading user...</div>;
    if (error || !user) return <div className="text-center text-red-500 py-8">User not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    <div className="flex space-x-2">
                        <Link to="/users">
                            <Button variant="secondary" size="sm">
                                Back to List
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700">{user.description}</p>
                </div>

                <div className="flex space-x-3">
                    <Link to={`/users/${id}/edit`}>
                        <Button>Edit User</Button>
                    </Link>
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete User'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserDetailPage;