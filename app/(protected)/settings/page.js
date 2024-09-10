"use client";

import { userCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";

export default function SettingsPage() {
    const user = userCurrentUser();

    const onClick = () => {
        signOut();
    }

    return (
        <div className="bg-white p-10 rounded-xl">
            <form>
                <button onClick={onClick} type="submit">
                    Sign out
                </button>
            </form>
        </div>
    )
}