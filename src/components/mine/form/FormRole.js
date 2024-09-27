import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/router';
import { useToast } from '@/components/ui/use-toast';
import roleServices from '@/services/roleServices';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

export default function FormRole({ inputDisabled }) {
    const router = useRouter();
    const fullPath = router.asPath;
    const { toast } = useToast();
    const [loading, setLoading] = useState(inputDisabled);
    const schema = yup
        .object()
        .shape({
            name: yup.string().required(),
        })
        .required();
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: ''
        }
    })


    let getRole = async () => {
        const response = await roleServices.getDetailRole(router.query.id);
        form.reset(response.data);
    };

    useEffect(() => {
        if (router.query.id) {
            getRole();
        }
    }, [router.query.id]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            if (router.query.id) {
                let results = await roleServices.updateRole(router.query.id, data);
                toast({
                    title: 'Good',
                    description: results.data.message
                });
            } else {
                let results = await roleServices.addRole(data);
                toast({
                    title: 'Good',
                    description: results.data.message
                });
            }

            router.push(`/dashboard/role`);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={fullPath.includes('/detail') ? '' : form.handleSubmit(onSubmit)}
                className="w-full space-y-8"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={loading}
                                    placeholder="name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {fullPath.includes('/detail') ? '' :
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save
                    </Button>
                }
            </form>
        </Form>
    )
}
