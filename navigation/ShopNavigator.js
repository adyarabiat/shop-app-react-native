import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import Colors from "../constants/Colors";

const productsNavigator = createStackNavigator(
   {
      products: ProductsOverviewScreen,
      productDetail: ProductDetailScreen,
   },

   {
      defaultNavigationOptions: {
         // this is the header background
         headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "",
         },
         headerTitleStyle: {
            fontFamily: "open-sans-bold",
         },
         headerBackTitleStyle: {
            fontFamily: "open-sans",
         },
         // this is the font color
         headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      },
   }
);

export default createAppContainer(productsNavigator);
