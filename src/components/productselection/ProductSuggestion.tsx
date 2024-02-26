import {Product} from "../../client/PicnicClient";
import './ProductSelection.scss'
import {faCartArrowDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface ProductSuggestionProps {
    product: Product
    handlePurchase: (product: Product) => void
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
});

export const ProductSuggestion = ({product, handlePurchase}: ProductSuggestionProps) => {
    return (<li className={'suggestion'}>
        <div className="suggestion-details">
            <div className="suggestion-name">
                {product.name}
            </div>
            <div className="suggestion-extra">
                <span className="suggestion-extra--quantity">{product.unit_quantity}</span>
                <span className="suggestion-extra--price">{formatter.format(product.display_price/100)}</span>
            </div>
        </div>
        <div className="suggestion-buy" onClick={() => handlePurchase(product)}><FontAwesomeIcon icon={faCartArrowDown} /></div>
    </li>)
}