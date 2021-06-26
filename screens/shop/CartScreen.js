import React from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/order";

const CartScreen = () => {
   const dispatch = useDispatch();

   const cartTotalAmount = useSelector((state) => state.cart.totalAmount);

   // to disable the button if there is nothing there
   const carItems = useSelector((state) => {
      const transformedCartItems = [];
      for (const key in state.cart.items) {
         transformedCartItems.push({
            productId: key,
            productTitle: state.cart.items[key].productTitle,
            productPrice: state.cart.items[key].productPrice,
            quantity: state.cart.items[key].quantity,
            sum: state.cart.items[key].sum,
         });
      }
      return transformedCartItems;
   });

   // alternative way to disable the button
   // let disAble;
   // if (cartTotalAmount === 0) {
   //    disAble = true;
   // } else {
   //    disAble = false;
   // }

   return (
      <View style={styles.screen}>
         <View style={styles.summary}>
            <Text style={styles.summaryText}>
               Total:{"  "}
               <Text style={styles.amount}>
                  ${Math.round((cartTotalAmount.toFixed(2) * 100) / 100)}
               </Text>
            </Text>
            <Button
               color={Colors.accent}
               title="Order Now"
               disabled={carItems.length === 0}
               deletable //means it is true
               // disabled={disAble}
               onPress={() => {
                  dispatch(addOrder(carItems, cartTotalAmount));
               }}
            />
         </View>
         <FlatList
            data={carItems} //I use the one from here that I created
            keyExtractor={(item) => item.productId}
            renderItem={(itemData) => {
               return (
                  <CartItem
                     quantity={itemData.item.quantity}
                     title={itemData.item.productTitle}
                     amount={itemData.item.sum}
                     deletable
                     onRemove={() => {
                        dispatch(removeFromCart(itemData.item.productId));
                     }}
                  />
               );
            }}
         />
      </View>
   );
};

export default CartScreen;

CartScreen.navigationOptions = (navigationData) => {
   return {
      headerTitle: "Cart",
   };
};

const styles = StyleSheet.create({
   screen: {
      margin: 20,
   },
   summary: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
      padding: 10,
      shadowColor: "black",
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      borderRadius: 10,
      backgroundColor: "white",
   },
   summaryText: {
      fontFamily: "open-sans-bold",
      fontSize: 18,
   },
   amount: {
      color: Colors.primary,
   },
});
