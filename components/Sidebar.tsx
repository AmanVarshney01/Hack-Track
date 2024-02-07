import AuthButton from "./AuthButton";
import { Button } from "./ui/button";

export default function Sidebar() {
  return (
    <nav className=" flex min-h-svh w-52 flex-col items-start gap-2 border-r">
      <div className="w-full p-2">
        <AuthButton />
      </div>
      <div className="p-4">
        <h2>Your Project</h2>
        {/* <Button variant="link">Project</Button> */}
      </div>
    </nav>
  );
}
