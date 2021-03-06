import {
    createFeatureSelector,
    createSelector,
    DefaultProjectorFn,
    MemoizedSelector
} from "@ngrx/store";
import { KeyStore } from "..";
import { Id } from "../../services/BasicServiceCRUD";
import { Product } from "../../services/products/product.service";

import { productAdapter, StateProduct } from "./product.reducers";

export const getStateProduct: MemoizedSelector<
    object,
    StateProduct,
    DefaultProjectorFn<StateProduct>
> = createFeatureSelector(KeyStore.Product);

export const { selectAll } = productAdapter.getSelectors(getStateProduct);

export const selectAllProducts = selectAll;

export const selectTotalProducts = createSelector(
    getStateProduct,
    ({ entities }) => Object.keys(entities).length
);

export const selectProductByCategoryId = (categoryId: Id) =>
    createSelector(getStateProduct,
        ({ entities }) => Object.keys(entities)
            .filter(key => Number(entities[key]?.categoriesId) === Number(categoryId))
            .map(key => entities[key]) as Array<Product>
    )

export const selectProductById = (productId: Id) =>
    createSelector(getStateProduct,
        ({ entities }) => entities[productId]
    )
