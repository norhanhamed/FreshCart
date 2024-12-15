import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../Context/User.context';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';

export default function AllOrders() {
    const { token } = useContext(userContext);
    const { id } = jwtDecode(token);
    const [orders, setOrders] = useState(null)
    //getUserOrders
    async function getUserOrders() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
            method: "GET",
        }
        const { data } = await axios.request(options);
        console.log(data);
        setOrders(data);
    }
    useEffect(() => { getUserOrders() }, []);
    return (
        <>
            {orders === null ? (<Loading />) :
                (orders.map((order) => (
                    <div className="order border border-gray-300 rounded-md p-4 mt-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className='text-gray-400 '>Order ID</h2>
                                <h3 className='font-bold '>#{order.id}</h3>
                            </div>
                            <div>
                                {order.isDelivered ? (
                                    <span className='btn-primary font-cairo bg-lime-400 inline-block me-3'>تم التوصيل</span>
                                ) :
                                    (
                                        <span className='btn-primary font-cairo bg-blue-400 inline-block me-3'>قيد التوصيل</span>
                                    )
                                }
                                {order.ispaid ? (
                                    <span className='btn-primary font-cairo bg-lime-400 inline-block '> تم مدفوع</span>
                                ) :
                                    (
                                        <span className='btn-primary font-cairo bg-red-400 inline-block '> غير مدفوع</span>
                                    )
                                }
                            </div>
                        </div>
                        <div className='grid grid-cols-12 gap-3 mt-5'>
                            {order.cartItems.map((item) =>
                                <div className="product col-span-12 border border-gray-300 rounded p-3 md:col-span-4 lg:col-span-3 xl:col-span-2">
                                    <img src={item.product.imageCover}
                                        className="w-full object-container h-32"
                                        alt=""
                                    />
                                    <h3 className='font-semiboldmy-2 mt-2'>{item.product.title}</h3>
                                    <span>{item.price} L.E</span>
                                </div>
                            )}
                        </div>
                    </div>
                )
                )
                )}
               
        </>
    )
}
