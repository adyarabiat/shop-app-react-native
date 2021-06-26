import { ADD_ORDER } from "../actions/order";
import Order from "../../models/order";

const INITIAL_STATE = {
   orders: [],
};
export const orderReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case ADD_ORDER: {
         // new date is to create id
         const newOrder = new Order(
            new Date().toString(),
            action.payload.items,
            action.payload.amount,
            new Date()
         );
         return {
            ...state,
            orders: state.orders.concat(newOrder),
         };
      }
   }
   return state;
};
