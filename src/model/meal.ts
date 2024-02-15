export interface Meal {
    id: string
    name: string
    tags: Array<string>
    ingredients: Array<string>

    description?: string
}