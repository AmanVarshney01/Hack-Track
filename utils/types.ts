import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/utils/database.types";
import { z } from "zod";

export type TypedSupabaseClient = SupabaseClient<Database>;

export const insertFormSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(150),
  githubUrl: z.string().url().optional(),
  members: z.array(
    z.object({
      email: z.string().email(),
      role: z.enum(["member", "mentor"]).default("member"),
    }),
  ),
  startDate: z.date(),
  endDate: z.date(),
});

export const updateTitleFormSchema = z.object({
  name: z.string().min(2).max(50),
});

export const updateDescriptionFormSchema = z.object({
  description: z.string().min(2).max(150),
});

export const updateStartDateFormSchema = z.object({
  startDate: z.date(),
});

export const updateEndDateFormSchema = z.object({
  endDate: z.date(),
});

export const updateStatusFormSchema = z.object({
  status: z.enum(["active", "paused", "completed"]),
});

export const resourceFormSchema = z.object({
  resourceName: z.string().min(2).max(50),
  resourceUrl: z.string().url(),
});

export const taskFormSchema = z.object({
  taskTitle: z.string().min(2).max(50),
  status: z.enum(["open", "in progress", "completed"]),
  priority: z.enum(["high", "medium", "low"]),
})

export const githubFormSchema = z.object({
  githubUrl: z.string().url(),
});