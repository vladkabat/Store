import {
    SORT_PHONES_BY_PRICE_DESC,
    SORT_PHONES_BY_PRICE_ASC
} from '../../../constants/products/sort/sortPhones'

export const dataSortPhonesByPriceDesc = () => {
    return {type: SORT_PHONES_BY_PRICE_DESC}
};

export const dataSortPhonesByPriceAsc = () => {
    return {type: SORT_PHONES_BY_PRICE_ASC}
};

