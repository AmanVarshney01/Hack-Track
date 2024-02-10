import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // console.log("user", user);
  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    user && (
      <div className="flex items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center rounded-3xl border p-2">
            <div className="flex flex-row items-center justify-between gap-2 ">
              <Avatar className="h-6 w-6">
                <AvatarImage src={user.user_metadata.avatar_url} />
                <AvatarFallback>DP</AvatarFallback>
              </Avatar>
              <span className=" truncate text-sm">
                {user.user_metadata.full_name}
              </span>
              <ChevronDownIcon className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span className=" truncate text-sm">{user.email}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form action={signOut}>
                <button className="">Logout</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <Avatar>
          <AvatarImage src={user.user_metadata.avatar_url} />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
        <span>{user.user_metadata.full_name}</span>
        <span className=" truncate text-sm">{user.email}</span> */}
        {/* <form action={signOut}>
        <button className="">Logout</button>
      </form> */}
      </div>
    )
  );
}
