import React from "react";
import { StyleSheet, FlatList, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import Colors from "../../constants/Colors";
import { deleteProduct } from "../../store/actions/products";

const UserProductsScreen = (props) => {
   const dispatch = useDispatch();
   const userProducts = useSelector((state) => state.products.userProducts);

   const editProductHanldler = (id) => {
      props.navigation.navigate("edit", { productId: id });
   };

   const deleteHandler = (id) => {
      Alert.alert("Are you sure?", "Do you really want to delete this item?", [
         { text: "No", style: "default" },
         {
            text: "Yes",
            style: "destructive",
            onPress: () => {
               dispatch(deleteProduct(id));
            },
         },
      ]);
   };

   return (
      <FlatList
         data={userProducts}
         keyExtractor={(item) => item.id}
         renderItem={(itemData) => {
            return (
               <ProductItem
                  image={itemData.item.imageUrl}
                  title={itemData.item.title}
                  price={itemData.item.price}
                  onSelect={() => {}}
               >
                  <Button
                     color={Colors.primary}
                     title="Edit"
                     onPress={() => {
                        editProductHanldler(itemData.item.id);
                     }}
                  />
                  <Button
                     color={Colors.primary}
                     title="Delete"
                     onPress={deleteHandler.bind(this, itemData.item.id)}
                  />
               </ProductItem>
            );
         }}
      />
   );
};

export default UserProductsScreen;

UserProductsScreen.navigationOptions = (navData) => {
   return {
      headerTitle: "Your Products",
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
               title="Add"
               iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
               onPress={() => {
                  navData.navigation.navigate("edit");
               }}
            />
         </HeaderButtons>
      ),
   };
};

const styles = StyleSheet.create({});
