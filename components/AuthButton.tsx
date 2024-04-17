import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";

export default async function AuthButton() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    user && (
      <div className="flex items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center rounded-lg border p-2">
            <div className="flex min-w-0 max-w-48 flex-row items-center justify-between gap-2 ">
              <Avatar className="h-6 w-6">
                <AvatarImage src={user.user_metadata.avatar_url} />
                <AvatarFallback>DP</AvatarFallback>
              </Avatar>
              <span className=" line-clamp-1 hidden truncate text-sm md:block">
                {user.user_metadata.full_name}
              </span>
              <ChevronDownIcon className="hidden h-4 w-4 md:block" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem disabled={true}>
              <span className=" truncate text-sm">{user.email}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <ThemeToggle />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className=" p-0" asChild>
              <form action={signOut} className=" w-full text-left">
                <Button variant={"destructive"} className=" w-full">
                  Logout
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  );
}
