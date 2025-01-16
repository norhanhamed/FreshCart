import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/Cart.context';

export default function ProductCard({ productInfo }) {
    const { images, title, description, price, category, ratingsAverage, id } = productInfo;
    const { addProductToCart } = useContext(CartContext);

    return (
        <>
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 shadow-lg rounded-md overflow-hidden ">
                <div className='relative'>
                    <img src={images[0]}
                        className='w-full'
                        alt="" />
                    {/* layer */}
                    <div className="layer opacity-0 hover:opacity-100 transition-opacity duration-250 absolute flex justify-center items-center gap-2 w-full h-full left-0 top-0 bg-black bg-opacity-15 ">
                        <div 
                            className="icon w-10 h-10 rounded-full bg-primary text-sm text-white flex justify-center items-center cursor-pointer transition-transform hover:scale-110 duration-300 hover:rotate-6">
                            <i className='fa-solid fa-heart'></i>
                        </div>
                        <div onClick={() => { addProductToCart({ id }); }}
                            className="icon w-10 height-10 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 hover:rotate-6 bg-primary text-lg pt-2 pb-2 text-white flex justify-center items-center">
                            <i className='fa-solid fa-cart-shopping' ></i>{" "}
                        </div>
                        <Link
                            to={`/products/${id}`}
                            className="icon w-10 h-10 rounded-full bg-primary text-sm text-white flex justify-center items-center cursor-pointer transition-transform hover:scale-110 duration-300 hover:rotate-6"
                        >
                            <i className='fa-solid fa-eye'></i>
                        </Link>
                    </div>
                </div>
                <div className="p-3">
                    <h3 className="text-primary">{category.name}</h3>
                    <h2 className="text-lg font-semibold line-clamp-2 ">{title}</h2>
                    <div className="flex items-center justify-between mt-4">
                        <span>{price} EGP</span>
                        <div className="flex items-center gap-1">
                            <i className='fa-solid fa-star text-yellow-500'></i>
                            <span>{ratingsAverage}</span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}



