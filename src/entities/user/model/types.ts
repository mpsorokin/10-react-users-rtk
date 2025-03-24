export interface User {
    id: number;
    name: string;
    description: string;
}

export interface CreateUserRequest {
    name: string;
    description: string;
}

export interface UpdateUserRequest {
    id: number;
    name: string;
    description: string;
}