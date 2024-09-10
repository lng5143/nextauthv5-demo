import { currentUser } from "@/lib/auth"
import UserInfo from "@/components/user-info"

export default async function ServerPage() {
    const user = await currentUser();

    return (
        <div>
            <UserInfo user={user} label="Server component" />
        </div>
    )
}