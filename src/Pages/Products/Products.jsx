import React from 'react';
import ProductCard from '../../Components/ProductCard/ProductCard'
import Loading from '../../Components/Loading/Loading';
import useProducts from '../../Hooks/useProducts';
import { Helmet } from 'react-helmet';

export default function Products() {
  const { data, isLoading, isError, } = useProducts();
  if (isLoading) { return <Loading /> };
  if (isError) { <h2>error</h2> };
  return (
    <>
    <Helmet>
      <title>Products</title>
      <meta name='description' content='products' />
    </Helmet>
      <div className='grid grid-cols-12 gap-4'>
        {data.data.data.map((product) => (<ProductCard productInfo={product} key={product._id} />))}
      </div>
    </>
  )
}
