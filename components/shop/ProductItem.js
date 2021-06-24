import React from "react";
import {
   StyleSheet,
   Text,
   View,
   Image,
   Button,
   TouchableOpacity,
   TouchableNativeFeedback,
   Platform,
} from "react-native";

import Colors from "../../constants/Colors";

const ProductItem = (props) => {
   let TouchableCmp = TouchableOpacity;

   if (Platform.OS === "android" && Platform.Version >= 21) {
      TouchableCmp = TouchableNativeFeedback;
      //usually if I use TouchableNativeFeedback we will get an error if we have lots of elements inside it becouse TouchableNativeFeedback needs one element inside it so we need to wrrape everything inside TouchableNativeFeedback in one view

      // useForeground
      // we have to use it in TouchableNativeFeedback to apply TouchableOpacity features like to click on the image not just the text under it
   }
   return (
      <View style={styles.product}>
         <View style={styles.touchable}>
            <TouchableCmp onPress={props.onViewDetail} useForeground>
               <View>
                  <View style={styles.imageContainer}>
                     <Image
                        style={styles.image}
                        source={{ uri: props.image }}
                     />
                  </View>

                  <View style={styles.productInfo}>
                     <Text style={styles.title}>{props.title}</Text>
                     <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                  </View>

                  <View style={styles.actions}>
                     <Button
                        color={Colors.primary}
                        title="View Details"
                        onPress={props.onViewDetail}
                     />
                     <Button
                        color={Colors.primary}
                        title="To Cart"
                        onPress={props.onAddToCart}
                     />
                  </View>
               </View>
            </TouchableCmp>
         </View>
      </View>
   );
};

export default ProductItem;

const styles = StyleSheet.create({
   product: {
      shadowColor: "black",
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      borderRadius: 10,
      backgroundColor: "white",
      flex: 1,
      height: 300,
      margin: 20,
   },
   touchable: {
      // we add this one becouse if I say overflow hidden on it it will remove the shadow
      overflow: "hidden",
   },
   imageContainer: {
      width: "100%",
      height: "60%",
      borderRadius: 10,
      overflow: "hidden",
   },
   image: {
      width: "100%",
      height: "100%",
   },
   productInfo: {
      height: "15%",
      alignItems: "center",
      padding: 10,
   },
   title: {
      fontSize: 18,
      marginVertical: 4,
   },
   price: {
      fontSize: 14,
      color: "#888",
   },
   actions: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      height: "25%",
      paddingHorizontal: 20,
   },
});
