import {
    SORT_FREQUENCY_CONVERTERS_BY_PRICE_ASC,
    SORT_FREQUENCY_CONVERTERS_BY_PRICE_DESC
} from '../../../constants/products/sort/sortFrequencyConverters'

export const dataSortFrequencyConvertersByPriceDesc = () => {
    return {type: SORT_FREQUENCY_CONVERTERS_BY_PRICE_DESC}
};

export const dataSortFrequencyConvertersByPriceAsc = () => {
    return {type: SORT_FREQUENCY_CONVERTERS_BY_PRICE_ASC}
};

