import {db, ArticleStatus} from '../prisma/db'

export type CreateArticleInput = {
    sourceId: string,
    categoryId?: string,
    title: string,
    url: string,
    description?: string,
    content?: string,
    imageUrl?: string,
    author?: string,
    status?: ArticleStatus,
    publishedAt?: Date
}

export type GetArticlesFilter = {
    sourceId?: string,
    categoryId?: string,
    title?: string,
    url?: string,
    description?: string,
    content?: string,
    imageUrl?: string,
    author?: string,
    status?: ArticleStatus,
    publishedAt?: Date,
    limit?: number,
    offset?: number
}

export async function getArticles(filter: GetArticlesFilter) {
    
}

export async function getArticleById(id: string) {
    
}

export async function createArticle(input: CreateArticleInput) {

}

export async function updateArticleById(id: string) {

}

export async function deleteArticleById(id: string) {
    
}