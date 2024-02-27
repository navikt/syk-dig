import { z } from 'zod'

export const RuleHitSchema = z.object({
    messageForSender: z.string(),
    messageForUser: z.string(),
    ruleName: z.string(),
    ruleStatus: z.string(),
})
export type RuleHit = z.infer<typeof RuleHitSchema>

export const RuleHitErrorsSchema = z.object({
    status: z.string(),
    ruleHits: z.array(RuleHitSchema),
})
export type RuleHitErrors = z.infer<typeof RuleHitErrorsSchema>
