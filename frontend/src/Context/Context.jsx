import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = [];
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
    I
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [all_product, setAll_products] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/allproducts').then((resp) => resp.json()).then((data) => setAll_products(data));

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart', {
                method:'POST',
                headers:{
                    Accept:'application',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-type':'application/json'
                },
                body:"",
            }).then((response)=>response.json()).then((data)=>setCartItems(data));
        }
    }, []);

    /**========================================================================
     *                           ADD TO CART
     *========================================================================**/
    const addToCart = (itemId) => {
        // Update cart items in state
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));  // Ensure undefined itemId is handled
    
        // Check if the user is logged in by checking the auth-token
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',  // Expect JSON response
                    'auth-token': localStorage.getItem('auth-token'),  // Correct string interpolation
                    'Content-Type': 'application/json',  // JSON request body
                },
                body: JSON.stringify({ "itemId": itemId }),  // Send itemId in JSON format
            })
            .then((response) => response.json())  // Parse the response as JSON
            .then((data) => console.log(data))  // Handle the response data
            .catch((error) => console.error('Error:', error));  // Handle any errors
        }
    };
           
     /**========================================================================
      *                           REMOVE FROM CART
      *========================================================================**/       
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',  // Expect JSON response
                    'auth-token': localStorage.getItem('auth-token'),  // Correct string interpolation
                    'Content-Type': 'application/json',  // JSON request body
                },
                body: JSON.stringify({ "itemId": itemId }),  // Send itemId in JSON format
            })
            .then((response) => response.json())  // Parse the response as JSON
            .then((data) => console.log(data))  // Handle the response data
            .catch((error) => console.error('Error:', error));  // Handle any errors
        }
    }

    /**========================================================================
     *                           GET TOTAL CART AMOUNT
     *========================================================================**/

    const getTotalCartAmount = () => {
        let totalAmount = 0;
    
        // Using for...in to iterate over the cartItems (assuming cartItems is an object with product IDs as keys)
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                // Find the corresponding product in all_product by matching the id (convert item to number if necessary)
                let itemInfo = all_product.find((product) => product.id === Number(item));
    
                // Ensure itemInfo and new_price exist before calculating
                if (itemInfo && itemInfo.new_price) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
    
        return totalAmount;
    };
    

    // const getTotalCartAmount = () => {
    //     let total = 0;
    //     cartItems.forEach((item) => {
    //         // Ensure item exists and has new_price
    //         if (item && item.new_price) {
    //             total += item.new_price * item.quantity;  // Assuming there is a quantity field
    //         } else {
    //             console.error("Item or new_price is undefined:", item);
    //         }
    //     });
    //     return total;
    // };
    

    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]> 0){
                totalItem+= cartItems[item]
            }
        }
        return totalItem;
    }
    
    const contextValue = { all_product, cartItems,setCartItems , addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems};


    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;