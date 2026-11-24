import {db, Sentiment} from '../prisma/db'

export type CreateSummaryInput = {
    articleId: string,
    summary: string,
    sentiment?: Sentiment,
    model: string,
    promptVersion?: string,
    tokensUsed: number,
    processedAt: string
}

export type GetSummariesFilter = {
    articleId?: string,
    summary?: string,
    sentiment?: Sentiment,
    model?: string,
    promptVersion?: string,
    tokensUsed?: number,
    processedAt: string,
    limit?: number,
    offset?: number
}

export async function getSummaries(filter: GetSummariesFilter) {
    const limit = filter?.limit ?? 20
    const offset = filter?.offset ?? 0
    
    const articleId = filter?.articleId
    const summary = filter?.summary
    const sentiment = filter?.sentiment
    const model = filter?.model
    const promptVersion = filter?.promptVersion
    const tokensUsed = filter?.tokensUsed
    const processedAt = filter?.processedAt
    
    let result = db.orm.public.Summaries.where(summary => summary.id.isNotNull())
    
    if (articleId)
        result = result.where(summary => summary.articleId.eq(articleId))
    if (summary)
        result = result.where(summaryObj => summaryObj.summary.eq(summary))
    if (sentiment)
        result = result.where(summary => summary.sentiment.eq(sentiment))
    if (model)
        result = result.where(summary => summary.model.eq(model))
    if (promptVersion)
        result = result.where(summary => summary.promptVersion.eq(promptVersion))
    if (tokensUsed)
        result = result.where(summary => summary.tokensUsed.eq(tokensUsed))
    if (processedAt)
        result = result.where(summary => summary.processedAt.eq(processedAt))
    
    return await result.orderBy(summary => summary.model.desc()).limit(limit).offset(offset).all()
}

export async function getSummaryById(id: string) {
    const summary = await db.orm.public.Summaries.where(summary => summary.id.eq(id)).first()
    if (!summary)
        throw new Error("Not found")
    return summary
}

export async function createSummary(input: CreateSummaryInput) {
    return db.orm.public.Summaries.create(input)
}

export async function updateSummaryById(id: string, filter: GetSummariesFilter) {
    const summary = await db.orm.public.Summaries.where(summary => summary.id.eq(id)).update(filter)
    if (!summary)
        throw new Error("Not found")
    return summary
}

export async function deleteSummaryById(id: string) {
    return await db.orm.public.Summaries.where(summary => summary.id.eq(id)).delete()
}