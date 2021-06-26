import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
   StyleSheet,
   Text,
   View,
   TextInput,
   ScrollView,
   Platform,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { createProduct, updateProduct } from "../../store/actions/products";

const EditProductScreen = (props) => {
   const dispatch = useDispatch();

   const prodId = props.navigation.getParam("productId");
   const editedProduct = useSelector(
      (state) => state.products.userProducts
   ).find((prod) => prod.id === prodId);

   const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
   const [imageURL, setImageURL] = useState(
      editedProduct ? editedProduct.imageUrl : ""
   );
   const [price, setPrice] = useState("");
   const [description, setDescription] = useState(
      editedProduct ? editedProduct.description : ""
   );

   const submitHandler = useCallback(() => {
      if (editedProduct) {
         dispatch(updateProduct(prodId, title, description, imageURL));
      } else {
         dispatch(createProduct(title, description, imageURL, +price));
      }

      props.navigation.goBack();
   }, [dispatch, prodId, title, description, imageURL, price]);

   useEffect(() => {
      props.navigation.setParams({ submit: submitHandler });
   }, [submitHandler]);

   return (
      <ScrollView>
         <View style={styles.form}>
            <View style={styles.formControl}>
               <Text style={styles.label}>Title</Text>
               <TextInput
                  style={styles.input}
                  value={title}
                  onChangeText={(text) => setTitle(text)}
               />
            </View>
            <View style={styles.formControl}>
               <Text style={styles.label}>Image URL</Text>
               <TextInput
                  style={styles.input}
                  value={imageURL}
                  onChangeText={(text) => setImageURL(text)}
               />
            </View>

            {editedProduct ? null : (
               <View style={styles.formControl}>
                  <Text style={styles.label}>Price</Text>
                  <TextInput
                     style={styles.input}
                     value={price}
                     onChangeText={(text) => setPrice(text)}
                  />
               </View>
            )}

            <View style={styles.formControl}>
               <Text style={styles.label}>Description</Text>
               <TextInput
                  style={styles.input}
                  value={description}
                  onChangeText={(text) => setDescription(text)}
               />
            </View>
         </View>
      </ScrollView>
   );
};

export default EditProductScreen;

EditProductScreen.navigationOptions = (navData) => {
   const submitFn = navData.navigation.getParam("submit");

   return {
      headerTitle: navData.navigation.getParam("productId")
         ? "Edit Product"
         : "Add Product",

      headerRight: () => (
         <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
               title="Save"
               iconName={
                  Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
               }
               onPress={submitFn}
            />
         </HeaderButtons>
      ),
   };
};

const styles = StyleSheet.create({
   form: {
      margin: 20,
   },
   formControl: {
      width: "100%",
   },
   label: {
      fontFamily: "open-sans-bold",
   },
   input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderBottomColor: "#ccc",
      borderBottomWidth: 1,
   },
});
