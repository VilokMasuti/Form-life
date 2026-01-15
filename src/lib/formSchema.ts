import { z } from "zod";


export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email must be less than 254 characters"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must be less than 20 characters"),

  linkedin: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .regex(/^https?:\/\/(www\.)?linkedin\.com\/.+$/, "Must be a LinkedIn profile URL")
    .optional()
    .or(z.literal("")),

  github: z
    .string()
    .url("Please enter a valid GitHub URL")
    .regex(/^https?:\/\/(www\.)?github\.com\/.+$/, "Must be a GitHub profile URL")
    .optional()
    .or(z.literal("")),
});


export const experienceItemSchema = z.object({
  id: z.string(),
  company: z
    .string()
    .min(1, "Company name is required")
    .max(100, "Company name must be less than 100 characters"),
  position: z
    .string()
    .min(1, "Position is required")
    .max(100, "Position must be less than 100 characters"),
  startDate: z
    .string()
    .min(1, "Start date is required")
    .regex(/^\d{4}-\d{2}$/, "Invalid date format"),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}$/, "Invalid date format")
    .optional()
    .or(z.literal("")),
  current: z.boolean().default(false),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
});

export const experienceSchema = z.object({
  experiences: z
    .array(experienceItemSchema)
    .min(1, "Please add at least one work experience"),
});

export const skillsSchema = z.object({
  skills: z
    .array(z.string().min(1))
    .min(1, "Please select at least one skill")
    .max(6, "Maximum 6 skills allowed"),
});

export const fullFormSchema = z.object({
  personalInfo: personalInfoSchema,
  experience: experienceSchema,
  skills: skillsSchema,
});

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type ExperienceItemData = z.infer<typeof experienceItemSchema>;
export type ExperienceData = z.infer<typeof experienceSchema>;
export type SkillsData = z.infer<typeof skillsSchema>;
export type FullFormData = z.infer<typeof fullFormSchema>;


export const AVAILABLE_SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "Go",
  "Rust",
  "SQL",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "GCP",
  "Azure",
  "Git",
  "CI/CD",
  "Agile",
  "Scrum",
  "REST APIs",
  "GraphQL",
  "HTML/CSS",
  "Tailwind CSS",
  "Next.js",
  "Express.js",
] as const;
