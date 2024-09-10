import { useSession } from "next-auth/react";

export const userCurrentUser = () => {
    const session = useSession();

    return session.data?.user;
}