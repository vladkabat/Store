import {
    SORT_TVS_BY_PRICE_ASC,
    SORT_TVS_BY_PRICE_DESC
} from '../../../constants/products/sort/sortTvs'

export const dataSortTvsByPriceDesc = () => {
    return {type: SORT_TVS_BY_PRICE_DESC}
};

export const dataSortTvsByPriceAsc = () => {
    return {type: SORT_TVS_BY_PRICE_ASC}
};

