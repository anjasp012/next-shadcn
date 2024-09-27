import AuthenticationLayout from '@/components/layouts/AuthenticatedLayout';
import { Breadcrumbs } from '@/components/mine/Breadcrumbs';
import { Separator } from '@/components/ui/separator';
import FormImage from '@/components/mine/form/FormImage';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Upload Image', link: '/dashboard/upload-image' },
];


export default function Create() {
    return (
        <AuthenticationLayout>
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Upload Image</h2>
                        <p className="text-sm text-muted-foreground">Upload New Image</p>
                    </div>
                </div>
                <Separator />

                <FormImage />
            </div>
        </AuthenticationLayout >
    )
}
