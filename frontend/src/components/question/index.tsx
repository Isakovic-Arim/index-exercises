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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {useToast} from "@/hooks/use-toast.ts";
import {cn} from "@/lib/utils.ts";
import {useState} from "react";

export default function Component({id, contextQuery, defaultQuery, solutionQuery, task, initialResolved, onResolve}: {
    id: number,
    contextQuery?: string,
    defaultQuery: string,
    solutionQuery: string,
    task: string,
    initialResolved: boolean,
    onResolve: () => void
}) {
    const [resolved, setResolved] = useState(initialResolved)

    const schema = z.object({
        query: z.string().min(5).max(255),
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
        if (values.query.toLowerCase() === solutionQuery.toLowerCase()) {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/${id}/resolve`, {
                method: 'POST'
            })
            setResolved(true)
            onResolve()
        }
    }

    const {toast} = useToast()

    return (
        <li className='h-screen w-full grid place-items-center'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className={cn("space-y-8 p-20 rounded-lg", resolved && 'border-2 border-green-500')}>
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
                    <div className='flex items-center gap-4'>
                        <Button type="submit" disabled={resolved}>Submit</Button>
                        <Accordion type='single' collapsible>
                            <AccordionItem value="solution">
                                <AccordionTrigger>Solution</AccordionTrigger>
                                <AccordionContent>
                                    <SyntaxHighlighter language='sql'>
                                        {solutionQuery}
                                    </SyntaxHighlighter>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </form>
            </Form>
            <Toaster/>
        </li>
    )
}