import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/router';
import { useToast } from '@/components/ui/use-toast';

import zipServices from '@/services/zipService';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { File, FileArchive } from 'lucide-react';


export default function FormZip() {
    const router = useRouter();
    const { toast } = useToast();
    const [preview, setPreview] = useState();
    const [loading, setLoading] = useState();

    const form = useForm({
        defaultValues: {
            file: '',
        }
    });

    const triggerFileInput = () => {
        document.getElementById('file').click();
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('file', data.file);
            console.log(formData);

            let results = await zipServices.addZip(formData);
            if (results.status == 200) {
                toast({
                    title: 'Good',
                    description: 'File successfully added'
                });
            } else {
                toast({
                    title: 'Good',
                    variant: 'destructive',
                    description: 'File failed added'
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
            form.setValue('file', selectedFile)
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(true);
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
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>File</FormLabel>
                            <div className='relative w-full h-[200px] dark:bg-zinc-800 rounded border border-dashed group' >
                                {preview ? (
                                    <>
                                        <div className='relative w-full h-full'>
                                            <FileArchive className="w-full h-full p-10 object-contain" />
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={triggerFileInput}
                                                >
                                                    Click to change an file
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className='absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2'>
                                        <Button variant="outline" type="button" onClick={triggerFileInput}>Click to select an file</Button>
                                    </div>
                                )}
                            </div>
                            <Input
                                className="hidden"
                                id="file"
                                type="file"
                                disabled={loading}
                                onChange={handleFileChange}
                                placeholder="file"
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
