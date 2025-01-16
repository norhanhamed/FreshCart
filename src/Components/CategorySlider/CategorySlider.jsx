import axios from 'axios';
import React from 'react'
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// import Swiper JS
// import Swiper styles
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

export default function CategorySlider() {

  async function getAllCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    }
    return await axios.request(options);
  }
  let { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
  if (isLoading) {
    return <Loading />
  }
  return (
    <>
      <section className='pb-8'>
        <h2 className='font-semibold'>Shop Popular Categories</h2>
        <Swiper
          loop={true}
          modules={[ Autoplay]}
         
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
            1120: {
              slidesPerView: 6,
            },
          }}
        >
          {data.data.data.map((category) =>
            <SwiperSlide key={category._id}>
              <Link to={`/categories/${category._id}`} >
                <img src={category.image} alt="category slide" className='w-full h-72 object-cover' />
                <h3>{category.name}</h3>
              </Link>
            </SwiperSlide>)}
        </Swiper>
      </section>
    </>
  )
}
