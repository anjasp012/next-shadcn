import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/router';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import authServices from '@/services/authServices';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function FormChangePassword() {
    const router = useRouter();
    const fullPath = router.asPath;
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const schema = yup
        .object()
        .shape({
            currentPassword: yup.string().required('Current Password is a required field'),
            newPassword: yup.string().required('New Password is a required field'),
        })
        .required();
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
        }
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            let results = await authServices.changePassword(data);
            console.log(results);

            form.reset();

            toast({
                title: 'Good.',
                description: results.data.message
            });
            router.push(`/dashboard`);
        } catch ({ response }) {
            console.log(response);

            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: response.data.message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-8"
            >
                <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    disabled={loading}
                                    placeholder="current password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    disabled={loading}
                                    placeholder="new password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {fullPath.includes('/detail') || fullPath.includes('/profile') ? '' :
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save
                    </Button>
                }
            </form>
        </Form>
    )
}
