import {Meal} from "../model/meal";

export class MealsClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    getMeals = async (): Promise<Array<Meal>> => {
        const response = await fetch(`${this.baseUrl}/meals`)
        return await response.json()
    }
}