import {
    SORT_TABLETS_BY_PRICE_ASC,
    SORT_TABLETS_BY_PRICE_DESC
} from '../../../constants/products/sort/sortTablets'

export const dataSortTabletsByPriceDesc = () => {
    return {type: SORT_TABLETS_BY_PRICE_DESC}
};

export const dataSortTabletsByPriceAsc = () => {
    return {type: SORT_TABLETS_BY_PRICE_ASC}
};

