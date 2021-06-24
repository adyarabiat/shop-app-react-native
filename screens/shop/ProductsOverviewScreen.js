import React from "react";
import { StyleSheet, FlatList, Platform, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/actions/cart";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";

const ProductsOverviewScreen = (props) => {
   const dispatch = useDispatch();
   const products = useSelector((state) => state.products.availableProducts);
   console.log(products);

   return (
      <FlatList
         data={products}
         renderItem={(itemData) => (
            <ProductItem
               image={itemData.item.imageUrl}
               title={itemData.item.title}
               price={itemData.item.price}
               onViewDetail={() => {
                  props.navigation.navigate({
                     routeName: "productDetail",
                     params: {
                        productId: itemData.item.id,
                        productTitle: itemData.item.title,
                     },
                  });
               }}
               onAddToCart={() => {
                  dispatch(addToCart(itemData.item));
               }}
            />
         )}
      />
   );
};

export default ProductsOverviewScreen;

ProductsOverviewScreen.navigationOptions = (navData) => {
   return {
      headerTitle: "All Products",
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
