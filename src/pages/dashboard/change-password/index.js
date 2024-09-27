import AuthenticationLayout from '@/components/layouts/AuthenticatedLayout';
import { Breadcrumbs } from '@/components/mine/Breadcrumbs';
import { Separator } from '@/components/ui/separator';

import FormChangePassword from '@/components/mine/form/FormChangePassword';


const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Change Password', link: '/dashboard/change-password' },
];


export default function ChangePassword() {
    return (
        <AuthenticationLayout>
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Change Password</h2>
                        <p className="text-sm text-muted-foreground">Change My Password</p>
                    </div>
                </div>
                <Separator />

                <FormChangePassword />
            </div>
        </AuthenticationLayout>
    )
}
