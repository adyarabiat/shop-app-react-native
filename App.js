import React from "react";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import ShopNavigator from "./navigation/ShopNavigator";

import { productsReducer } from "./store/reducers/products";

export default function App() {
   const rootReducer = combineReducers({
      products: productsReducer,
   });

   const store = createStore(rootReducer);

   return (
      <Provider store={store}>
         <ShopNavigator />
      </Provider>
   );
}
