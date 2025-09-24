import { z } from "zod";

export const formSchema = z.object({
  prompt: z.string().min(2, {
    message: "You must input something.",
  }),
});

export type GuideForm = z.infer<typeof formSchema>;
