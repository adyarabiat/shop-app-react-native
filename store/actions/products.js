export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => async (dispatch) => {
   const response = await fetch(
      "https://the-shop-app-eba51-default-rtdb.firebaseio.com/products.json"
   );
   const resData = await response.json();

   console.log(resData);

   dispatch({
      type: SET_PRODUCTS,
      payload: [],
   });
};

export const deleteProduct = (productId) => {
   return {
      type: DELETE_PRODUCT,
      payload: productId,
   };
};

export const createProduct =
   (title, description, imageUrl, price) => async (dispatch) => {
      // async code
      const response = await fetch(
         "https://the-shop-app-eba51-default-rtdb.firebaseio.com/products.json",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               title,
               description,
               imageUrl,
               price,
            }),
         }
      );
      const resData = await response.json();
      console.log(data);

      dispatch({
         type: CREATE_PRODUCT,
         payload: {
            id: resData.name,
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
         },
      });
   };

export const updateProduct = (id, title, description, imageUrl) => {
   return {
      type: UPDATE_PRODUCT,
      pid: id,
      payload: {
         title: title,
         description: description,
         imageUrl: imageUrl,
      },
   };
};
