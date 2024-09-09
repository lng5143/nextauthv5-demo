"use server";

import * as z from "zod";

import { AuthError } from "next-auth";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function login(values) {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
    } catch (err) {
        console.log("Invalid credentials")
        // if (error instanceof AuthError) {
        //     switch (error.type) {
        //         case "CredentialsSignin":
        //             return { error: "Invalid credentials!" }
        //         default: 
        //             return { error: "Something went wrong!" }
        //     }
        // }
        return { error: "Invalid credentials!" };
    }
}