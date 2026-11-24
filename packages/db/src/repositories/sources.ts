import {db} from '../prisma/db'

export type CreateSourceInput = {
    name: string,
    feedUrl: string,
    siteUrl?: string,
    language: string,
    isActive: boolean,
    lastFetchedAt?: string
}

export type GetSourcesFilter = {
    name?: string,
    feedUrl: string,
    siteUrl?: string,
    language?: string,
    isActive?: boolean,
    lastFetchedAt?: string,
    limit?: number,
    offset?: number
}

export async function getSources(filter: GetSourcesFilter) {
    const limit = filter?.limit ?? 20
    const offset = filter?.offset ?? 0

    const name = filter?.name
    const feedUrl = filter?.feedUrl
    const siteUrl = filter?.siteUrl
    const language = filter?.language
    const isActive = filter?.isActive
    const lastFetchedAt = filter?.lastFetchedAt

    let result = db.orm.public.Sources.where(source => source.id.isNotNull())

    if (name)
        result = result.where(source => source.name.eq(name))
    if (feedUrl)
        result = result.where(source => source.feedUrl.eq(feedUrl))
    if (siteUrl)
        result = result.where(source => source.siteUrl.eq(siteUrl))
    if (language)
        result = result.where(source => source.language.eq(language))
    if (isActive)
        result = result.where(source => source.isActive.eq(isActive))
    if (lastFetchedAt)
        result = result.where(source => source.lastFetchedAt.eq(lastFetchedAt))

    return await result
                        .orderBy(source => source.lastFetchedAt.desc())
                        .limit(limit)
                        .offset(offset)
                        .all()
}

export async function getSourceById(id: string) {
    const source = await db.orm.public.Sources
    .where(source => source.id.eq(id))
    .first()
    
    if (!source)
        throw new Error("Not found")
    
    return source
}

export async function createSource(input: CreateSourceInput) {
    return await db.orm.public.Sources.create(input)
}

export async function updateSourceById(id: string, filter: GetSourcesFilter) {
    const source = await db.orm.public.Sources
                                              .where(source => source.id.eq(id))
                                              .update(filter)

    if (!source)
        throw new Error("Not found")
    
    return source
}

export async function deleteSourceById(id: string) {
    return await db.orm.public.Sources.where(source => source.id.eq(id)).delete()
}