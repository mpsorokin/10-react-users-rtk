import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../entities/user/model/types';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';

interface UserFormProps {
    user?: User;
    onSubmit: (name: string, description: string) => void;
    isLoading: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, isLoading }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState<{ name?: string; description?: string }>({});
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setDescription(user.description);
        }
    }, [user]);

    const validate = (): boolean => {
        const newErrors: { name?: string; description?: string } = {};
        if (!name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!description.trim()) {
            newErrors.description = 'Description is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(name, description);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter user name"
                error={errors.name}
            />
            <Input
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter user description"
                error={errors.description}
            />
            <div className="flex space-x-2">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : user ? 'Update User' : 'Create User'}
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate('/users')}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
};