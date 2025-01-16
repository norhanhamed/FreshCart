import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Brands from './Pages/Brands/Brands';
import Categories from './Pages/Categories/Categories';
import Products from './Pages/Products/Products';
import Layout from './Components/Layout/Layout.jsx';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import NotFound from './Pages/NotFound/NotFound';
import { Toaster } from 'react-hot-toast';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Cart from './Pages/Cart/Cart';
import UserProvider from './Context/User.context.jsx';
import CartProvider from './Context/Cart.context.jsx';
import Checkout from './Pages/Checkout/Checkout.jsx';
import AllOrders from './Pages/AllOrders/AllOrders.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Offline } from 'react-detect-offline';
import CategoryProduct from './Pages/CategoryProduct/CategoryProduct.jsx';
import BrandProduct from './Pages/BrandProduct/BrandProduct.jsx';
// import WishListprovider from './Context/WishList.context.jsx';
// import WishList from './Pages/WishList/WishList.jsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
// import ResetPassword from './Pages/ResetPassword/ResetPassword.jsx';
// import VerifyCode from './Pages/VerifyCode/VerfiyCode.jsx';
// import ForgetPass from './Pages/ForgetPass/ForgetPass.jsx';

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element:  <ProtectedRoute >  <Layout /> </ProtectedRoute>  ,
      children: [
        { index: true, element: <Home /> },
        { path: "brands", element: <Brands /> },
        { path: "brandProduct/:id", element: <BrandProduct /> },
        { path: "/allProducts", element: <Products /> },
        { path: "/cart", element: <Cart /> },
        { path: "/categories/:id", element: <Categories /> },
        { path: "categoryProduct/:id", element: <CategoryProduct /> },
        { path: "/products/:id", element: <ProductDetails /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/allorders", element: <AllOrders /> },
        // { path: "/wishList", element: <WishList /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    {path: '/auth', element:  <Layout />, children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        // { path: "forgot", element: <ForgetPass />} ,
        // { path: "verify", element: <VerifyCode /> },
        // { path: "resetPassword", element: <ResetPassword /> },

      ],
    },

  ]);
  // REACT QUARY CLIENT
  const myClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={myClient}>
        <UserProvider >
            <CartProvider >
              <RouterProvider router={routes} ></RouterProvider>
              <ReactQueryDevtools position='bottom'></ReactQueryDevtools>
              <Toaster />
            </CartProvider>
        </UserProvider>
      </QueryClientProvider>

    </>
  )
}
