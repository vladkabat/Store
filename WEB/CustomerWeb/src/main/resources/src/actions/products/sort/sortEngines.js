import {
    SORT_ENGINES_BY_PRICE_DESC,
    SORT_ENGINES_BY_PRICE_ASC
} from '../../../constants/products/sort/sortEngines'

export const dataSortEnginesByPriceDesc = () => {
    return {type: SORT_ENGINES_BY_PRICE_DESC}
};

export const dataSortEnginesByPriceAsc = () => {
    return {type: SORT_ENGINES_BY_PRICE_ASC}
};

