import CartItem from "../../models/cart-item";
import { ADD_TO_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/order";
import { REMOVE_FROM_CART } from "../actions/cart";
import { DELETE_PRODUCT } from "../actions/products";
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
      case REMOVE_FROM_CART: {
         const item = state.items[action.payload];
         const currentQty = item.quantity;
         let updatedCartItems;
         if (currentQty > 1) {
            // need to reduce it , not erase it
            const updatedCartItem = new CartItem(
               item.quantity - 1,
               item.productPrice,
               item.productTitle,
               item.sum - item.productPrice
            );
            updatedCartItems = {
               ...state.items,
               [action.payload]: updatedCartItem,
            };
         } else {
            updatedCartItems = { ...state.items };
            delete updatedCartItems[action.payload]; //this will delete the proprty from the object
         }

         return {
            ...state,
            items: updatedCartItems,
            totalAmount: state.totalAmount - item.productPrice,
         };
      }
      case ADD_ORDER: {
         // To clear the card after clicking order now
         return INITIAL_STATE;
      }
      case DELETE_PRODUCT: {
         if (!state.items[action.payload]) {
            return state;
         }
         const updatedItems = { ...state.items };
         const itemTotal = state.items[action.payload].sum;
         delete updatedItems[action.payload];
         return {
            ...state,
            items: updatedItems,
            totalAmount: state.totalAmount - itemTotal,
         };
      }
   }
   return state;
};
