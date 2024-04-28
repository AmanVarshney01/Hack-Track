"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
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
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className=" p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <CaretSortIcon className="ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className=" p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon className="ml-2" />
        </Button>
      );
    },
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
