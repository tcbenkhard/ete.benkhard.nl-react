import {Ingredient} from "./ingredient";

export interface Meal {
    id: string
    name: string
    tags: Array<string>
    ingredients: Array<Ingredient>
    description?: string
}