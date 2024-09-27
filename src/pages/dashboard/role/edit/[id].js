import AuthenticationLayout from '@/components/layouts/AuthenticatedLayout';
import { Breadcrumbs } from '@/components/mine/Breadcrumbs';
import { Separator } from '@/components/ui/separator';
import FormRole from '@/components/mine/form/FormRole';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Role', link: '/dashboard/role' },
    { title: 'Edit', link: '/dashboard/role/edit' }
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

                <FormRole />
            </div>
        </AuthenticationLayout>
    )
}
