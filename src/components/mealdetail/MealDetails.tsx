import {Meal} from "../../model/meal";
import './MealDetails.scss'
import {useCallback, useContext, useState} from "react";
import {Dialog} from "../dialog/Dialog";
import {faCartArrowDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {PicnicClientContext} from "../../App";
import {Ingredient} from "../../model/ingredient";
import {ProductSelectionDialog} from "../productselection/ProductSelectionDialog";
import {Product} from "../../client/PicnicClient";
import {ConfirmationDialog} from "../dialog/ConfirmationDialog";


export interface MealDetailsProps {
    meal: Meal
    onCloseDetails: () => void
}

export const MealDetails = ({meal, onCloseDetails}: MealDetailsProps) => {

    const picnicClient = useContext(PicnicClientContext);

    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>()

    const [confirmProduct, setConfirmProduct] = useState<Product>()

    const handlePurchaseConfirmed = useCallback(
        () => {
            console.log('Buying product ', confirmProduct)
            picnicClient.addToCart(confirmProduct!.id)
                .then(() => {
                    console.log('Added to cart')
                    setSelectedIngredient(undefined)
                    setConfirmProduct(undefined)
                })
        },
        [confirmProduct, picnicClient],
    );

    const handleCloseClicked = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation()
            onCloseDetails()
        },
        [onCloseDetails],
    );

    return (
        <Dialog onClickOutside={onCloseDetails}>
            { selectedIngredient ? <ProductSelectionDialog selectedIngredient={selectedIngredient} closeDialog={() => {setSelectedIngredient(undefined)}} handlePurchase={(product) => setConfirmProduct(product)}/> : '' }
            { confirmProduct ? <ConfirmationDialog onConfirm={handlePurchaseConfirmed} onCancel={() => setConfirmProduct(undefined)}>Weet je zeker dat je dit product wil kopen?</ConfirmationDialog> : '' }
            <div className="mealdetail" onClick={(e) => e.stopPropagation()}>
                <div className="mealdetail-control">
                    <button onClick={handleCloseClicked}>close</button>
                </div>

                <div className="mealdetail-body">
                    <div><h1>{meal.name}</h1></div>
                    { meal.description ? <div>{meal.description}</div> : ''}
                    <div>
                        <h2>Ingredienten</h2>
                        <ul className={'mealdetail-ingredients'}>
                            {meal.ingredients.map(ingr =>
                                <li className={'mealdetail-ingredient'} key={ingr.displayName}>
                                    <span className="mealdetail-ingredient--name">{ingr.displayName}</span>
                                    { picnicClient.isLoggedIn() ? <span className="mealdetail-ingredient--shop" onClick={() => setSelectedIngredient(ingr)}><FontAwesomeIcon icon={faCartArrowDown} /></span> : ''}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="mealdetail-footer">

                </div>
            </div>
        </Dialog>
    )
}