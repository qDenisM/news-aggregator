import {db} from '../prisma/db'

export type CreateSourceInput = {
    name: string,
    feedUrl: string,
    siteUrl?: string,
    language: string,
    isActive: boolean,
    lastFetchedAt?: Date
}

export type GetSourcesFilter = {
    name: string,
    feedUrl: string,
    siteUrl?: string,
    language: string,
    isActive: boolean,
    lastFetchedAt?: Date,
    limit?: number,
    offset?: number
}

export async function getSources(filter: GetSourcesFilter) {
    
}

export async function getSourceById(id: string) {
    
}

export async function createSource(input: CreateSourceInput) {

}

export async function updateSourceById(id: string) {

}

export async function deleteSourceById(id: string) {
    
}