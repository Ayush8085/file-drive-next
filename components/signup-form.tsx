"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"
import { SignUpSchema } from "@/schema"


const SignUpForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // 1. Define your form.
    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
        console.log(values)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
                    <h1 className="form-title">Sign Up</h1>
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <div className="shad-form-item">
                                    <FormLabel className="shad-form-label">Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your full name" className="shad-input" {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage className="shad-form-message" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <div className="shad-form-item">
                                    <FormLabel className="shad-form-label">Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" className="shad-input" {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage className="shad-form-message" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="shad-form-item">
                                    <FormLabel className="shad-form-label">Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="******" className="shad-input" {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage className="shad-form-message" />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading} className="form-submit-button">Sign Up</Button>

                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                    <div className="flex justify-center">
                        <p className="font-normal">
                            Already have an account?
                        </p>

                        <Link href="/sign-in" className="font-semibold text-slate-500 ml-2">
                            Sign In
                        </Link>
                    </div>
                </form>
            </Form>

            {/* OTP VERIFICATION */}
        </>
    )

}

export default SignUpForm