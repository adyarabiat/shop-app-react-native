import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
   StyleSheet,
   Text,
   View,
   Button,
   ScrollView,
   Image,
} from "react-native";

import Colors from "../../constants/Colors";
import { addToCart } from "../../store/actions/cart";

const ProductDetailScreen = (props) => {
   const dispatch = useDispatch();

   const selectedParam = props.navigation.getParam("productId");

   const product = useSelector((state) =>
      state.products.availableProducts.find(
         (product) => product.id === selectedParam
      )
   );

   return (
      <ScrollView>
         <Image style={styles.image} source={{ uri: product.imageUrl }} />
         <View style={styles.actions}>
            <Button
               color={Colors.primary}
               title="Add to Cart"
               onPress={() => {
                  dispatch(addToCart(product));
               }}
            />
         </View>

         <Text style={styles.price}>${product.price.toFixed(2)}</Text>
         <Text style={styles.description}>{product.description}</Text>
      </ScrollView>
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

const styles = StyleSheet.create({
   image: {
      height: 300,
      width: "100%",
   },
   price: {
      fontSize: 20,
      color: "#888",
      textAlign: "center",
      marginVertical: 20,
      fontFamily: "open-sans-bold",
   },
   description: {
      fontSize: 14,
      textAlign: "center",
      marginHorizontal: 20,
      fontFamily: "open-sans",
   },
   actions: {
      marginVertical: 10,
      alignItems: "center", //it make it not streach and align it in the center
   },
});
