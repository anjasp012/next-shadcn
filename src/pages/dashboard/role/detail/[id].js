import AuthenticationLayout from '@/components/layouts/AuthenticatedLayout';
import { Breadcrumbs } from '@/components/mine/Breadcrumbs';
import { Separator } from '@/components/ui/separator';
import FormRole from '@/components/mine/form/FormRole';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Role', link: '/dashboard/role' },
    { title: 'Detail', link: '/dashboard/role/detail' }
];


export default function Detail() {
    return (
        <AuthenticationLayout>
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Detail Role</h2>
                        <p className="text-sm text-muted-foreground">Detail Role</p>
                    </div>
                </div>
                <Separator />

                <FormRole inputDisabled={true} />
            </div>
        </AuthenticationLayout>
    )
}
