import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
   StyleSheet,
   Text,
   View,
   Button,
   ScrollView,
   Image,
} from "react-native";

const ProductDetailScreen = (props) => {
   const selectedParam = props.navigation.getParam("productId");

   const product = useSelector((state) =>
      state.products.availableProducts.find(
         (product) => product.id === selectedParam
      )
   );

   return (
      <View>
         <Text>{product.title}</Text>
      </View>
   );
};

export default ProductDetailScreen;

ProductDetailScreen.navigationOptions = (navigationData) => {
   // we set the param in ProductsOverviewScreen before
   const productTitle = navigationData.navigation.getParam("productTitle");

   return {
      headerTitle: productTitle,
   };
};

const styles = StyleSheet.create({});
