import { LogOut } from "lucide-react";
import { Button } from './ui/button'
import Search from "./Search";
import FileUploader from "./FileUploader";
import { signOut } from "@/auth";

const Header = () => {
  return (
    <header className='header'>
      <Search />

      <div className="header-wrapper">
        <FileUploader />

        <form action={async () => {
          "use server";
          await signOut({ redirectTo: "/sign-in" });
        }}>
          <Button type="submit" className="sign-out-button">
            <LogOut size={24} />
          </Button>
        </form>
      </div>

    </header>
  )
}

export default Header