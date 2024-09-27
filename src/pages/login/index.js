import Link from 'next/link'
import React, { useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import authServices from '@/services/authServices';
import { useRouter } from 'next/router';
import AuthLayout from '@/components/layouts/AuthLayout';
import Cookies from 'js-cookie';
import nookies from 'nookies';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from '@/components/ui/use-toast';

export default function Login() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const schema = yup
        .object()
        .shape({
            identifier: yup.string().required(),
            password: yup.string().required(),
        })
        .required();
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            identifier: '',
            password: '',
        }
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const results = await authServices.login(data);

            if (results.status == 200) {
                Cookies.set("user", JSON.stringify(results?.data.user));
                Cookies.set("token", results?.data.token);
                Cookies.set("refreshToken", results?.data.refreshToken);
                form.reset();
                toast({
                    title: "Good.",
                    description: results.data.message,
                })
                router.push('/dashboard');
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: results.data.message,
                })

            }
            setLoading(false)


            // setUsers(results.users);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false)
        }
    };

    return (
        <AuthLayout>
            <div className="flex h-full items-center p-4 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Sign in your account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your identifier and password below to login
                        </p>
                    </div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full space-y-2"
                        >
                            <FormField
                                control={form.control}
                                name="identifier"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email or Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter your email or username..."
                                                disabled={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password..."
                                                disabled={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button disabled={loading} className="ml-auto w-full" type="submit">
                                Sign In
                            </Button>
                        </form>
                    </Form>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        dont have account?{' '}
                        <Link
                            href="/register"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Sign up Here
                        </Link>{' '}
                    </p>
                </div>
            </div>
        </AuthLayout>
    )
}
