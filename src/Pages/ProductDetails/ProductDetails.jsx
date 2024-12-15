import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../Components/Loading/Loading';
import ReactImageGallery from 'react-image-gallery';
import { CartContext } from '../../Context/Cart.context';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
    const { addProductToCart } = useContext(CartContext);
    const [details, setDetails] = useState(null);
    //get all products
    let { id } = useParams();
    console.log(id)
    async function getProductDetails() {
        const options = {
            url: (`https://ecommerce.routemisr.com/api/v1/products/${id}`),
            method: "GET",
        }
        let { data } = await axios.request(options);
        console.log(data)
        setDetails(data.data);
    }
    useEffect(() => { getProductDetails() }, []);

    //reactImageGallary
    const imageItems = details?.images.map((imageURL) => {
        return {
            original: imageURL,
            thumbnail: imageURL,
        };
    });
    return (
        <>
            {!details ? (
                <Loading />
            ) :
                (
                    <>
                    <Helmet>
                        <title>{details.title}</title>
                        <meta name='productDetails' content={details.description}/>
                    </Helmet>
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-4">
                                <ReactImageGallery items={imageItems}
                                    showNav={false} showFullscreenButton={false}
                                    showPlayButton={false} autoPlay={true} />

                            </div>
                            <div className="col-span-8 ">
                                <h2 className="test-2xl font-bold">{details.title}</h2>
                                <h3 className="text-primary text-semibold">{details.category.name} </h3>
                                <p className="mt-3">{details.description}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <span>{details.price}</span>
                                    <span>
                                        <i className='fa-solid fa-star text-yellow-400 mr-1'></i>
                                        {details.ratingsAverage}
                                    </span>
                                </div>
                                <button
                                    onClick={() => { addProductToCart({ id: details.id }) }}
                                    className="btn-primary w-full mt-4 rounded">Add to Cart</button>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}
