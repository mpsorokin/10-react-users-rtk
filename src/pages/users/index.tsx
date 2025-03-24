import React from 'react';
import { UserList } from '../../widgets/user-list';

const UsersPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <UserList />
        </div>
    );
};

export default UsersPage;