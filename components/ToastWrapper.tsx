"use client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

  //   toast("Event has been created", {
  //     description: "Sunday, December 03, 2023 at 9:00 AM",
  //     action: {
  //       label: "Undo",
  //       onClick: () => console.log("Undo"),
  //     },
  //   })
  return null;
}
