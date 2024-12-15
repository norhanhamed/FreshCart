
import { createContext, useContext, useState } from "react";
import { userContext } from "./User.context";
import toast from "react-hot-toast";
import axios from "axios";


export const CartContext = createContext();
export default function CartProvider({ children }) {
    const [cartInfo, setCartInfo] = useState(null)
    const { token } = useContext(userContext);
    async function addProductToCart({ id }) {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "POST",
                headers: {
                    token,
                },
                data: {
                    productId: id,
                },
            };
            let { data } = await axios.request(options);
            console.log(data);
            setCartInfo(data);
            toast.success("product added to cart")
        } catch (error) {
            console.log(error);
        }
    }
    //get cart Item
    async function getCartInfo() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "GET",
                headers: {
                    token
                }
            };
            let { data } = await axios.request(options);
            console.log(data);
            setCartInfo(data);
        } catch (error) {
            console.log(error);
        }
    }
    //remove cart Item
    async function removeCartItem({ id }) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                method: "DELETE",
                headers: {
                    token
                }
            };
            let { data } = await axios.request(options);
            console.log(data);
            if (data.numOfCartItems === 0) {
                setCartInfo([]);
            } else {
                setCartInfo(data);
            }
            toast.success("Item Removed Successfully")
        } catch (error) {
            console.log(error);
            if (error.response.data.message.includes('No cart')) {
                setCartInfo([]);
            }
        }
    }
    //update cart Item
    async function updateProductCount({ id, count }) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                method: "PUT",
                headers: {
                    token
                },
                data:{
                    count
                },
            };
            let { data } = await axios.request(options);
            console.log(data);
            setCartInfo(data)
        } catch (error) {
            console.log(error);

        }
    }

    //clear cart 
    async function clearCart() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "DELETE",
                headers: {
                    token
                },
            };
            let { data } = await axios.request(options);
            console.log(data);
            setCartInfo([])
        } catch (error) {
            console.log(error);
        }
    }
    return <CartContext.Provider value={{ addProductToCart, getCartInfo, cartInfo, setCartInfo, removeCartItem, updateProductCount, clearCart }}>
        {children}
    </CartContext.Provider>

}