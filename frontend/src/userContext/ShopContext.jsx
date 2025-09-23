import React, { createContext, useContext, useEffect, useState } from "react";
import { GazeWatchContext } from "./UserContext";
import axios from "axios";
import { userDataContex } from "./dataContext";
import { useLocation } from "react-router-dom"; 
import { toast } from "react-toastify";
export const shopDataContext = createContext();
function ShopContext({ children }) {
  const [products, setProducts] = useState(null); 
  
  const [Search, setSearch] = useState([]);
  // for cart page
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartItems, setCartItems] = useState([]); 
  const [cartProducts, setCartProducts] = useState(null)
  const [cartOpen, setCartOpen] =useState(false)
  const [cartLoading, setCartLoading] = useState(false)
  const [showSearch, setShowsearch] = useState(Boolean);
  const [userPanel, setUserPanel] = useState(Boolean);


  const location = useLocation();

  const { serverUrl } = useContext(GazeWatchContext);
  const { userData, authorizeUser } = useContext(userDataContex);

  const fetchProducts = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/all", {
        withCredentials: true,
      });
      setProducts(result.data); 
    } catch (error) { 
      setProducts(null);
    }
  };

  const settingCartItem = async (itemId) => {
    if (!cartItems.includes(itemId)) {
      setCartLoading(true)
      
      let olditems = cartItems;
      setCartItems([...olditems, itemId]); 
      !userData && setCartItemsCount(prev => prev+1)
      !userData && toast.success("product Successfully Added")
      setCartLoading(false)
    } else { 
      setCartLoading(false)
      toast.error("product already exist");
    }
  };
  useEffect(() => {
    if(!products ||  (location.pathname === "/" || location.pathname === "/collection" )){
       fetchProducts();
    } 
  }, [location.pathname]);

  const Currency = "₨";
  const Delivery_fee = "150";
  

  const CartSendDb = async (userid, ProductId) => {
    try {
      if (userid) {
        setCartLoading(true) 
        // send product to cart OR save the product in user cart
        let result = await axios.put(
          serverUrl + "/api/auth/cart/update",
          { ProductId, userid },
          { withCredentials: true }
        ); 
        setCartLoading(false)
        await authorizeUser(); 
      }
      toast.success("Product Successfully added")
      // autherise
    } catch (error) {
      setCartLoading(false)
      toast.error("Error Occurs. Product not add")
    }
  };

 
  // ----------------------------------------------------calling cart data function
  
  const DBCartItems = async (userData, cartItems) => {
    // if(!cartItems && (location.pathname === "/cart" || location.pathname === "/cart/placeorder")){
      if (userData) {
      try { 
        let ProductArray = userData.cartData; 
        if(ProductArray.length){ 
          let cartProduct = await axios.post(
            // getting cart products from db ProductArray Or fetching cart product for register user
            serverUrl + "/api/product/cart/all",
            { ProductArray },
            { withCredentials: true }
          );
          //check it if cartproduct is not availble
          // setProducts(cartProduct.data.UserProducts); 
          setCartProducts(cartProduct.data.UserProducts ? cartProduct.data.UserProducts : [])
          setCartItemsCount(!cartProduct.data.UserProducts.length ? 0 : cartProduct.data.UserProducts.length); 
         }
      } catch (error) { 
        setCartProducts(null); 
      }
    } else {
      // setCartProducts for unregister user  OR fetch cart product for unregister user
      const copyCart = cartItems.length > 0 && cartItems.slice()
      let gettedCArtItems =copyCart.length > 0 && await axios.post(
        serverUrl + "/api/user/not/register/cart",
        { copyCart },
        { withCredentials: true }
      ); 
      setCartProducts(gettedCArtItems ? gettedCArtItems.data : null);   
      setCartItemsCount(!gettedCArtItems.data ? 0 : gettedCArtItems.data.length  ); 
  
    }
  // }
  };
 

  useEffect(() => {

      DBCartItems(userData,cartItems);  
      setCartItemsCount(userData ? userData.cartData ? userData.cartData.length  : 0 : 0) 

  }, [userData, location.pathname === "/cart"]);

  // useEffect(() => {  
  //   DBCartItems(userData,cartItems);  
  // }, [location.pathname]);
  
  // useEffect(()=>{
  //   settingCartProductCount(userData);
    
  // },[cartItems])



  let oneByOne = async (productid, userData) => {
    // if (cartItems.length > 0) {
      //  await GetProduct(productid);
    // }
    if (userData) {
      await CartSendDb(userData && userData._id, productid);
    }
  };


  useEffect(() => {
    if(cartItems !== null){
      let copyId =cartItems.slice();
    let productid = copyId.pop();
    oneByOne(productid, userData);
    }
  }, [cartItems]);
 
  // others

  const value = {
    products,
    fetchProducts,
    Currency,
    Delivery_fee,
    Search,
    setSearch,
    settingCartItem,
    cartItemsCount,
    cartItems, 
    setCartItems,
    setCartItemsCount,
    cartProducts, 
    setCartProducts,
    DBCartItems,
    cartLoading,
    showSearch,
    setShowsearch,
    userPanel,
    setUserPanel
  };
  return (
    <div>
      <shopDataContext.Provider value={value}>
        {children}
      </shopDataContext.Provider>
    </div>
  );
}

export default ShopContext;
