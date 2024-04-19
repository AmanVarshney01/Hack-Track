"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className=" w-full"
      variant={"secondary"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <div className=" flex flex-row items-center justify-center gap-2">
          <SunIcon />
          <span>Light Mode</span>
        </div>
      ) : (
        <div className=" flex flex-row items-center justify-center gap-2">
          <MoonIcon />
          <span>Dark Mode</span>
        </div>
      )}
    </Button>
  );
}
