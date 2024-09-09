"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export async function register(defaultValues) {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    return { success: "Email sent!"}
}