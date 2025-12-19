"use client";

import {z} from "zod"
import { useForm } from "react-hook-form"
import { OctagonAlertIcon } from "lucide-react";
import {zodResolver} from "@hookform/resolvers/zod"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import {useRouter} from "next/navigation"
import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert"
import { 
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form
} from "@/components/ui/form"
import { error } from "console";
import { se } from "date-fns/locale";
import { set } from "date-fns";

const fromSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long")
})

export const SignInView = () => {
    const router = useRouter()
    const [error , setError] = useState<string | null>(null)
    const [pending , setPending] = useState(false)

    const onSubmit = (data: z.infer<typeof fromSchema>) => {
        setError(null)
        setPending(true)

        authClient.signIn.email({
            email: data.email,
            password: data.password
        },{
            onSuccess: () => {
                setPending(false)
                router.push("/")
            },
            onError: ({error}) => {
                setError(error.message)
            }
        })
    }


    const form = useForm<z.infer<typeof fromSchema>>({
        resolver: zodResolver(fromSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })


    return(
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">
                                        Welcome Back
                                    </h1>
                                    <p className="text-muted-foreground text-balance">
                                        Login to your account to continue
                                    </p>
                                </div>
                                <div className="grid gap-3">
                                    <FormField 
                                        control= {form.control}
                                        name ="email"
                                        render ={({field})=>(
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type ="email"
                                                        placeholder="Enter your email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField 
                                        control= {form.control}
                                        name ="password"
                                        render ={({field})=>(
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type ="password"
                                                        placeholder="*********"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {
                                    !!error && (
                                        <Alert className="bg/destructive/10 border-none">
                                            <OctagonAlertIcon className="h-4 w-4 !text-destructive"/>
                                            <AlertTitle>{error}</AlertTitle>
                                        </Alert>
                                    )
                                }
                                <Button
                                    disabled={pending}
                                    type="submit"
                                    className="w-full"
                                >
                                    Sign In
                                </Button>
                                <div className="after:border-border relative text-center text-sm after:absolute after:insert-0 after:z-0 after:top-1/2 after:flex after:items-center after:border-t">
                                    <span className="text-muted-foreground bg-card relative z-10 px-2">
                                        Or continue with
                                    </span>
                                </div>
                                <div className="grid grid-col-2 gap-4">
                                    <Button
                                        disabled={pending}
                                        variant="outline"
                                        type= "button"
                                        className="w-full"
                                        >
                                        Google
                                    </Button>
                                </div>
                                <div className="grid grid-col-2 gap-4">
                                    <Button
                                        disabled={pending}
                                        variant="outline"
                                        type= "button"
                                        className="w-full"
                                        >
                                        Github
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Don&apos;t Have an account?{" "} 
                                    <Link 
                                        href="/sign-up"
                                        className="underline underline-offset-4"
                                    >Sign Up</Link>
                                </div>
                            </div>
                        </form>
                    </Form> 

                    <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                        <img src="" alt="Meet Ai Logo" className="h-[92px] w-[92px]"/>
                        <p className="text-white text-2xl font-semibold">Meet Ai</p>
                    </div>
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                © 2025 Meet Ai. All rights reserved.
            </div>
        </div>
    )
} 

