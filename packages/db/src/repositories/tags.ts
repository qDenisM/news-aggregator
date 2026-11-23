import {db} from '../prisma/db'

export type CreateTagInput = {
    name: string
}

export type GetTagsFilter = {
    name: string,
    limit?: number,
    offset?: number
}

export async function getTags(filter: GetTagsFilter) {
    
}

export async function getTagById(id: string) {
    
}

export async function createTag(input: CreateTagInput) {

}

export async function updateTagById(id: string) {

}

export async function deleteTagById(id: string) {
    
}