import AuthenticationLayout from '@/components/layouts/AuthenticatedLayout';
import { Breadcrumbs } from '@/components/mine/Breadcrumbs';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import userServices from '@/services/userServices';
import FormUser from '@/components/mine/form/FormUser';
import authServices from '@/services/authServices';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Profile', link: '/dashboard/profile' },
];


export default function Profile() {
    const router = useRouter();
    const form = useForm({
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
                        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
                        <p className="text-sm text-muted-foreground">Detail My Profile</p>
                    </div>
                </div>
                <Separator />

                <FormUser form={form} inputDisabled={true} initialData={null}
                    key={null} />
            </div>
        </AuthenticationLayout>
    )
}
