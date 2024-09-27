import AuthenticationLayout from "@/components/layouts/AuthenticatedLayout";
import { Breadcrumbs } from "@/components/mine/Breadcrumbs";
import { CellAction } from "@/components/mine/Table/CellAction";
import { DataTable } from "@/components/mine/Table/Datatable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import userServices from "@/services/userServices";
import { ArrowUpDown, Plus } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'User', link: '/dashboard/user' }
];

const columns = (handleDelete) => [
    {
        accessorKey: "no",
        header: "No",
        cell: ({ row }) => row.index + 1
    },
    {
        accessorKey: "avatar",
        header: "Avatar",
        cell: ({ row }) => <Avatar className="h-8 w-8">
            <AvatarImage
                src={`https://cdngambarsdy.s3.ap-southeast-2.amazonaws.com/${row.original.avatar}`}
                alt={row.original.name}
            />
            <AvatarFallback>{row.original.name.split(' ')[0][0]}</AvatarFallback>
        </Avatar>
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => `${row.original.name}`
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => `${row.original.email}`
    },
    {
        accessorKey: "role.name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Role
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => `${row.original.role.name}`
    },
    {
        accessorKey: 'actions',
        cell: ({ row }) => <CellAction data={row.original} url={'user'} onDelete={handleDelete} />
    }
]


export default function Index() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const { toast } = useToast();
    let getAllUsers = async () => {
        try {
            const response = await userServices.getAllUsers();
            console.log(response);

            if (response.status == 200) {
                setUsers(response?.data.users);
            }

        } catch (error) {

            console.log(error.response);
        }

    };
    useEffect(() => {
        getAllUsers();
    }, []);

    const handleDelete = async (id) => {
        let results = await userServices.deleteUser(id);

        toast({
            title: 'Good',
            description: results.data.message
        });
        getAllUsers();

    };
    return (
        <AuthenticationLayout>
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Users ({users?.length})</h2>
                        <p className="text-sm text-muted-foreground">Manage users (Client side table functionalities.)</p>
                    </div>
                    <Button
                        className="text-xs md:text-sm"
                        onClick={() => router.push(`/dashboard/user/create`)}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                </div>
                <Separator />
                <DataTable data={users} columns={columns(handleDelete)} />
            </div>
        </AuthenticationLayout>
    );
}
