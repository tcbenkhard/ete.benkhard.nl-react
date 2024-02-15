import React, {useCallback, useEffect, useState} from "react";
import './OverviewPage.scss'
import {MealOverview} from "../components/overview/MealOverview";
import {Meal} from "../model/meal";
import {MealDetails} from "../components/MealDetails";

export const OverviewPage = () => {

    const [selectedMeal, setSelectedMeal] = useState<Meal>()

    const selectMeal = useCallback(
        (meal: Meal) => {
            console.log(`Selected meal: ${meal.name}`)
            setSelectedMeal(meal)
        },
        [],
    );


    const [meals, setMeals] = useState<Array<Meal>>([])

    useEffect(() => {
        return () => {
            setMeals([
                {id: 'spaghettibolognese', description: 'Fruit de uitjes en bak daarna de gehakt bruin. Voeg hierna de tomatenpuree toe en laat het even inbakken. Net voor het einde wat pastawater toevoegen om de saus te maken.', name: 'Spaghetti Bolognese', tags: ['pasta', 'italiaans'], ingredients: ['1 ui', 'pasta', '300gr rundergehakt', '1 blikje tomatenpuree']},
                {id: 'kipkerrie', name: 'Kip kerrie', tags: ['pasta', 'italiaans'], ingredients: ['1 ui', 'pasta', '300gr rundergehakt', '1 blikje tomatenpuree']},
                {id: 'carbonara', name: 'Carbonara', tags: ['pasta', 'italiaans'], ingredients: ['1 ui', 'pasta', '300gr rundergehakt', '1 blikje tomatenpuree']},
                {id: 'boerenkool', name: 'Boerenkool', tags: ['pasta', 'italiaans'], ingredients: ['1 ui', 'pasta', '300gr rundergehakt', '1 blikje tomatenpuree']},
                {id: 'groentesoep', name: 'Groentesoep', tags: ['pasta', 'italiaans'], ingredients: ['1 ui', 'pasta', '300gr rundergehakt', '1 blikje tomatenpuree']},
                {id: 'kerriesoep', name: 'Kerriesoep', tags: ['pasta', 'italiaans'], ingredients: ['1 ui', 'pasta', '300gr rundergehakt', '1 blikje tomatenpuree']},
                {id: 'wrapskip', name: 'Wraps met kip', tags: ['pasta', 'italiaans'], ingredients: ['1 ui', 'pasta', '300gr rundergehakt', '1 blikje tomatenpuree']},
                {id: 'nachosgehakt', name: 'Nachos met gehakt', tags: ['pasta', 'italiaans'], ingredients: ['1 ui', 'pasta', '300gr rundergehakt', '1 blikje tomatenpuree']},
                {id: 'vitellotonato', name: 'Vitello Tonato', tags: ['pasta', 'italiaans'], ingredients: ['1 ui', 'pasta', '300gr rundergehakt', '1 blikje tomatenpuree']},
            ])
        };
    }, []);


    return (
        <div id={'overview'}>
            { selectedMeal ? <MealDetails meal={selectedMeal} onCloseDetails={() => setSelectedMeal(undefined)}/> : ''}
            <MealOverview meals={meals} selectMeal={selectMeal}/>
        </div>
    )
}