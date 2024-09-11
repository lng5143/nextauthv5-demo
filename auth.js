import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import Resend from "next-auth/providers/resend";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",

    },
    providers: [
        ...authConfig.providers,
        Resend({
            from: "onboarding@resend.dev",
            apiKey: process.env.RESEND_API_KEY,
        }),
    ],
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            // Allow OAuth without email verification 
            if (!account || account.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id);
        
            // prevent sign in without email verfication
            if (existingUser && !existingUser.emailVerified) return false;

            // TODO: add 2FA check 
            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

                if (!twoFactorConfirmation) return false;

                // delete 2FA for next sign in 
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id}
                });
            }

            return true;
        },
        async session({ token, session, user }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role;
            }

            return session;
        },
        async jwt({ token, user, account, profile }) {
            console.log(token)

            if (!token.sub) return token 

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.role;

            return token;
        }
    }
});

