import AuthenticationLayout from "@/components/layouts/AuthenticatedLayout";
import { Breadcrumbs } from "@/components/mine/Breadcrumbs";
import { CellAction } from "@/components/mine/Table/CellAction";
import { DataTable } from "@/components/mine/Table/Datatable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import roleServices from "@/services/roleServices";
import { Plus } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Role', link: '/dashboard/role' }
];

const columns = (handleDelete) => [
    {
        accessorKey: "no",
        cell: ({ row }) => row.index + 1
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: 'actions',
        cell: ({ row }) => <CellAction data={row.original} url={'role'} onDelete={handleDelete} />

    }
]


export default function index() {
    const router = useRouter();
    const [roles, setRoles] = useState([]);
    const { toast } = useToast();
    const getAllRoles = async () => {
        const response = await roleServices.getAllRoles();
        setRoles(response.data);
    };
    useEffect(() => {
        getAllRoles();
    }, []);

    const handleDelete = async (id) => {
        let results = await roleServices.deleteRole(id);
        if (results.status == 200) {
            toast({
                title: 'Good',
                description: results.data.message
            });
        } else {
            toast({
                title: 'Opps Error',
                variant: 'destructive',
                description: results.data.message
            });
        }
        getAllRoles()
    };
    return (
        <AuthenticationLayout>
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Roles ({roles.length})</h2>
                        <p className="text-sm text-muted-foreground">Manage roles (Client side table functionalities.)</p>
                    </div>
                    <Button
                        className="text-xs md:text-sm"
                        onClick={() => router.push(`/dashboard/role/create`)}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                </div>
                <Separator />
                <DataTable data={roles} columns={columns(handleDelete)} />
            </div>
        </AuthenticationLayout>
    );
}
