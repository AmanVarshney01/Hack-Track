"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import DeleteTaskButton from "./DeleteTaskButton";
import EditTaskButton from "./EditTaskButton";

export type Tasks = {
  id: number;
  title: string;
  created_by: string;
  priority: "high" | "medium" | "low";
  status: "completed" | "open" | "in progress";
};

export const columns: ColumnDef<Tasks>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "created_by",
    header: "Created By",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id, title, status, priority } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <EditTaskButton
              id={id}
              title={title}
              status={status}
              priority={priority}
            />
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuSeparator />
            <DeleteTaskButton id={id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
