import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import CardWrapper from "./card-wrapper";
import { signIn } from "@/auth";

export default function MagicLinkForm() {
    // const [isPending, startTransition] = useTransition();
    // const [error, setError] = useState("");
    // const [success, setSuccess] = useState("");


    // const form = useForm({
    //     resolver: zodResolver(MagicLinkSchema),
    //     defaultValues: {
    //         email: "",
    //     }
    // });

    // function onSubmit(values) {
    //     setError("");
    //     setSuccess("");

    //     startTransition(() => {
    //         register(values)
    //         .then(data => {
    //             setError(data?.error);
    //             setSuccess(data?.success);
    //         })
    //     })
    // }

    return (
        <CardWrapper
            headerLabel="Login with email"
            backButtonLabel="Login using credentials"
            backButtonHref="/auth/login"
        >
            {/* <Form {...form}>
                <form 
                    // onSubmit={form.handleSubmit(onSubmit)}
                    action={sendMagicLink}
                    className="space-y-6"    
                >
                    <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder="email@example.com"
                                        disabled={isPending}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success} />
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full">
                            Login
                    </Button>
                </form>
            </Form> */}

            <form
                action={async (formData) => {
                    "use server"

                    console.log(formData.get("email"))
                    const email = formData.get("email");

                    await signIn("resend", {
                        email,
                        redirectTo: DEFAULT_LOGIN_REDIRECT
                    })
                }}
            >
                <input type="text" name="email" placeholder="Email" />
                <button type="submit">Signin with Resend</button>
            </form>
        </CardWrapper>
    )
}