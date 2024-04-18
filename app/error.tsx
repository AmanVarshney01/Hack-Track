"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import cat from "@/public/cat-typing.gif";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className=" flex h-full w-full items-center justify-center bg-destructive p-10 text-destructive-foreground">
      <div className=" flex flex-col items-center justify-center gap-4">
        <Image src={cat} alt="Fast Typing Cat" />
        <h2 className=" text-xl">😭 I am working hard to fix this!</h2>
        <p className=" text-sm">{error.message}</p>
        <Button className="w-full" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
