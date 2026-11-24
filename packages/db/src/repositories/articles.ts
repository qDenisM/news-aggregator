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
    publishedAt?: string
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
    publishedAt?: string,
    limit?: number,
    offset?: number
}

export async function getArticles(filter?: GetArticlesFilter) {
    const limit = filter?.limit ?? 20
    const offset = filter?.offset ?? 0

    let result = db.orm.public.Articles.where(article => article.id.isNotNull())

    const sourceId = filter?.sourceId
    const categoryId = filter?.categoryId
    const title = filter?.title
    const url = filter?.url
    const description = filter?.description
    const content = filter?.content
    const imageUrl = filter?.imageUrl
    const author = filter?.author
    const status = filter?.status
    const publishedAt = filter?.publishedAt

    if (sourceId)
        result = result.where(article => article.sourceId.eq(sourceId))
    if (categoryId)
        result = result.where(article => article.categoryId.eq(categoryId))
    if (title)
        result = result.where(article => article.title.eq(title))
    if (url)
        result = result.where(article => article.url.eq(url))
    if (description)
        result = result.where(article => article.description.eq(description))
    if (content)
        result = result.where(article => article.content.eq(content))
    if (imageUrl)
        result = result.where(article => article.imageUrl.eq(imageUrl))
    if (author)
        result = result.where(article => article.author.eq(author))
    if (status)
        result = result.where(article => article.status.eq(status))
    if (publishedAt)
        result = result.where(article => article.publishedAt.eq(publishedAt))

    return await result.orderBy(article => article.publishedAt.desc()).limit(limit).offset(offset).all()
}

export async function getArticleById(id: string) {
    const article = await db.orm.public.Articles
        .where(article => article.id.eq(id))
        .first()
    if (!article)
        throw new Error("Not found")
    return article
}

export async function createArticle(input: CreateArticleInput) {
    const article = await db.orm.public.Articles.create(input)

    return article
}

export async function updateArticleById(id: string, filter: GetArticlesFilter) {
    const article = await db.orm.public.Articles
        .where(article => article.id.eq(id))
        .update(filter)
    if (!article)
        throw new Error("Not Found")
    return article
}

export async function deleteArticleById(id: string) {
    return await db.orm.public.Articles.where(article => article.id.eq(id)).delete()
}