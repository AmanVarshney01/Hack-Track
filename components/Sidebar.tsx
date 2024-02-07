import AuthButton from "./AuthButton";
import { Button } from "./ui/button";

export default function Sidebar() {
  return (
    <nav className=" flex min-h-svh w-52 flex-col items-start justify-between gap-2 border-r">
      <div className="p-4">
        <h2>Your Project</h2>
        {/* <Button variant="link">Project</Button> */}
      </div>
      <div className=" h-40 w-full border-t p-2">
        <AuthButton />
      </div>
    </nav>
  );
}
