import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  return user ? (
    <div className="flex min-w-0 flex-col gap-4">
      <div className=" flex flex-col gap-1">
        <Avatar>
          <AvatarImage src={user.user_metadata.avatar_url} />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
        <span>{user.user_metadata.full_name}</span>
        <span className=" truncate text-sm">{user.email}</span>
      </div>
      <form action={signOut}>
        <button className="">Logout</button>
      </form>
    </div>
  ) : (
    <Link href="/login" className="no-underline">
      Login
    </Link>
  );
}
