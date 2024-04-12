import AuthButton from "./AuthButton";
import MobileSidebar from "./MobileSidebar";
import { SlashIcon } from "@radix-ui/react-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Navbar() {
  return (
    <nav className=" flex w-full flex-row justify-between border-b px-4 py-2">
      <div className="flex flex-row items-center justify-center gap-4">
        <MobileSidebar />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className=" text-base font-medium text-foreground"
                href="/"
              >
                GLA Project Tracker
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <AuthButton />
    </nav>
  );
}
