import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import ShopNavigator from "./navigation/ShopNavigator";
import { productsReducer } from "./store/reducers/products";
import { cartReducer } from "./store/reducers/cart";
import { orderReducer } from "./store/reducers/order";

const fetchFonts = async () => {
   await Font.loadAsync({
      "open-sans": require("./font/OpenSans-Regular.ttf"),
      "open-sans-bold": require("./font/OpenSans-Bold.ttf"),
   });
};

export default function App() {
   const [fontLoaded, setFontLoaded] = useState(false);

   //  To make sure that we call the finction first
   if (!fontLoaded) {
      return (
         <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setFontLoaded(true)}
            onError={(err) => console.log(err)}
         />
      );
   }

   const rootReducer = combineReducers({
      products: productsReducer,
      cart: cartReducer,
      order: orderReducer,
   });

   const store = createStore(rootReducer, composeWithDevTools());

   return (
      <Provider store={store}>
         <ShopNavigator />
      </Provider>
   );
}
