import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/actions/cart";

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

ProductsOverviewScreen.navigationOptions = {
   headerTitle: "All Products",
};

const styles = StyleSheet.create({
   screen: {},
});
