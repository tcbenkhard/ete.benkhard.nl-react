import {Dialog} from "../dialog/Dialog";
import {Ingredient} from "../../model/ingredient";
import {PicnicClientContext} from "../../App";
import {useContext, useEffect, useState} from "react";
import {Product} from "../../client/PicnicClient";
import {ProductSuggestion} from "./ProductSuggestion";
import './ProductSelection.scss'

export interface ProductSelectionDialogProps {
    selectedIngredient: Ingredient
    closeDialog: () => void
}

export const ProductSelectionDialog = ({selectedIngredient, closeDialog}: ProductSelectionDialogProps) => {
    const picnicClient = useContext(PicnicClientContext)
    const [results, setResults] = useState<Array<Product>>([]);

    useEffect(() => {
        picnicClient.query(selectedIngredient.query).then(r => {
            const items = r[0].items
            const uniqueProducts: Array<Product> = []
            for (const item of items) {
                if (uniqueProducts.find(prod => prod.name === item.name)) continue
                if(item.name) uniqueProducts.push(item)
            }
            setResults(uniqueProducts)
        })
    }, [selectedIngredient, picnicClient, setResults]);


    return (
        <Dialog onClickOutside={closeDialog}>
            <h2>{selectedIngredient.displayName}</h2>
            { results ? <div className="suggestions">
                <ul>
                    {results.map(result => <ProductSuggestion product={result} />)}
                </ul>
            </div> : 'Loading...'}

        </Dialog>
    )
}