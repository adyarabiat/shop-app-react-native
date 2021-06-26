import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";

const defaultNavOptions = {
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
};
const productsNavigator = createStackNavigator(
   {
      products: ProductsOverviewScreen,
      productDetail: ProductDetailScreen,
      cart: CartScreen,
   },
   {
      navigationOptions: {
         drawerIcon: (drawerConfig) => (
            <Ionicons
               name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
               size={23}
               color={drawerConfig.tintColor}
            />
         ),
      },
      defaultNavigationOptions: defaultNavOptions,
   }
);

const orderNavigator = createStackNavigator(
   {
      orders: OrdersScreen,
   },
   {
      navigationOptions: {
         drawerIcon: (drawerConfig) => (
            <Ionicons
               name={Platform.OS === "android" ? "md-list" : "ios-list"}
               size={23}
               color={drawerConfig.tintColor}
            />
         ),
      },
      defaultNavigationOptions: defaultNavOptions,
   }
);

const adminNavigator = createStackNavigator(
   {
      user: UserProductsScreen,
      edit: EditProductScreen,
   },
   {
      navigationOptions: {
         drawerIcon: (drawerConfig) => (
            <Ionicons
               name={Platform.OS === "android" ? "md-create" : "ios-create"}
               size={23}
               color={drawerConfig.tintColor}
            />
         ),
      },
      defaultNavigationOptions: defaultNavOptions,
   }
);

const ShopNavigator = createDrawerNavigator(
   {
      Products: productsNavigator,
      Orders: orderNavigator,
      User: adminNavigator,
   },
   {
      contentOptions: {
         activeTintColor: Colors.primary,
      },
   }
);
export default createAppContainer(ShopNavigator);
