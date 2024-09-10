import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";


export default function UserInfo({ user, label }) {
    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">{label}</p>
            </CardHeader>
            <CardContent>
                <p>{user.name}</p>
            </CardContent>
        </Card>
    )
}