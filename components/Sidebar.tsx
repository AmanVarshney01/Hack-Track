import { Button } from "./ui/button";

export default function Sidebar() {
  return (
    <aside className="hidden min-h-svh w-52 flex-col items-start gap-2 border-r md:flex">
      <section className="p-4">
        <h2>Your Project</h2>
        {/* <Button variant="link">Project</Button> */}
      </section>
    </aside>
  );
}
