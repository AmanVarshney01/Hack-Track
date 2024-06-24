"use client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ToastWrapper({
  message,
  label,
  goto,
}: {
  message: string;
  label?: string;
  goto?: string;
}) {
  const router = useRouter();

  useEffect(() => {
    if (label && goto) {
      toast.info(message, {
        action: {
          label: label,
          onClick: () => router.push(goto),
        },
      });
    } else {
      toast.info(message);
    }
  }, []);

  return null;
}
