"use client";

import { ColumnDef } from "@tanstack/react-table";

// export type Tasks = Database["public"]["Tables"]["project_tasks"]["Row"];
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
];
