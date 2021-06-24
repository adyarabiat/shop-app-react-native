import CartItem from "../../models/cart-item";
import { ADD_TO_CART } from "../actions/cart";

const INITIAL_STATE = {
   items: {},
   totalAmount: 0,
};

export const cartReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case ADD_TO_CART: {
         const addedProduct = action.payload;

         const productPrice = addedProduct.price;
         const productTitle = addedProduct.title;

         if (state.items[addedProduct.id]) {
            //  already have the item in the cart
            const updatedCartItem = new CartItem(
               state.items[addedProduct.id].quantity + 1,
               productPrice,
               productTitle,
               state.items[addedProduct.id].sum + productPrice
            );

            return {
               ...state,
               items: { ...state.items, [addedProduct.id]: updatedCartItem },
               totalAmount: state.totalAmount + productPrice,
            };
         } else {
            const newCartItem = new CartItem(
               1,
               productPrice,
               productTitle,
               productPrice
            );
            return {
               ...state,
               items: { ...state.items, [addedProduct.id]: newCartItem },
               totalAmount: state.totalAmount + productPrice,
            };
         }
      }
   }
   return state;
};
