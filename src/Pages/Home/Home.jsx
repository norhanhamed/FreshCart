import React, { useEffect, useState } from 'react'
import ProductCard from '../../Components/ProductCard/ProductCard'
import Loading from '../../Components/Loading/Loading';
import CategorySlider from '../../Components/CategorySlider/CategorySlider';
import HomeSlider from '../../Components/HomeSlider/HomeSlider';
import useProducts from '../../Hooks/useProducts';
import { Helmet } from 'react-helmet';

export default function Home() {
  const { data, isLoading, isFetching, isError } = useProducts();
  if (isLoading) { return <Loading /> };
  return (
    <>
    <Helmet>
      <title>Home</title>
      <meta name='description' content='welcometo home page'/>
    </Helmet>
      <HomeSlider />
      <CategorySlider />
      <div className='grid grid-cols-12 gap-4'>
        {data.data.data.map((product) => (<ProductCard productInfo={product} key={product._id} />))}
      </div>
    </>
  );
}