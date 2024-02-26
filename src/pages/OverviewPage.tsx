import React, {useCallback, useEffect, useState} from "react";
import './OverviewPage.scss'
import {MealOverview} from "../components/overview/MealOverview";
import {Meal} from "../model/meal";
import {MealDetails} from "../components/mealdetail/MealDetails";
import {MealsClient} from "../client/MealsClient";
import {ActionMenu} from "../components/actionmenu/ActionMenu";
import {LoginDialog} from "../components/actionmenu/LoginDialog";

const mealClient = new MealsClient(process.env.REACT_APP_MEALS_BASE_URL!)


export const OverviewPage = () => {
    const selectMeal = useCallback(
        (meal: Meal) => {
            console.log(`Selected meal: ${meal.name}`)
            setSelectedMeal(meal)
        },
        [],
    );

    const [selectedMeal, setSelectedMeal] = useState<Meal>()
    const [meals, setMeals] = useState<Array<Meal>>()
    const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false)

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
            { showLoginDialog ? <LoginDialog onCloseDialog={() => setShowLoginDialog(false)} /> : ''}
            <ActionMenu onLoginClicked={() => setShowLoginDialog(true)}/>
            { meals ? <MealOverview meals={meals} selectMeal={selectMeal}/> : <div>Loading...</div>}
        </div>
    )
}