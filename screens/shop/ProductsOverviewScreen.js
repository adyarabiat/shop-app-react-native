import React from "react";
import { StyleSheet, FlatList, Platform, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/actions/cart";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import Colors from "../../constants/Colors";

const ProductsOverviewScreen = (props) => {
   const dispatch = useDispatch();
   const products = useSelector((state) => state.products.availableProducts);
   console.log(products);

   const selectItemHandler = (id, title) => {
      props.navigation.navigate({
         routeName: "productDetail",
         params: {
            productId: id,
            productTitle: title,
         },
      });
   };
   return (
      <FlatList
         data={products}
         renderItem={(itemData) => (
            <ProductItem
               image={itemData.item.imageUrl}
               title={itemData.item.title}
               price={itemData.item.price}
               onSelect={() => {
                  selectItemHandler(itemData.item.id, itemData.item.title);
               }}
            >
               <Button
                  color={Colors.primary}
                  title="View Details"
                  onPress={() => {
                     selectItemHandler(itemData.item.id, itemData.item.title);
                  }}
               />
               <Button
                  color={Colors.primary}
                  title="To Cart"
                  onPress={() => {
                     dispatch(addToCart(itemData.item));
                  }}
               />
            </ProductItem>
         )}
      />
   );
};

export default ProductsOverviewScreen;

ProductsOverviewScreen.navigationOptions = (navData) => {
   return {
      headerTitle: "All Products",
      headerLeft: () => (
         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
               title="Menu"
               iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
               onPress={() => {
                  navData.navigation.toggleDrawer();
               }}
            />
         </HeaderButtons>
      ),
      headerRight: () => (
         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
               title="Cart"
               iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
               onPress={() => {
                  navData.navigation.navigate({
                     routeName: "cart",
                  });
               }}
            />
         </HeaderButtons>
      ),
   };
};

const styles = StyleSheet.create({
   screen: {},
});

// Platform.OS === "android" ? "md-cart" : "ios-cart"
