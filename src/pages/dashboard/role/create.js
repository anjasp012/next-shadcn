import AuthenticationLayout from '@/components/layouts/AuthenticatedLayout';
import { Breadcrumbs } from '@/components/mine/Breadcrumbs';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormRole from '@/components/mine/form/FormRole';


const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'User', link: '/dashboard/user' },
    { title: 'Create', link: '/dashboard/user/create' }
];


export default function Create() {
    return (
        <AuthenticationLayout>
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Add Role</h2>
                        <p className="text-sm text-muted-foreground">Add New Role</p>
                    </div>
                </div>
                <Separator />

                <FormRole />
            </div>
        </AuthenticationLayout>
    )
}
