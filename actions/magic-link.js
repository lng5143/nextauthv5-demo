"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { MagicLinkSchema } from "@/schemas";
import { redirect } from "next/dist/server/api-utils";

export async function sendMagicLink(formData) {
    // const validatedFields = MagicLinkSchema.safeParse(values);

    // if (!validatedFields.success) {
    //     return { error: "Invalid fields!" };
    // }

    // const { email } = validatedFields.data;
    console.log(formData);
    console.log(typeof formData);

    await signIn("resend", formData);
}