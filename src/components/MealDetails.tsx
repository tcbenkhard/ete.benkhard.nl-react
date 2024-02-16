import {Meal} from "../model/meal";
import './MealDetails.scss'
import {useCallback} from "react";

export interface MealDetailsProps {
    meal: Meal
    onCloseDetails: () => void
}

export const MealDetails = ({meal, onCloseDetails}: MealDetailsProps) => {

    const handleCloseClicked = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation()
            onCloseDetails()
        },
        [onCloseDetails],
    );


    return (
        <div className={'mealdetail'} onClick={handleCloseClicked}>
            <div className="mealdetail-content" onClick={(e) => e.stopPropagation()}>
                <div className="mealdetail-content--control">
                    <button onClick={handleCloseClicked}>close</button>
                </div>

                <div className="mealdetail-content--body">
                    <div><h1>{meal.name}</h1></div>
                    { meal.description ? <div>{meal.description}</div> : ''}
                    <div>
                        <h2>Ingredienten</h2>
                        <ul>{meal.ingredients.map(ingr => <li key={ingr.displayName}>{ingr.displayName}</li>)}</ul>
                    </div>

                </div>

                <div className="mealdetail-content--footer">

                </div>
            </div>
        </div>
    )
}