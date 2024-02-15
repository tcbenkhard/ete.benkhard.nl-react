import {Meal} from "../../model/meal";

export interface MealOverviewItemProps {
    meal: Meal
    selectMeal: (meal: Meal) => void
}

export const MealOverviewItem = ({meal, selectMeal}: MealOverviewItemProps) => {
    return (
        <div className={'overview-item'} onClick={() => selectMeal(meal)}>
            <div className="overview-item--image">
                <img src={"https://placehold.co/100x100"} alt={'placeholder'}/>
            </div>
            <div className="overview-item--summary">
                <div className="overview-item--header">{meal.name}</div>
                <div className="overview-item--tags">{meal.tags.map(tag => <span className={'tag'}>{tag}</span>)}</div>
            </div>
        </div>
    )
}