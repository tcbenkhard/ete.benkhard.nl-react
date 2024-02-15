import './MealOverview.scss'
import {MealOverviewItem} from "./MealOverviewItem";
import {Meal} from "../../model/meal";
export interface MealOverviewProps {
    meals: Array<Meal>
    selectMeal: (meal: Meal) => void
}

export const MealOverview = ({meals, selectMeal}: MealOverviewProps) => {
    return (
        <div className={'overview grid'}>
            {meals.map(meal => <MealOverviewItem meal={meal} key={meal.id} selectMeal={selectMeal} />)}
        </div>
    )
}

