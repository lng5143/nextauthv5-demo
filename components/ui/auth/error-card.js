import CardWrapper from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function ErrorCard() {
    return (
        // <Card className="w-[400px] shadow-md">
        //     <CardHeader>
        //         <Header label="Oops! Something went wrong!" />
        //     </CardHeader>
        //     <CardFooter>
        //         <BackButton
        //             label="Back to login"
        //             href="/auth/login"
        //             />
        //     </CardFooter>
        // </Card>
        <CardWrapper
            headerLabel="Oops! Something went wrong!"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <div className="flex w-full justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive"/>
            </div>
        </CardWrapper>
    )
}