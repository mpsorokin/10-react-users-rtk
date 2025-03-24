import { baseApi } from '../../../shared/api/baseApi';
import { User, CreateUserRequest, UpdateUserRequest } from '../../../entities/user/model/types';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => '/users',
            providesTags: ['User'],
        }),
        getUser: builder.query<User, number>({
            query: (id) => `/users/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'User', id }],
        }),
        createUser: builder.mutation<User, CreateUserRequest>({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation<User, UpdateUserRequest>({
            query: ({ id, ...rest }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: { id, ...rest },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'User', id }, 'User'],
        }),
        deleteUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;
