import { z } from "zod";

export const insertFormSchema = z.object({
  projectTitle: z.string().min(2).max(50),
  projectDescription: z.string().min(2).max(150),
  githubUrl: z.string().url().refine(async (value) => {
    try {
      const url = new URL(value);
      const response = await fetch(`https://api.github.com/repos${url.pathname}`);
      const data = await response.json();
      return response.ok && data;
    } catch (error) {
      return false;
    }
  }, {
    message: "Invalid GitHub URL",
  }).optional(),
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
  projectTitle: z.string().min(2).max(50),
});

export const updateDescriptionFormSchema = z.object({
  projectDescription: z.string().min(2).max(150),
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
  githubUrl: z.string().url().refine(async (value) => {
    try {
      const url = new URL(value);
      const response = await fetch(`https://api.github.com/repos${url.pathname}`);
      const data = await response.json();
      return response.ok && data;
    } catch (error) {
      return false;
    }
  }, {
    message: "Invalid GitHub URL",
  })
});

export const updateMembersFormSchema = z.object({
  members: z.array(
    z.object({
      email: z.string().email(),
      role: z.enum(["member", "mentor"]).default("member"),
    }),
  ),
})

export const insertMembersFormSchema = z.object({
  members: z.array(
    z.object({
      email: z.string().email(),
      role: z.enum(["member", "mentor"]).default("member"),
    }),
  ),
})