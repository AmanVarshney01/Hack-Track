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
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { getUser } from "@/server/queries";

export default async function AuthButton() {
  const user = await getUser();

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
            <div className="flex min-w-0 max-w-48 flex-row items-center justify-between gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback>
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="line-clamp-1 hidden truncate text-sm md:block">
                {user.name}
              </span>
              <ChevronDownIcon className="hidden h-4 w-4 md:block" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem disabled={true}>
              <span className="truncate text-sm">{user.email}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <Link href="/project/new" className="w-full">
                <Button variant={"secondary"} className="w-full">
                  Create Project
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <Link
                href="https://forms.gle/mpREKPiNAApJ41er8"
                className="w-full"
                target="_blank"
              >
                <Button variant={"secondary"} className="w-full">
                  Feedback
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <ThemeToggle />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <form action={signOut} className="w-full text-left">
                <Button variant={"destructive"} className="w-full">
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
