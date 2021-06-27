import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";

import { UPDATE_PRODUCT } from "../actions/products";
import { CREATE_PRODUCT } from "../actions/products";
import { DELETE_PRODUCT } from "../actions/products";

const INITIAL_STATE = {
   availableProducts: PRODUCTS,
   userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export const productsReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case CREATE_PRODUCT: {
         const newProduct = new Product(
            action.payload.id,
            "ui",
            action.payload.title,
            action.payload.imageUrl,
            action.payload.description,
            action.payload.price
         );
         return {
            ...state,
            availableProducts: state.availableProducts.concat(newProduct),
            userProducts: state.userProducts.concat(newProduct),
         };
      }
      case UPDATE_PRODUCT: {
         const productIndex = state.userProducts.findIndex(
            (prod) => prod.id === action.pid
         );
         const updatedProduct = new Product(
            action.pid,
            state.userProducts[productIndex].ownerId,
            action.payload.title,
            action.payload.imageUrl,
            action.payload.description,
            state.userProducts[productIndex].price
         );
         const updatedUserProducts = [...state.userProducts];
         updatedUserProducts[productIndex] = updatedProduct;
         const availableProductIndex = state.availableProducts.findIndex(
            (prod) => prod.id === action.pid
         );
         const updatedAvailableProducts = [...state.availableProducts];
         updatedAvailableProducts[availableProductIndex] = updatedProduct;
         return {
            ...state,
            availableProducts: updatedAvailableProducts,
            userProducts: updatedUserProducts,
         };
      }
      case DELETE_PRODUCT: {
         return {
            ...state,
            userProducts: state.userProducts.filter((product) => {
               return product.id !== action.payload;
            }),
            availableProducts: state.availableProducts.filter((product) => {
               return product.id !== action.payload;
            }),
         };
      }
   }
   return state;
};
