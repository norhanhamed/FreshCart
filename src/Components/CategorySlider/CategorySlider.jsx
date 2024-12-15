import axios from 'axios';
import React from 'react'
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function CategorySlider() {

  async function getAllCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    }
    return await axios.request(options);
  }
  let{data, isFetching, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
 if(isLoading){
  return <Loading />
 }
  return (
    <>
     <section className='pb-8'>
        <h2 className='font-semibold'>Shop Popular Categories</h2>
        <swiper-container loop={true} slides-per-view={6} >
          {data.data.data.map((category) => 
          <swiper-slide key={category._id}>
            <Link to={`/categories/${category._id}`} >
              <img src={category.image} alt="category slide" className='w-full h-72 object-cover' />
              <h3>{category.name}</h3>
            </Link>
          </swiper-slide>)}
        </swiper-container>
      </section> 
    </>
  )
}
