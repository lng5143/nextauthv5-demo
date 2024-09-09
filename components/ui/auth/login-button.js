"use client";

import { useRouter } from "next/navigation";

export default function LoginButton({children, mode = "redirect", asChild}) {
    const router = useRouter();

    function onClick() {
        console.log('login button clicked')
        router.push("/auth/login");
    }

    if (mode === "modal") {
        return (
            <span>
                TODO
            </span>
        )
    }
    
    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}