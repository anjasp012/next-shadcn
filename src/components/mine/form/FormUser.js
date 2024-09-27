import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/router';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import roleServices from '@/services/roleServices';
import userServices from '@/services/userServices';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import authServices from '@/services/authServices';


export default function FormUser() {
    const [roles, setRoles] = useState();
    const router = useRouter();
    const fullPath = router.asPath;
    const { toast } = useToast();
    const [imagePreview, setImagePreview] = useState();
    const [loading, setLoading] = useState();


    const schema = yup
        .object()
        .shape({
            name: yup.string().required(),
            username: yup.string().required(),
            email: yup.string().required(),
            phone: yup.string().required(),
            roleId: yup.string().required('Role is a required field'),
            password: yup.string().required(),
        })
        .required();
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            avatar: '',
            name: '',
            username: '',
            email: '',
            phone: '',
            roleId: '',
        }
    });

    let getUser = async () => {
        const response = await userServices.getDetailUser(router.query.id);
        if (response.status == 200) {
            form.reset(response.data.user);
            if (response.data.user.avatar != null) {
                setImagePreview(`https://cdngambarsdy.s3.ap-southeast-2.amazonaws.com/${response.data.user.avatar}`)
            }
        }
    };

    useEffect(() => {
        if (router.query.id) {
            getUser();
        }
    }, [router.query.id]);

    let getMe = async () => {
        const results = await authServices.getMe();
        form.reset(results?.data.user);
        setLoading(true)
    };

    let getRoles = async () => {
        const results = await roleServices.getAllRoles();
        setRoles(results.data)
    };

    useEffect(() => {
        {
            fullPath.includes('/profile') &&
                getMe()
        }
        getRoles();
    }, []);



    const triggerFileInput = () => {
        document.getElementById('avatar').click();
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const updateData = {
                ...data,
                roleId: parseInt(data.roleId)
            }
            const formData = new FormData();
            formData.append('name', updateData.name);
            formData.append('username', updateData.username);
            formData.append('email', updateData.email);
            formData.append('phone', updateData.phone);
            // formData.append('roleId', updateData.roleId);
            if (updateData.avatar != '') {
                formData.append('avatar', updateData.avatar);
            }

            if (router.query.id) {
                let results = await userServices.updateUser(router.query.id, formData);
                toast({
                    title: 'Good',
                    description: results.data.message
                });
            } else {
                const updateData = {
                    ...data,
                    roleId: parseInt(data.roleId)
                }
                let results = await userServices.addUser(updateData);
                toast({
                    title: 'Good',
                    description: results.data.message
                });
            }

            router.push(`/dashboard/user`);
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

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            form.setValue('avatar', selectedFile)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={fullPath.includes('/detail') ? (e) => e.preventDefault() : form.handleSubmit(onSubmit)}
                className="w-full space-y-8"
            >
                <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Avatar</FormLabel>
                            <div className='relative w-full h-[120px] dark:bg-zinc-800 rounded border border-dashed group' >
                                {imagePreview ? (
                                    <>
                                        <div className='relative w-full h-full'>
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={triggerFileInput}
                                                >
                                                    Click to change an image
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className='absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2'>
                                        <Button variant="outline" type="button" onClick={triggerFileInput}>Click to select an image</Button>
                                    </div>
                                )}
                            </div>
                            <Input
                                className="hidden"
                                id="avatar"
                                type="file"
                                disabled={loading}
                                onChange={handleFileChange}
                                placeholder="avatar"
                            // {...field}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="gap-8 md:grid md:grid-cols-3">
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
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input

                                        disabled={loading}
                                        placeholder="username"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input

                                        disabled={loading}
                                        placeholder="phone"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="roleId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select
                                    disabled={loading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                defaultValue={field.value}
                                                placeholder="Select a roleId"
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {roles?.map((role) => (
                                            <SelectItem key={role.id} value={`${role.id}`}>
                                                {role.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input

                                        disabled={loading}
                                        placeholder="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {fullPath.includes('/create') &&
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input

                                            disabled={loading}
                                            placeholder="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    }
                </div>
                {fullPath.includes('/detail') || fullPath.includes('/profile') ? '' :
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save
                    </Button>
                }
            </form>
        </Form>
    )
}
