import {z} from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage
} from "@/components/ui/form.tsx";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {Toaster} from "@/components/ui/toaster.tsx";
import {useToast} from "@/hooks/use-toast.ts";

export default function Component({contextQuery, defaultQuery, task}: {
    contextQuery?: string,
    defaultQuery: string,
    task: string
}) {
    const schema = z.object({
        query: z.string().min(5).max(100),
    })

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            query: defaultQuery,
        },
    })

    async function onSubmit(values: z.infer<typeof schema>) {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: values.query
        }).then(res => res.json())
            .then(data => {
                if (data.status === 'error') {
                    throw new Error();
                } else {
                    toast({
                        title: 'Query executed',
                    })
                }
            }).catch(() => {
                toast({
                    title: 'Query failed',
                    description: "The answer does not seem to be quite right.",
                    variant: 'destructive'
                })
            })
    }

    const {toast} = useToast()

    return (
        <li className='h-screen w-full grid place-items-center'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="query"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{task}</FormLabel>
                                {contextQuery &&
                                    <SyntaxHighlighter language='sql' className='block p-2'>
                                        {contextQuery}
                                    </SyntaxHighlighter>
                                }
                                <FormControl>
                                    <Input placeholder={defaultQuery} {...field} />
                                </FormControl>
                                <FormDescription>
                                    Query to execute.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
            <Toaster/>
        </li>
    )
}