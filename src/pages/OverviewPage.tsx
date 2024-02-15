import React, {useCallback, useEffect, useState} from "react";
import './OverviewPage.scss'
import {MealOverview} from "../components/overview/MealOverview";
import {Meal} from "../model/meal";
import {MealDetails} from "../components/MealDetails";
import {MealsClient} from "../client/MealsClient";

const mealClient = new MealsClient(process.env.REACT_APP_MEALS_BASE_URL!)

export const OverviewPage = () => {

    const [selectedMeal, setSelectedMeal] = useState<Meal>()

    const selectMeal = useCallback(
        (meal: Meal) => {
            console.log(`Selected meal: ${meal.name}`)
            setSelectedMeal(meal)
        },
        [],
    );


    const [meals, setMeals] = useState<Array<Meal>>()

    useEffect(() => {
        const storedMeals = window.sessionStorage.getItem('meals')
        if(!storedMeals) {
            mealClient.getMeals().then((meals) => {
                window.sessionStorage.setItem('meals', JSON.stringify(meals))
                setMeals(meals)
            })
        } else {
            setMeals(JSON.parse(storedMeals))
        }

    }, []);


    return (
        <div id={'overview'}>
            { selectedMeal ? <MealDetails meal={selectedMeal} onCloseDetails={() => setSelectedMeal(undefined)}/> : ''}
            { meals ? <MealOverview meals={meals} selectMeal={selectMeal}/> : <div>Loading...</div>}
        </div>
    )
}