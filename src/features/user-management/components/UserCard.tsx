import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../../entities/user/model/types';
import { Button } from '../../../shared/ui/Button';

interface UserCardProps {
    user: User;
    onDelete: (id: number) => void;
    isDeleting: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onDelete, isDeleting }) => {
    return (
        <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-600 mt-1 mb-4">{user.description}</p>
            <div className="flex space-x-2">
                <Link to={`/users/${user.id}`}>
                    <Button size="sm">View</Button>
                </Link>
                <Link to={`/users/${user.id}/edit`}>
                    <Button size="sm" variant="secondary">
                        Edit
                    </Button>
                </Link>
                <Button
                    size="sm"
                    variant="danger"
                    onClick={() => onDelete(user.id)}
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
            </div>
        </div>
    );
};
