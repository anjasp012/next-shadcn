import AuthenticationLayout from '@/components/layouts/AuthenticatedLayout';
import { Breadcrumbs } from '@/components/mine/Breadcrumbs';
import { Separator } from '@/components/ui/separator';
import FormUser from '@/components/mine/form/FormUser';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'User', link: '/dashboard/user' },
    { title: 'Edit', link: '/dashboard/user/edit' }
];


export default function Edit() {
    return (
        <AuthenticationLayout>
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Edit User</h2>
                        <p className="text-sm text-muted-foreground">Edit User Profile</p>
                    </div>
                </div>
                <Separator />

                <FormUser />
            </div>
        </AuthenticationLayout>
    )
}
