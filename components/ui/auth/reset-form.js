"use client";

import { useState, useTransition } from "react";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { ResetSchema } from "@/schemas";
import { Input } from "../input";
import { Button } from "../button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { reset } from "@/actions/reset";

export default function ResetForm() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const form = useForm({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: ""
        }
    });

    function onSubmit(values) {
        setError("");
        setSuccess("");

        startTransition(() => {
            reset(values)
            .then(data => {
                setError(data?.error);
                setSuccess(data?.success);
            })
        })
    }

    return (
        <CardWrapper
            headerLabel="Forgot your password?"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"    
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            placeholder="john.doe@example.com"
                                            type="email"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success} />
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full">
                            Send reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}