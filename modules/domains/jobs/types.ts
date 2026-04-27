import { z } from 'zod'
import { AppLanguageEnum } from '../common/I18nTypes'

/* =========================================================
   ENUMS
========================================================= */

export const JobStatusEnum = z.enum([
  'DRAFT',
  'PUBLISHED',
  'PAUSED',
  'CLOSED',
  'ARCHIVED',
])

export const JobTypeEnum = z.enum([
  'FULL_TIME',
  'PART_TIME',
  'CONTRACT',
  'FREELANCE',
  'INTERNSHIP',
])

export const JobWorkModeEnum = z.enum([
  'ONSITE',
  'REMOTE',
  'HYBRID',
])

export const JobExperienceLevelEnum = z.enum([
  'JUNIOR',
  'MID',
  'SENIOR',
  'LEAD',
  'DIRECTOR',
])

export const ApplicationStatusEnum = z.enum([
  'PENDING',
  'REVIEWING',
  'SHORTLISTED',
  'INTERVIEW',
  'OFFERED',
  'REJECTED',
  'WITHDRAWN',
])

export const EmploymentCurrencyEnum = z.enum([
  'TRY',
  'USD',
  'EUR',
  'GBP',
])

/* =========================================================
   COMPANY
========================================================= */

export const CompanySchema = z.object({
  companyId: z.string(),

  name: z.string(),
  slug: z.string(),

  description: z.string().nullable().optional(),

  logo: z.string().nullable().optional(),
  website: z.string().url().nullable().optional(),

  industry: z.string().nullable().optional(),
  size: z.string().nullable().optional(),

  location: z.string().nullable().optional(),

  verified: z.boolean().default(false),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   JOB CATEGORY / TAG
========================================================= */

export const JobCategorySchema = z.object({
  categoryId: z.string(),

  title: z.string(),
  slug: z.string(),

  description: z.string().nullable().optional(),

  parentId: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export const JobTagSchema = z.object({
  tagId: z.string(),

  name: z.string(),
  slug: z.string(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   JOB
========================================================= */

export const JobSchema = z.object({
  jobId: z.string(),

  companyId: z.string(),
  categoryId: z.string().nullable().optional(),

  title: z.string(),
  slug: z.string(),

  description: z.string(),
  responsibilities: z.string().nullable().optional(),
  requirements: z.string().nullable().optional(),
  benefits: z.string().nullable().optional(),

  type: JobTypeEnum.default('FULL_TIME'),
  workMode: JobWorkModeEnum.default('ONSITE'),
  experienceLevel: JobExperienceLevelEnum.default('MID'),

  location: z.string().nullable().optional(),
  country: z.string().nullable().optional(),

  salaryMin: z.number().nonnegative().nullable().optional(),
  salaryMax: z.number().nonnegative().nullable().optional(),
  currency: EmploymentCurrencyEnum.default('TRY'),
  salaryVisible: z.boolean().default(true),

  positions: z.number().int().positive().default(1),

  tags: z.array(z.string()).default([]),

  status: JobStatusEnum.default('DRAFT'),

  applicationDeadline: z.coerce.date().nullable().optional(),

  views: z.number().int().nonnegative().default(0),
  applicationsCount: z.number().int().nonnegative().default(0),

  publishedAt: z.coerce.date().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   TRANSLATION
========================================================= */

export const JobTranslationSchema = z.object({
  id: z.string(),
  jobId: z.string(),
  lang: AppLanguageEnum,

  title: z.string(),
  slug: z.string(),
  description: z.string(),
})

/* =========================================================
   JOB WITH DATA
========================================================= */

export const JobWithDataSchema = JobSchema.extend({
  company: CompanySchema.pick({
    companyId: true,
    name: true,
    slug: true,
    logo: true,
    verified: true,
  }),

  category: JobCategorySchema.pick({
    categoryId: true,
    title: true,
    slug: true,
  }).nullable().optional(),

  translations: z.array(JobTranslationSchema).optional(),
})

/* =========================================================
   APPLICANT / PROFILE
========================================================= */

export const ApplicantProfileSchema = z.object({
  applicantId: z.string(),

  userId: z.string().nullable().optional(),

  firstName: z.string(),
  lastName: z.string(),

  email: z.string().email(),
  phone: z.string().nullable().optional(),

  headline: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),

  location: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

export const ResumeSchema = z.object({
  resumeId: z.string(),

  applicantId: z.string(),

  title: z.string(),
  fileUrl: z.string(),

  isDefault: z.boolean().default(false),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   APPLICATION
========================================================= */

export const JobApplicationSchema = z.object({
  applicationId: z.string(),

  jobId: z.string(),
  applicantId: z.string(),

  resumeId: z.string().nullable().optional(),

  coverLetter: z.string().nullable().optional(),

  status: ApplicationStatusEnum.default('PENDING'),

  appliedAt: z.coerce.date().optional(),

  reviewedAt: z.coerce.date().nullable().optional(),

  notes: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   INTERVIEW
========================================================= */

export const InterviewTypeEnum = z.enum([
  'PHONE',
  'VIDEO',
  'ONSITE',
])

export const InterviewSchema = z.object({
  interviewId: z.string(),

  applicationId: z.string(),

  type: InterviewTypeEnum,

  scheduledAt: z.coerce.date(),
  durationMinutes: z.number().int().positive(),

  location: z.string().nullable().optional(),
  meetingUrl: z.string().url().nullable().optional(),

  interviewerName: z.string().nullable().optional(),

  notes: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   JOB ALERTS / SAVED JOBS
========================================================= */

export const SavedJobSchema = z.object({
  savedJobId: z.string(),

  jobId: z.string(),
  userId: z.string(),

  createdAt: z.coerce.date().optional(),
})

export const JobAlertSchema = z.object({
  alertId: z.string(),

  userId: z.string(),

  keywords: z.array(z.string()).default([]),
  location: z.string().nullable().optional(),
  jobType: JobTypeEnum.nullable().optional(),

  active: z.boolean().default(true),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   TYPES
========================================================= */

export type JobStatus = z.infer<typeof JobStatusEnum>
export type JobType = z.infer<typeof JobTypeEnum>
export type JobWorkMode = z.infer<typeof JobWorkModeEnum>
export type JobExperienceLevel = z.infer<typeof JobExperienceLevelEnum>
export type ApplicationStatus = z.infer<typeof ApplicationStatusEnum>
export type EmploymentCurrency = z.infer<typeof EmploymentCurrencyEnum>

export type Company = z.infer<typeof CompanySchema>
export type JobCategory = z.infer<typeof JobCategorySchema>
export type JobTag = z.infer<typeof JobTagSchema>

export type Job = z.infer<typeof JobSchema>
export type JobWithData = z.infer<typeof JobWithDataSchema>
export type JobTranslation = z.infer<typeof JobTranslationSchema>

export type ApplicantProfile = z.infer<typeof ApplicantProfileSchema>
export type Resume = z.infer<typeof ResumeSchema>

export type JobApplication = z.infer<typeof JobApplicationSchema>

export type InterviewType = z.infer<typeof InterviewTypeEnum>
export type Interview = z.infer<typeof InterviewSchema>

export type SavedJob = z.infer<typeof SavedJobSchema>
export type JobAlert = z.infer<typeof JobAlertSchema>