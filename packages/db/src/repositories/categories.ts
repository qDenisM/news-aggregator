import {db} from '../prisma/db'

export type CreateCategoryInput = {
    name: string
}

export type GetCategoriesFilter = {
    name?: string,
    limit?: number,
    offset?: number
}

export async function getCategories(filter: GetCategoriesFilter) {
    const limit = filter?.limit ?? 20
    const offset = filter?.offset ?? 0

    const name = filter?.name

    let result = db.orm.public.Categories.where(category => category.id.isNotNull())

    if (name)
        result = result.where(category => category.name.eq(name))

    return await result.orderBy(category => category.name.desc()).limit(limit).offset(offset).all()
}

export async function getCategoryById(id: string) {
    const category = await db.orm.public.Categories
        .where(category => category.id.eq(id))
        .first()

    if (!category)
        throw new Error("Not found")

    return category
}

export async function createCategory(input: CreateCategoryInput) {
    return await db.orm.public.Categories.create(input)
}

export async function updateCategoryById(id: string, filter: GetCategoriesFilter) {
    const category = await db.orm.public.Categories
    .where(category => category.id.eq(id))
    .update(filter)

    if (!category)
        throw new Error("Not found")

    return category
}

export async function deleteCategoryById(id: string) {
    return await db.orm.public.Categories.where(category => category.id.eq(id)).delete()
}