import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import authServices from '@/services/authServices';
import Cookies from 'js-cookie';
import useAuth from '@/hooks/useAuth';
import { useToast } from '../ui/use-toast';

export default function Header() {
    const { auth } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    const signOut = async () => {
        let response = await authServices.logout();
        Cookies.remove("user");
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        Cookies.remove("loggedIn");
        router.push('/login');
    }

    const refreshToken = async () => {
        const formData = {
            'token': Cookies.get('refreshToken')
        };
        let { data } = await authServices.refreshToken(formData);
        toast({
            title: 'Good.',
            description: 'access token successfully refreshed'
        });
        Cookies.remove('token');
        Cookies.set('token', data?.token);
    }





    const { setTheme } = useTheme();
    return (
        <header className="sticky inset-x-0 top-0 w-full">
            <nav className="flex items-center justify-between px-4 py-2 md:justify-end">
                <div className={cn('block lg:!hidden')}>
                    <MobileSidebar />
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={auth?.user?.name}
                                        alt={auth?.user?.name}
                                    />
                                    <AvatarFallback>{auth?.user?.name.split(' ')[0][0]}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {auth?.user?.name}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {auth?.user?.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                                    Profile
                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push('/dashboard/change-password')}>
                                    Change Password
                                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => refreshToken()}>
                                Refresh Token
                                <DropdownMenuShortcut>⇧⌘R</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => signOut()}>
                                Log out
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme('light')}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme('dark')}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme('system')}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        </header>
    );
}
