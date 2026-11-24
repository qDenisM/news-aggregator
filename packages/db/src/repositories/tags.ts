import {db} from '../prisma/db'

export type CreateTagInput = {
    name: string
}

export type GetTagsFilter = {
    name?: string,
    limit?: number,
    offset?: number
}

export async function getTags(filter: GetTagsFilter) {
    const limit = filter?.limit ?? 20
    const offset = filter?.offset ?? 0

    const name = filter?.name

    let result = db.orm.public.Tags.where(tag => tag.id.isNotNull())
    
    if (name)
        result = result.where(tag => tag.name.eq(name))

    return await result.orderBy(tag => tag.name.desc()).limit(limit).offset(offset).all()
}

export async function getTagById(id: string) {
    const tag = await db.orm.public.Tags.where(tag => tag.id.eq(id)).first()
    if (!tag)
        throw new Error("Not found")
    return tag
}

export async function createTag(input: CreateTagInput) {
    return await db.orm.public.Tags.create(input)
}

export async function updateTagById(id: string, filter: GetTagsFilter) {
    const tag = await db.orm.public.Tags.where(tag => tag.id.eq(id)).update(filter)
    if (!tag)
        throw new Error("Not found")
    return tag
}

export async function deleteTagById(id: string) {
    return await db.orm.public.Tags.where(tag => tag.id.eq(id)).delete()
}