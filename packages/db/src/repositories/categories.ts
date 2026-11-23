import {db} from '../prisma/db'

export type CreateCategoryInput = {
    name: string
}

export type GetCategoriesFilter = {
    name: string,
    limit?: number,
    offset?: number
}

export async function getCategories(filter: GetCategoriesFilter) {
    
}

export async function getCategoryById(id: string) {
    
}

export async function createCategory(input: CreateCategoryInput) {

}

export async function updateCategoryById(id: string) {

}

export async function deleteCategoryById(id: string) {
    
}