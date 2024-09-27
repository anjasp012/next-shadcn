import AuthenticationLayout from '@/components/layouts/AuthenticatedLayout';
import { Breadcrumbs } from '@/components/mine/Breadcrumbs';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import FormUser from '@/components/mine/form/FormUser';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'User', link: '/dashboard/user' },
    { title: 'Create', link: '/dashboard/user/create' }
];


export default function Create() {
    const schema = yup
        .object()
        .shape({
            name: yup.string().required(),
            username: yup.string().required(),
            email: yup.string().required(),
            phone: yup.string().required(),
            roleId: yup.string().required('Role is a required field'),
            password: yup.string().required(),
        })
        .required();
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            avatar: '',
            name: '',
            username: '',
            email: '',
            phone: '',
            roleId: '',
        }
    });
    return (
        <AuthenticationLayout>
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Add User</h2>
                        <p className="text-sm text-muted-foreground">Add New User</p>
                    </div>
                </div>
                <Separator />

                <FormUser form={form} />
            </div>
        </AuthenticationLayout >
    )
}
