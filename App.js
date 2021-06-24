import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import ShopNavigator from "./navigation/ShopNavigator";

import { productsReducer } from "./store/reducers/products";

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
   });

   const store = createStore(rootReducer);

   return (
      <Provider store={store}>
         <ShopNavigator />
      </Provider>
   );
}
