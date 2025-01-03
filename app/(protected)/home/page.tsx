import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const HomePage = () => {
    return (
        <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/sign-in" });
        }}>
            <Button type="submit">Sign out</Button>
        </form>
    )
}

export default HomePage