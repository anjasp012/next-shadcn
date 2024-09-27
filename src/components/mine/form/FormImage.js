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
import imageServices from '@/services/imageService';


export default function FormUser() {
    const [roles, setRoles] = useState();
    const router = useRouter();
    const fullPath = router.asPath;
    const { toast } = useToast();
    const [preview, setPreview] = useState();
    const [loading, setLoading] = useState();

    const form = useForm({
        defaultValues: {
            image: '',
        }
    });

    const triggerFileInput = () => {
        document.getElementById('image').click();
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('image', data.image);
            let results = await imageServices.addImage(formData);
            if (results.status == 200) {
                toast({
                    title: 'Good',
                    description: 'Image successfully added'
                });
            } else {
                toast({
                    title: 'Good',
                    variant: 'destructive',
                    description: 'image failed added'
                });
            }
            router.push(`/dashboard`);
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
            form.setValue('image', selectedFile)
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
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
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <div className='relative w-full h-[200px] dark:bg-zinc-800 rounded border border-dashed group' >
                                {preview ? (
                                    <>
                                        <div className='relative w-full h-full'>
                                            <img src={preview} alt="preview" className="w-full h-full object-contain" />
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
                                id="image"
                                type="file"
                                disabled={loading}
                                onChange={handleFileChange}
                                placeholder="image"
                            // {...field}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={loading} className="ml-auto" type="submit">
                    Save
                </Button>
            </form>
        </Form>
    )
}
