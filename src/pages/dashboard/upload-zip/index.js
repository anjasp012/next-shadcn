import AuthenticationLayout from '@/components/layouts/AuthenticatedLayout';
import { Breadcrumbs } from '@/components/mine/Breadcrumbs';
import { Separator } from '@/components/ui/separator';
import FormZip from '@/components/mine/form/FormZip';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Upload Zip', link: '/dashboard/upload-zip' },
];


export default function Index() {
    return (
        <AuthenticationLayout>
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Upload Zip</h2>
                        <p className="text-sm text-muted-foreground">Upload New Zip</p>
                    </div>
                </div>
                <Separator />

                <FormZip />
            </div>
        </AuthenticationLayout >
    )
}
