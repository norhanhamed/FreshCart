import React, { createContext, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/Cart.context'
import Loading from '../../Components/Loading/Loading';

export default function Cart() {
    const { getCartInfo, cartInfo, removeCartItem, updateProductCount, clearCart } = useContext(CartContext);
    useEffect(() => { getCartInfo() }, []);
    return (
        <>
            {cartInfo === null ?
                (
                    <div className="py-6 rounded-lg flex flex-col justify-center items-center gap-3 border-2 border-primary-500">
                        <h2>There are not items yet.</h2>
                        <Link
                            to="/allproducts"
                            className="btn font-medium text-center mx-2  px-3 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 hover:duration-300 hover:transition-colors "
                        >
                            Add your product to Wish List
                        </Link>
                    </div>) : (
                    <section className='bg-slate-100 rounded p-5'>
                        <div className='mb-8'>
                            <h2 className='mb-2'>
                                <span className='text-2xl font-bold mb-3 '> Shop Cart </span>
                                <i className='fa-solid fa-shopping-cart ml-2'></i>
                            </h2>
                            <h5 className='text-lg text-primary'>Total Price: {cartInfo?.data?.totalCartPrice} </h5>
                        </div>
                        {cartInfo.numOfCartItems === 0 ? (
                            <div className="py-16 flex flex-col justify-center items-center">
                                <h3 className='text-lg'> there are not items yet..! </h3>
                                <Link to="/" className='btn-primary rounded text-sm mt-2 text-uppercase ' >
                                    add your first item now to cart
                                </Link>
                            </div>
                        ) :
                            (cartInfo.data?.products?.map((product) => (
                                <div key={product._id} className="product grid grid-cols-12 gap-5 mt-3">
                                    <div className="col-span-1">
                                        <img src={product.product.imageCover}
                                            className='w-full'
                                            alt="" />
                                    </div>
                                    <div className="col-span-11 flex justify-between items-center">
                                        <div>
                                            <h3 className='text-lg font-semibold' >{product.product.title}</h3>
                                            <h4 className='text-primary'>price:{product.price} L.E</h4>
                                            <button
                                                onClick={() => { removeCartItem({ id: product.product.id }) }}
                                                className='btn-primary bg-red-500 text-sm mt-3 '>
                                                <i className='fa-solid fa-trash-can mr-4'></i>
                                                Remove
                                            </button>
                                        </div>
                                        <div className='flex gap-4 items-center ' >
                                            <button
                                                onClick={() => { updateProductCount({ id: product.product.id, count: product.count - 1 }) }}
                                                className='btn-primary'>
                                                <i className='fa-solid fa-minus'></i>
                                            </button>
                                            <span className='font-bold text-lg '> {product.count} </span>
                                            <button
                                                onClick={() => { updateProductCount({ id: product.product.id, count: product.count + 1 }) }}
                                                className='btn-primary'>
                                                <i className='fa-solid fa-plus'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                            )

                            )}
                        {cartInfo?.numOfCartItems ? (
                            <button
                                onClick={() => { clearCart() }}
                                className='btn-primary bg-red-500 ms-auto mt-4 block text-uppercase '>
                                Clear Cart
                            </button>

                        ) : ("")}
                    </section>
                )}
            {cartInfo?.numOfCartItems ? (
                <Link to="/checkout"
                    className='btn-primary block ms-auto mt-4 text-uppercase w-fit'
                >
                    next step
                </Link>
            ) : ("")}

        </>
    )
}

