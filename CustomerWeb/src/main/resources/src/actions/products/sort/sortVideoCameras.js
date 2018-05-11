import {
    SORT_VIDEO_CAMERAS_BY_PRICE_ASC,
    SORT_VIDEO_CAMERAS_BY_PRICE_DESC
} from '../../../constants/products/sort/sortVideoCameras'

export const dataSortVideoCamerasByPriceDesc = () => {
    return {type: SORT_VIDEO_CAMERAS_BY_PRICE_DESC}
};

export const dataSortVideoCamerasByPriceAsc = () => {
    return {type: SORT_VIDEO_CAMERAS_BY_PRICE_ASC}
};

