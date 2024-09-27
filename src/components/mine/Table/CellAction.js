import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Edit, Info, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Cookies from 'js-cookie';
import useAuth from '@/hooks/useAuth';

export const CellAction = ({ data, url, onDelete }) => {
    const { auth } = useAuth();

    const [showAlert, setShowAlert] = useState(false);

    const router = useRouter();

    const actionDelete = async (id) => {
        await onDelete(id);
    };

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() => router.push(`/dashboard/${url}/detail/${data.id}`)}
                    >
                        <Info className="mr-2 h-4 w-4" /> Detail
                    </DropdownMenuItem>
                    {auth?.user?.role == 'superadmin' ?
                        <>
                            <DropdownMenuItem
                                onClick={() => router.push(`/dashboard/${url}/edit/${data.id}`)}
                            >
                                <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                                e.preventDefault();
                                setShowAlert(true);
                            }}>
                                <Trash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                            <AlertDialog open={showAlert} onOpenChange={(open) => setShowAlert(false)}>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete user and remove data from servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => setShowAlert(false)}>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => {
                                            setShowAlert(false);
                                            actionDelete(data.id)
                                        }}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </>
                        : ''}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
