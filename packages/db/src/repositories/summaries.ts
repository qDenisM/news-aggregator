import {db, Sentiment} from '../prisma/db'

export type CreateSummaryInput = {
    articleId: string,
    summary: string,
    sentiment?: Sentiment,
    model: string,
    promptVersion?: string,
    tokensUsed: number,
    processedAt: Date
}

export type GetSummariesFilter = {
    articleId: string,
    summary: string,
    sentiment?: Sentiment,
    model: string,
    promptVersion?: string,
    tokensUsed: number,
    processedAt: Date,
    limit?: number,
    offset?: number
}

export async function getSummaries(filter: GetSummariesFilter) {

}

export async function getSummaryById(id: string) {
    
}

export async function createSummary(input: CreateSummaryInput) {

}

export async function updateSummaryById(id: string) {

}

export async function deleteSummaryById(id: string) {
    
}