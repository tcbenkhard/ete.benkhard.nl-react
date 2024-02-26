import {Product} from "../../client/PicnicClient";

export interface ProductSuggestionProps {
    product: Product
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
});

export const ProductSuggestion = ({product}: ProductSuggestionProps) => {
    return (<li className={'suggestion'}>
        <div className="suggestion-name">
            {product.name}
        </div>
        <div className="suggestion-extra">
            <span className="suggestion-extra--price">{product.unit_quantity}</span>
            <span className="suggestion-extra--price">{formatter.format(product.display_price/100)}</span>
        </div>
    </li>)
}